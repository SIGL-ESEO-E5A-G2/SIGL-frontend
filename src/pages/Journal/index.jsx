import './blog.css';

import { useEffect, useState, useContext, useMemo } from 'react';
import ReactQuill from 'react-quill';
import { Button, TextInput, Paper, Stack, MultiSelect } from "@mantine/core";

import MessagesContainer from '../../components/Post';

import { request } from '../../utils/request';
import { UserContext } from '../../context/UserContext';

const textEditorModules = {
  toolbar: [
    [{ font: [] }],
    [{ 'align': [] }],
    [
      { color: [] },
      { background: [] },
    ],
    ["bold", "italic", "underline", "strike"],
    ["code-block", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
    ],
    ["link", "video"],
    ["clean"]
  ]
}

// const titleEditorModules = {
//   toolbar: [
//     [{ color: [] },],
//     ["bold", "italic", "underline"],
//     ["clean"]
//   ]
// }

const BlogComponent = () => {
  const [showPopup, setShowPopup] = useState(false);

  const [postsTemp, setPosts] = useState([]);
  const posts = useMemo(() => { // TODO remove
    return postsTemp
      .filter(post => !post?.tags?.map(tag => tag?.type)?.includes('Livrable'))
  }, [postsTemp]);

  const [apprentidetail, setApprentidetail] = useState([]);
  const [tags, setTags] = useState([]);

  const user = useContext(UserContext);

  useEffect(() => {
    request(`/apprentiutilisateurdetail?utilisateur=${user.id}`)
      .then(({ data }) => setApprentidetail(data?.length ? data[0] : null));

    request(`/messageutilisateurdetail/?utilisateur=${user.id}`)
      .then(({ data }) => setPosts(data));

    request('/tag', 'get') // TODO rendre certains tags inacessibles
      .then(({ data }) => setTags((data || []).map(tag => ({
        ...tag,
        value: tag.id + "",
        label: tag.libelle
      }))));
  }, []);

  const RoundButton = ({ onClick }) => {
    return (
      <Button className="round-button" color={showPopup ? 'red' : 'blue'} onClick={onClick}>
        <h1><b>{showPopup ? 'x' : '+'}</b></h1>
      </Button>
    );
  };

  return <div>
    {/* Messages */}
    <MessagesContainer posts={posts} />

    {/* Ajout message */}
    {showPopup && <AddMessagePopUp apprenti={apprentidetail} tags={tags} />}

    <div>
      <RoundButton onClick={() => setShowPopup(old => !old)} />
    </div>
  </div>
}

function AddMessagePopUp({ apprenti, tags }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tagsSelected, setTagsSelected] = useState();

  function addPost() {
    if (!title?.trim() || !body?.trim()) {
      alert('Le titre et le message ne peuvent pas être vides.');
      return;
    }

    const date = (new Date()).toISOString().split('T');
    const dateString = date[0];
    const timeString = date[1].substring(0, 5);
    // TODO l'heure n'est pas en UTC Paris (MEMO : surtout ne pas faire time + 1)

    const cible = [user.id, apprenti?.tuteurPedagogique?.id, apprenti?.maitreAlternance?.id]
      .filter(id => id);

    const newPost = {
      titre: title,
      contenu: body,
      date: dateString,
      time: timeString,
      createur: user.id,
      destinataire: cible,
      tags: tagsSelected
    };

    return request("/message/", "post", newPost)
      .then((response) => {
        setShowPopup(false);

        return request(`/messagedetail/${response.data.id}`)
          .then(({ data }) => {
            setPosts(prevPosts => [...prevPosts, data]);
          });
      })
      .catch((error) => {
        console.error('Erreur lors de la requête:', error);
      });
  }

  return <Paper className="popup" shadow="md" p="md">
    <Stack>
      {/* Titre du message */}
      <TextInput
        placeholder="Titre"
        onChange={setTitle}
        className="title-input"
      />

      <MultiSelect
        searchable
        data={tags}
        onChange={setTagsSelected}
      />

      {/* Corps du message */}
      <ReactQuill
        theme="snow"
        placeholder="Message"
        onChange={setBody}
        className="editor-input"
        modules={textEditorModules}
      />

      <Button onClick={addPost}>Ajouter un post</Button>
    </Stack>
  </Paper>
}

export default BlogComponent;
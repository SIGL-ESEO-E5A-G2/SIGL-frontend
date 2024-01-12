import './blog.css';

import { useEffect, useState, useContext } from 'react';
import ReactQuill from 'react-quill';
import { Button, TextInput, Paper, Stack, MultiSelect, Container } from "@mantine/core";

import Post from './Post';

import { request } from '../../utils/request';
import { UserContext } from '../../context/UserContext';
import { Send } from 'react-bootstrap-icons';
import ModalAddMessage from './ModalAddMessage';

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

  const [posts, setPosts] = useState([]);

  const [apprentidetail, setApprentidetail] = useState([]);
  const [tags, setTags] = useState([]);

  const user = useContext(UserContext);

  useEffect(() => {
    request(`/apprentiutilisateurdetail?utilisateur=${user.id}`)
      .then(({ data }) => setApprentidetail(data?.length ? data[0] : null));

    request(`/messagefeed?utilisateur=${user.id}`)
      .then(({ data }) => setPosts(data));

    request('/tag', 'get') // TODO rendre certains tags inacessibles
      .then(({ data }) => setTags((data || []).map(tag => ({
        ...tag,
        value: tag.id + "",
        label: tag.libelle
      }))));
  }, []);

  function updatePost(post) {
    if (!post.id) return;

    setPosts(old => {
      const index = old.findIndex(item => item.id === post.id);
      if (index >= 0) {
        old[index] = {
          ...old[index],
          ...post
        };

        return [...old];
      }

      return old;
    })
  }

  return <div>
    {/* Messages */}
    <Container>
      <Stack gap={50}>
        {posts.map(post => <Post user={user} post={post} updatePost={updatePost} />)}
      </Stack>
    </Container>

    {/* Modal ajout message */}
    <ModalAddMessage
      show={showPopup}
      close={() => setShowPopup(false)}
      tags={tags}
      apprenti={apprentidetail}
      addPost={newMessage => setPosts(old => [newMessage, ...old])}
    />

    {/* Btn ajouter message */}
    <Button
      onClick={() => setShowPopup(true)}
      radius="xl"
      size="lg"
      color="red"
      className="round-button"
      rightSection={<Send />}
    >
      Nouveau message
    </Button>
  </div>
}

export default BlogComponent;
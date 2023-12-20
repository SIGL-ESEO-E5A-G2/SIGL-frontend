import { useEffect, useState, useContext, useMemo } from 'react';
import ReactQuill from 'react-quill';

import MessagesContainer from '../../components/Post';

import { request } from '../../utils/request';
import { UserContext } from '../../context/UserContext';

import './blog.css';
import 'react-quill/dist/quill.snow.css';

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
};

const titleEditorModules = {
  toolbar: [
    [{ color: [] },],
    ["bold", "italic", "underline"],
    ["clean"]
  ]
};

const BlogComponent = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const [showPopup, setShowPopup] = useState(false);

  const [postsTemp, setPosts] = useState([]);
  const posts = useMemo(() => { // TODO remove
    return postsTemp
      .filter(post => !post?.tags?.map(tag => tag?.type)?.includes('Livrable'))
  }, [postsTemp]);
  const [apprentidetail, setApprentidetail] = useState([]);

  const user = useContext(UserContext);

  useEffect(() => {
    request(`/apprentiutilisateurdetail?utilisateur=${user.id}`)
      .then(({ data }) => setApprentidetail(data ? data[0] : null));

    request("/messagedetail")
      .then(({ data }) => setPosts(data));
  }, []);

  /**
   * Reset le formulaire de nouveau message
   */
  function resetFormMessage() {
    setTitle('');
    setBody('');
  }

  const addPost = () => {

    if (!title?.trim() || !body?.trim()) {
      alert('Le titre et le message ne peuvent pas être vides.');
      return;
    }

    const date = (new Date()).toISOString().split('T');
    const dateString = date[0];
    const timeString = date[1].substring(0, 5);
    // TODO l'heure n'est pas en UTC Paris (MEMO : surtout ne pas faire time + 1)

    const cible = [user.id, apprentidetail?.tuteurPedagogique?.id, apprentidetail?.maitreAlternance?.id]
      .filter(id => id);
    const tags = [7]; // TODO

    const newPost = {
      titre: title,
      contenu: body,
      date: dateString,
      time: timeString,
      createur: user.id,
      destinataire: cible,
      tags
    };

    request("/message/", "post", newPost)
      .then((response) => {
        resetFormMessage();
        setShowPopup(false);

        request(`/messagedetail/${response.data.id}`)
          .then(({ data }) => {
            setPosts(prevPosts => [...prevPosts, data]);
          });
      })
      .catch((error) => {
        console.error('Erreur lors de la requête:', error);
      });
  };

  const handleButtonClick = () => {
    resetFormMessage();
    setShowPopup(prevShowPopup => !prevShowPopup);
  };

  const RoundButton = ({ onClick }) => {
    return (
      <button className={`round-button ${showPopup ? 'red' : ''}`} onClick={onClick}>
        <h1><b>{showPopup ? 'x' : '+'}</b></h1>
      </button>
    );
  };

  return (
    <body>
      {/* Messages */}
      <MessagesContainer posts={posts} />

      {/* Ajout message */}
      {
        showPopup && (
          <div className="popup">
            {/* Titre du message */}
            <div className="title-editor">
              <ReactQuill
                placeholder="Titre"
                theme="snow"
                value={title}
                onChange={setTitle}
                className="title-input"
                modules={titleEditorModules}
              />
            </div>

            {/* Corps du message */}
            <div className="text-editor">
              <ReactQuill
                theme="snow"
                placeholder="Message"
                value={body}
                onChange={setBody}
                className="editor-input"
                modules={textEditorModules}
              />
            </div>
            <button onClick={addPost}>Ajouter un post</button>
          </div>
        )
      }

      <div>
        <RoundButton onClick={handleButtonClick} />
      </div>
    </body>
  );
}

export default BlogComponent;
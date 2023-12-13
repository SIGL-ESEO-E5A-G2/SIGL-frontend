import React, { useEffect, useState, useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { request } from '../../utils/request';
import { UserContext } from '../../context/UserContext';

import './blog.css';

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


// TODO recuperer depuis le fichier constante quand Arthur aura merge
const semesters = ['S5', 'S6', 'S7', 'S8', 'S9', 'S10'];

const BlogComponent = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const [selectedSemester, setSelectedSemester] = useState('S5');
  const [showPopup, setShowPopup] = useState(false);

  const [posts, setPosts] = useState([]);

  const user = useContext(UserContext);

  useEffect(() => {
    request("/message")
      .then((res) => {
        setPosts(res.data);
      });
  }, []);

  /**
   * Reset le formulaire de nouveau message
   */
  function resetFormMessage() {
    setTitle('');
    setBody('');
    setShowPopup(false);
  }

  const addPost = () => {

    // if (title.trim() === '' || body.trim() === '') {
    //     alert('Le titre et le message ne peuvent pas être vides.');
    //     return;
    // }

    const date = (new Date()).toISOString().split('T');
    // const dateString = date.toDateString();
    // const timeString = date.toLocaleTimeString();
    const dateString = date[0];
    const timeString = date[1].substring(0, 5);
    // TODO l'heure n'est pas en UTC Paris (MEMO : surtout ne pas faire time + 1)

    const cible = [1, 2, 3]; // TODO
    const tags = [7]; // TODO

    const newPost = {
      titre: title,
      contenu: body,
      semestre: selectedSemester, // TODO demander à nath de rajouter cet attribut
      date: dateString,
      time: timeString,
      createur: user.id,
      destinataire: cible,
      tags
    };

    request("/message/", "post", newPost)
      .then((response) => {
        resetFormMessage();
        console.log("TAG message", response.data);
        setPosts(prevPosts => [...prevPosts, response.data]);
      })
      .catch((error) => {
        console.error('Erreur lors de la requête:', error);
      });
  };

  const handleButtonClick = () => {
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
      <div className="container">
        <div className="row">
          <div className="preview">
            {
              posts.map((post) => (
                <div className="post" key={post.id}>
                  <div className="post-header">
                    <p className="semester">{post.semestre}</p>
                  </div>
                  <h2
                    className="post-title"
                    dangerouslySetInnerHTML={{ __html: post.titre }}
                  />
                  <div
                    className="post-body"
                    dangerouslySetInnerHTML={{ __html: post.contenu }}
                  />
                </div>
              ))
            }
          </div>
        </div>
      </div>

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

            {/* Semestre */}
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
            >
              {semesters.map((semester) => (
                <option key={semester} value={semester}>
                  {semester}
                </option>
              ))}
            </select>
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
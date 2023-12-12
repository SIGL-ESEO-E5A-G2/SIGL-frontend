import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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



const semesters = [1, 2, 3, 4, 5, 6, 7, 8]; // à changer

export default function () {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [selectedSemester, setSelectedSemester] = useState(5);
  const [posts, setPosts] = useState([]);

  const [showPopup, setShowPopup] = useState(false);

  const addPost = () => {

    if (title.trim() === '' || body.trim() === '') {
        alert('Le titre et le message ne peuvent pas être vides.');
        return;
    }

    setPosts(prevPosts => [...prevPosts, { title, body, semester: selectedSemester, release: selectedRelease}]);
    setTitle('');
    setBody('');
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
      <div className="container">
        <div className="row">
          <div className="preview">
            {posts.map((post, index) => (
              <div className="post" key={index}>
                <div className="post-header">
                  <p className="semester">Semestre {post.semester}</p>
                </div>
                <h2 className="post-title" dangerouslySetInnerHTML={{ __html: post.title }} />
                <div className="post-body" dangerouslySetInnerHTML={{ __html: post.body }} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="popup">
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
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(Number(e.target.value))}
            >
              {semesters.map((semester) => (
                <option key={semester} value={semester}>
                  Semestre {semester}
                </option>
              ))}
            </select>
            <button onClick={addPost}>Ajouter un post</button>
        </div>
      )}
      <div>
        <RoundButton onClick={handleButtonClick} />
      </div>
    </body>
  );
}

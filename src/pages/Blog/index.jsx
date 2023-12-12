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
}

const titleEditorModules = {
  toolbar: [
    [{ color: [] },],
    ["bold", "italic", "underline"],
    ["clean"]
  ]
}

const semesters = [1, 2, 3, 4, 5, 6, 7, 8]; // a changer

function App() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [selectedSemester, setSelectedSemester] = useState(5); // a changer
  const [posts, setPosts] = useState([]);

  const addPost = () => {
    // Vérifier si le titre contient une image
    if (title.includes('<img')) {
      alert('Le titre ne peut pas contenir d\'image.');
      return;
    }

    // Ajouter le post avec le titre, le corps du texte et le semestre à la liste des posts
    setPosts(prevPosts => [...prevPosts, { title, body, semester: selectedSemester }]);
    // Effacer le contenu du titre et du corps du texte
    setTitle('');
    setBody('');
  };

  return "test"

  return (
    <body>
      <div class="container">
        <div class="row">
          <div class="editor">
            <div class="title-editor">
              <ReactQuill
                placeholder="Titre"
                theme="snow"
                value={title}
                onChange={setTitle}
                className="editor-input"
                modules={titleEditorModules}
              />
            </div>
            <div class="text-editor">
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
          <div class="preview">
            {posts.map((post, index) => (
              <div class="post" key={index}>
                <div class="post-header">
                  <p class="semester">Semestre {post.semester}</p>
                </div>
                <h2 class="post-title" dangerouslySetInnerHTML={{ __html: post.title }} />
                <div class="post-body" dangerouslySetInnerHTML={{ __html: post.body }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </body>
  );
}

export default App;

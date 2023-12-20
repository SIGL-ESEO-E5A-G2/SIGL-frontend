import React from 'react';

function MessagesContainer({ posts }) {
  return (
    <div className="container">
      <div className="row">
        <div className="preview">
          {posts.map((post) => (
            <div className="post" key={post.id}>
              <div className="post-header">
                <p className="header">{post.createur.prenom} {post.createur.nom}</p>
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default MessagesContainer;
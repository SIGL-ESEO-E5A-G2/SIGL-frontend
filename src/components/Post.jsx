import { dateString } from '../utils/formatDate';

function MessagesContainer({ posts }) {
  return (
    <div className="container">
      <div className="row">
        <div className="preview">
          {
            posts.map((post) => {
              const dateFormatted = dateString(new Date(post.date));

              return <div className="post" key={post.id}>
                <div className="post-header">
                  <p className="header">
                    <span>{dateFormatted}</span>
                    &nbsp;-&nbsp;
                    <span>{post.createur.prenom} {post.createur.nom}</span>
                  </p>
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
            })
          }
        </div>
      </div>
    </div>
  );
}

export default MessagesContainer;
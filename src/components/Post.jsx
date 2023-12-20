
import { dateString } from '../utils/formatDate';

function MessagesContainer({ posts, setPosts, Decoration }) {
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

  return (
    <div className="container">
      <div className="row">
        <div className="preview">
          {
            posts.map((post) => {
              if (!post) return

              const dateFormatted = dateString(new Date(post.date));

              return <div className="post" key={post.id}>
                {/* Meta donnnees */}
                <div className="post-header">
                  <p className="header">
                    <span>{dateFormatted}</span>
                    &nbsp;-&nbsp;
                    <span>{post.createur.prenom} {post.createur.nom}</span>
                  </p>
                </div>

                {/* Titre */}
                <h2
                  className="post-title"
                  dangerouslySetInnerHTML={{ __html: post.titre }}
                />

                <div
                  className="post-body"
                  dangerouslySetInnerHTML={{ __html: post.contenu }}
                />

                {
                  Decoration && <>
                    <br />
                    <Decoration post={post} updatePost={updatePost} />
                  </>
                }
              </div>
            })
          }
        </div>
      </div>
    </div>
  );
}

export default MessagesContainer;
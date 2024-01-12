
import { Group, Pill, Title } from '@mantine/core';

import { dateString } from '../../utils/formatDate';
import Depot from './Depot';

function MessagesContainer({ posts, setPosts }) {
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
              const timeFormatted = post.time?.substring(0, 5)?.replace(':', 'h');
              const dateInfo = dateFormatted + (timeFormatted ? ` (${timeFormatted})` : "");
              const createur = post.createur?.id ? `${post.createur.prenom} ${post.createur.nom}` : post.createur;

              let Decoration = null;
              // type : depot
              if (post.depot?.id) {
                Decoration = Depot;
              }

              return <div className="post" key={post.id}>
                {/* Meta donnnees */}
                <div className="post-header">
                  <p className="header">
                    <span>{dateInfo}</span>
                    &nbsp;-&nbsp;
                    <span>{createur}</span>
                  </p>
                </div>

                <Group className="post-tags">
                  {
                    post.tags?.map((tag, index) => <Pill
                      key={index}
                      color={tag?.couleur}
                    >{tag?.libelle}</Pill>)
                  }
                </Group>

                {/* Titre */}
                <Title
                  order={2}
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
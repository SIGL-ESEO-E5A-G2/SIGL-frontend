
import {
  Badge,
  Button,
  Card,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
  Title
} from '@mantine/core';

import Depot from './Depot';
import { Commentaire, NouveauCommentaireForm } from './Commentaire';

import { dateString } from '../../utils/formatDate';
import { useState } from 'react';
import { Send } from 'react-bootstrap-icons';

function Post({ user, post, updatePost }) {
  const [showMoreCommentaires, setShowMoreCommentaires] = useState();
  const [commentaires, setCommentaires] = useState(post.commentaire || []);

  const dateFormatted = dateString(new Date(post.date));
  const timeFormatted = post.time?.substring(0, 5)?.replace(':', 'h');
  const createur = post.createur?.id ? `${post.createur.prenom} ${post.createur.nom}` : post.createur;

  let Decoration = null;
  let decorationTitle = "";
  // type : depot
  if (post.depot?.id) {
    Decoration = Depot;
    decorationTitle = "Dépôt";
  }

  return <Card shadow="md" key={post.id} radius="lg">
    {/* Titre */}
    <Card.Section p="md" className="post-section-header post-header">
      <Group justify="space-between">
        {/* Titre */}
        <Title order={2} dangerouslySetInnerHTML={{ __html: post.titre }} />
        {/* Metadonnees */}
        <Text fs="italic" size="sm" ta="right">Posté le {dateFormatted} par {createur}</Text>
      </Group>
    </Card.Section>

    {/* Corps du message */}
    <Stack p="md">
      {/* Tags */}
      <Group className="post-tags">
        {
          post.tags?.map((tag, index) => <Badge
            key={index}
            color={tag?.couleur || "gray"}
          >{tag?.libelle}</Badge>)
        }
      </Group>

      {/* Contenu */}
      <Paper shadow="md" p="md" className="post-box">
        <p dangerouslySetInnerHTML={{ __html: post.contenu }} />
      </Paper>
    </Stack>

    {
      Decoration && <>
        <Card.Section p="md" className="post-section-header">
          <Title order={3}>{decorationTitle}</Title>
        </Card.Section>

        <Card.Section p="md">
          <Decoration post={post} updatePost={updatePost} />
        </Card.Section>
      </>
    }

    {/* Titre Commentaires */}
    <Card.Section p="md" className="post-section-header">
      <Title order={3}>Commentaires</Title>
    </Card.Section>

    {/* Nouveau Commentaire */}
    <Card.Section p="md">
      <NouveauCommentaireForm
        user={user}
        messageId={post.id}
        addCommentaire={newCommentaire => setCommentaires(old => [newCommentaire, ...old])}
      />
    </Card.Section>

    {/* Commentaires */}
    {
      commentaires?.length > 0 && <>
        <Card.Section>
          <Divider />
        </Card.Section>

        <Card.Section>
          <Stack p="md">
            {
              showMoreCommentaires ?
                commentaires?.map(commentaire => <Commentaire commentaire={commentaire} />)
                :
                <Commentaire commentaire={commentaires[0]} />
            }
          </Stack>
        </Card.Section>
      </>
    }

    {/* Btn voir plus */}
    {
      commentaires?.length > 1 && <Card.Section ta="right" p="sm">
        <Button variant="light" onClick={() => setShowMoreCommentaires(old => !old)}>
          {showMoreCommentaires ? "Voir moins" : "Voir plus"}
        </Button>
      </Card.Section>
    }
  </Card>
}

export default Post;
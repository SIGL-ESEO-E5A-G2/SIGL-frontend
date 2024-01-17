import './blog.css';

import { useEffect, useState, useContext, useMemo } from 'react';
import { Button, Stack, Container, Group, keys } from "@mantine/core";
import { Send } from 'react-bootstrap-icons';

import Post from './Post';

import { request } from '../../utils/request';
import { UserContext } from '../../context/UserContext';
import ModalAddMessage from './ModalAddMessage';
import FiltresPosts, { handleFilters } from './FiltresPosts';
import useArray from '../../hooks/useArray';

const BlogComponent = () => {
  const [showPopup, setShowPopup] = useState(false);

  const [filtres, setFiltre, setFiltres] = useArray();
  const [posts, setPosts] = useState([]);
  const postsFiltered = useMemo(() => {
    return handleFilters(posts, filtres);
  }, [posts, filtres]);

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
    <Stack gap="xl">
      {/* Filtres */}
      <Container size="90vw">
        <FiltresPosts
          tags={tags}
          filtres={filtres}
          setFiltre={setFiltre}
          resetFiltres={() => setFiltres({})}
        />
      </Container>

      {/* Messages */}
      <Container>
        <Stack gap={50}>
          {postsFiltered.map(post => <Post user={user} post={post} updatePost={updatePost} />)}

          {postsFiltered?.length < 1 ? <>Aucun message n'a été trouvé</> : ""}
        </Stack>
      </Container>
    </Stack>

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
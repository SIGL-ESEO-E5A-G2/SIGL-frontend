import { useState } from "react";
import { Button, Group, Paper, Text, TextInput } from "@mantine/core";
import { Send } from "react-bootstrap-icons";

import { dateString, getCurrentDate, getCurrentTime } from "../../utils/formatDate";
import { request } from "../../utils/request";

export function Commentaire({ commentaire: {
    contenu,
    date,
    createur,
} }) {
    const dateFormatted = dateString(new Date(date));

    return <Paper shadow="md" p="xs" className="post-box">
        <Group justify="space-between">
            <p dangerouslySetInnerHTML={{ __html: contenu }} />
            <Text fs="italic" size="sm">Posté le {dateFormatted} par {createur}</Text>
        </Group>
    </Paper>
}

export function NouveauCommentaireForm({ messageId, user, addCommentaire }) {
    const [message, setMessage] = useState();

    function handleSubmit() {
        if (!message) return

        const newCommentaire = {
            createur: user.id,
            date: getCurrentDate(),
            time: getCurrentTime(),
            contenu: message,
            message: messageId
        };

        return request('/commentaire', 'post', newCommentaire)
            .then((res) => {
                setMessage('');
                addCommentaire({ ...res.data, createur: user.nomComplet });
            });
    }

    return <Group w="100%">
        <TextInput
            w="85%"
            variant="filled"
            placeholder="Ecrivez un commentaire"
            value={message}
            onChange={e => setMessage(e.target.value)}
        />

        <Button onClick={handleSubmit} rightSection={<Send />}>Envoyer</Button>
    </Group>
}

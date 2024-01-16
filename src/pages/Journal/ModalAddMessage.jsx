import { useState } from "react";
import ReactQuill from 'react-quill';
import { X } from "react-bootstrap-icons";
import { notifications } from "@mantine/notifications";
import { Flex, Stack, Text, TextInput } from "@mantine/core";

import Modal from "../../components/Modal";
import useArray from '../../hooks/useArray';
import { request } from "../../utils/request";
import SelectTags from '../../components/SelectTags';
import { getCurrentDate, getCurrentTime } from "../../utils/formatDate";

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

function createPost({ title, body, tags }, apprenti) {
    if (!title?.trim() || !body?.trim()) {
        alert('Le titre et le message ne peuvent pas être vides.');
        return;
    }

    const userId = apprenti.utilisateur.id;

    const cible = [userId, apprenti.tuteurPedagogique?.id, apprenti.maitreAlternance?.id]
        .filter(id => id);

    const newPost = {
        titre: title.trim(),
        contenu: body.trim(),
        date: getCurrentDate(),
        time: getCurrentTime(),
        createur: userId,
        destinataire: cible,
        tags: tags
    };

    return request("/message/", "post", newPost)
        .then((response) => request(`/messagedetail/${response.data.id}`))
        .then(({ data }) => data)
        .catch(err => {
            notifications.show({
                title: "Erreur",
                message: "Une erreur est survenue lors de l'envoie du message",
                color: 'red',
                icon: <X />,
            });

            throw err; // continue
        });
}

function ModalAddMessage({ show, close, addPost, apprenti, tags }) {
    const [errors, setErrors] = useState({});
    const [values, setValue_, setValues] = useArray();
    function setValue(key, value) {
        setValue_(key, value);
        setErrors(old => ({ ...old, [key]: null }));
    }

    function checkIfFormIncorrect() {
        const errors = {};

        if (!values.title) {
            errors.title = "Champs requis";
        }

        if (!values.body) {
            errors.body = "Champs requis";
        }

        if (Object.values(errors).length > 0) {
            setErrors(errors);
            return true;
        }

        return false;
    }

    return <Modal
        opened={show}
        onClose={() => {
            setValues({});
            close();
        }}
        title="Nouveau message"
        validateLabel="Envoyer"
        size="lg"
        checkErrors={checkIfFormIncorrect}
        handleSubmit={() => createPost(values, apprenti).then(addPost)}
    >
        <Stack>
            {/* Titre */}
            <TextInput
                label="Titre"
                required
                onChange={e => setValue('title', e.target.value)}
                error={errors.title}
            />

            {/* Tags */}
            <SelectTags
                tags={tags}
                onChange={selected => setValue('tags', selected)}
            />

            {/* Body */}
            <div>
                {/* Label */}
                <Flex>
                    <Text size="sm">Corps de message</Text>
                    &nbsp;
                    <Text size="sm" c="red">*</Text>
                </Flex>

                <ReactQuill
                    theme="snow"
                    placeholder="Message"
                    modules={textEditorModules}
                    onChange={value => setValue('body', value)}
                />

                {errors.body && <Text size="sm" c="red">{errors.body}</Text>}
            </div>
        </Stack>
    </Modal>
}

export default ModalAddMessage;

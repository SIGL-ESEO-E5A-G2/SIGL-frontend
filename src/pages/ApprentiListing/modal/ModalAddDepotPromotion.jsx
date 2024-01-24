import { Flex, Stack, Text, TextInput } from "@mantine/core";
import ReactQuill from "react-quill";

import Modal from "../../../components/Modal";
import useArray from "../../../hooks/useArray";
import SelectTags from "../../../components/SelectTags";
import { tailleMaxFileEnMo, textEditorModules } from "../../../data/constantes";
import { getCurrentDate, getCurrentTime, getSimpleDate } from "../../../utils/formatDate";
import { getApprentiFromPromo } from "../../../utils/api";
import { request } from "../../../utils/request";

export function ModalAddDepotPromotion({ show, close, tags, row: promotion, user }) {
    const [errors, setError, setErrors] = useArray({});
    const [values, setValue_, setValues] = useArray();

    function setValue(key, value) {
        setValue_(key, value);
        setError(key, null);
    }

    function checkIfFormIncorrect() {
        const errors = {};

        if (!values.title) {
            errors.title = "Champs requis";
        }

        if (!values.body) {
            errors.body = "Champs requis";
        }

        if (!values.date) {
            errors.date = "Champs requis";
        }

        const sizeToMo = (values.body.length / (1024 * 1024));
        if (sizeToMo > tailleMaxFileEnMo) {
            errors.body = `Le corps du message doit faire moins de ${tailleMaxFileEnMo}Mo`;
        }

        if (Object.values(errors).length > 0) {
            setErrors(errors);
            return true;
        }

        return false;
    }

    async function handleSubmit() {
        const apprentis = await getApprentiFromPromo(promotion?.id);
        const title = values.title?.trim();
        const body = values.body?.trim();
        const tags = values.tags || [];
        const echeance = getSimpleDate(new Date(values.date));

        return Promise.all(apprentis.map(apprenti => {
            const newPost = {
                titre: title,
                contenu: body,
                date: getCurrentDate(),
                time: getCurrentTime(),
                createur: user.id,
                destinataire: [apprenti?.utilisateur?.id],
                tags: tags
            };

            return request("/message/", "post", newPost)
                .then(res => request('/depot/', 'post', {
                    echeance: echeance,
                    dateLivraison: null,
                    cheminFichier: "non-depose",
                    message: res.data?.id
                }));
        }));
    }

    return <Modal
        opened={show}
        onClose={() => {
            setValues({});
            close();
        }}
        title="Nouveau dépôt"
        validateLabel="Envoyer"
        size="lg"
        checkErrors={checkIfFormIncorrect}
        handleSubmit={handleSubmit}
        notification={{
            title: "Envoie du message",
            message: "Le dépôt est en cour d'enregistrement",
            messageSuccess: "Le dépôt a été enregistrer",
            messageError: "Une erreur est survenue lors de l'enregistrement du dépôt"
        }}
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

            <TextInput
                label="Date d'échéance"
                required
                type="date"
                value={values.date}
                onChange={e => setValue('date', e.target.value)}
                error={errors.date}
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

export default ModalAddDepotPromotion;
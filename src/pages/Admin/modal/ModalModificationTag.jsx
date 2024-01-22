import { useState } from "react";
import { ColorInput, Select, Stack, TextInput } from "@mantine/core";

import Modal from "../../../components/Modal";
import { request } from "../../../utils/request";
import { typeTag } from "../../../data/constantes";

export function ModalModificationTag({ show, close, row, callback }) {
    const [errors, setErrors] = useState({});

    function verifiForm(e) {
        const errors = {};

        const submit = {
            libelle: e.target['libelle'].value,
            couleur: e.target['couleur'].value,
            type: e.target['type'].value,
        }

        if (!submit.libelle) {
            errors.libelle = "Champs requis";
        }

        const regexColor = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/;
        if (submit.couleur && !regexColor.test(submit.couleur)) {
            errors.couleur = "La couleur n'est pas au bon format";
        }

        if (!submit.type) {
            errors.type = "Champs requis";
        }

        if (Object.values(errors).length > 0) {
            setErrors(errors);
            return true;
        } else return false;
    }

    return <Modal
        opened={show}
        onClose={close}
        title="Modification de tag"
        validateLabel="Enregistrer"
        checkErrors={verifiForm}
        handleSubmit={(e) => request(`/tag/${row?.id}`, 'patch', {
            libelle: e.target['libelle'].value,
            couleur: e.target['couleur'].value,
            type: e.target['type'].value,
        })
            .then((res) => callback(res.data))}
        notification={{
            title: "Synchronisation",
            message: "Vos modifications sont en cours d'enregistrement",
            messageSuccess: "Le tag a été modifié",
            messageError: "Une erreur est survenue lors de la modification du tag",
        }}
    >
        <Stack>
            <TextInput
                name="libelle"
                label="Nom"
                required
                placeholder="Saisissez un nom"
                defaultValue={row?.libelle}
                error={errors.libelle}
            />

            <ColorInput
                name="couleur"
                label="Couleur"
                placeholder="Sélectionnez une couleur"
                defaultValue={row?.couleur}
                error={errors.couleur}
            />

            <Select
                name="type"
                label="Type de tag"
                required
                placeholder="Sélectionnez un type de tag"
                defaultValue={row?.type}
                data={typeTag}
                error={errors.type}
            />
        </Stack>
    </Modal>
}

export default ModalModificationTag;

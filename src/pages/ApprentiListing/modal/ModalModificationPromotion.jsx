import { useState } from "react";
import { Select, Stack, TextInput } from "@mantine/core";

import Modal from "../../../components/Modal";
import { semesters } from "../../../data/constantes";
import { request } from "../../../utils/request";

export function ModalModificationPromotion({ show, close, row, callback }) {
    const [errors, setErrors] = useState({});

    function verifyForm(e) {
        const errors = {};

        const submit = {
            libelle: e.target['libelle'].value,
            semestre: e.target['semestre'].value,
        }

        if (!submit.libelle) {
            errors.libelle = "Champs requis";
        }

        if (!submit.semestre) {
            errors.semestre = "Champs requis";
        }

        if (Object.values(errors).length > 0) {
            setErrors(errors);
            return true;
        } else return false;
    }

    async function synchToDB(e) {
        return request(`/promotion/${row?.id}`, 'patch', {
            libelle: e.target['libelle'].value,
            semestre: e.target['semestre'].value
        })
            .then((res) => callback(res.data));
    }

    return <Modal
        opened={show}
        onClose={close}
        title="Modifier une promotion"
        validateLabel="Enregistrer"
        checkErrors={verifyForm}
        handleSubmit={synchToDB}
        notification={{
            title: "Synchronisation",
            message: "Vos modifications sont en cours d'enregistrement",
            messageSuccess: "La promotion a été modifiée",
            messageError: "Une erreur est survenue lors de la modification de la promotion",
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

            <Select
                name="semestre"
                label="Semestre"
                required
                placeholder="Sélectionnez un semestre"
                defaultValue={row?.semestre}
                data={semesters}
                error={errors.semestre}
            />
        </Stack>
    </Modal>
}

export default ModalModificationPromotion;

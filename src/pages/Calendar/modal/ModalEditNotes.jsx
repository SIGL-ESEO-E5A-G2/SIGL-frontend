import { useState } from "react";
import { NumberInput } from "@mantine/core";

import Modal from "../../../components/Modal";
import { request } from "../../../utils/request";
import { notifications } from "@mantine/notifications";
import { X } from "react-bootstrap-icons";

export function ModalEditNotes({ show, close, rowId, callback }) {
    const [error, setError] = useState();

    return <Modal
        opened={show}
        onClose={() => {
            close();
            setError();
        }}
        title="Modification de la note"
        validateLabel=""
        checkErrors={(e) => {
            const note = e.target["note"].value;

            if (!note) {
                setError("Champs requis");
                return true;
            }

            if (note < 0 || note > 20) {
                setError("");
                return true;
            }

            return false;
        }}
        handleSubmit={(e) => {
            const note = e.target["note"].value;

            request(`/entretiensemestriel/${rowId}/`, 'patch', { noteSemestre: note })
                .then(() => callback(rowId, note))
                .catch(() => notifications.show({
                    title: "Erreur",
                    message: "Une erreur est survenue lors de la modification de la note",
                    color: "red",
                    icon: <X />
                }));
        }}
    >
        <NumberInput
            name="note"
            label="Note"
            required
            defaultValue={10.0}
            error={error}
        />
    </Modal>
}
import { useState } from "react";
import { FileInput } from "@mantine/core";

import Modal from "../../components/Modal";

function ModalUploadFile({ show, close, uploadFile }) {
    const [error, setError] = useState();
    const [file, setFile] = useState();

    function checkIfFormIncorrect() {
        if (!file) {
            setError("Champs requis");
            return true;
        }

        return false;
    }

    return <Modal
        opened={show}
        onClose={close}
        title="Dépôt de document"
        validateLabel="Déposer"

        checkErrors={checkIfFormIncorrect}
        handleSubmit={() => uploadFile(file)}

        notification={{
            title: "Envoie du fichier",
            message: "Votre fichier est envoyer et en cours d'enregistrement",
            messageSuccess: "Votre fichier est déposé sur le serveur",
            messageError: "Une erreur est survenue lors du dépôt de votre fichier",
        }}
    >
        <FileInput
            label="Document"
            required
            error={error}
            clearable
            accept=".pdf"
            placeholder="Choisir un document"
            onChange={(newFile) => {
                setFile(newFile);
                if (error) setError();
            }}
        />
    </Modal>
}

export default ModalUploadFile;

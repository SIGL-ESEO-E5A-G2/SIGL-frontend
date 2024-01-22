import { Center } from "@mantine/core";
import Modal from "../../../components/Modal";

export function ModalSuppressionUsers({ show, close, userIds }) {
    async function deleteUsers() {
        return Promise.all(userIds.map((userId) => {
            return request(`/utilisateur/${userId}`, 'delete')
        }));
    }

    return <Modal
        opened={show}
        onClose={close}
        title="Suppression d'utilisateurs"
        validateLabel="Je suis sur"
        handleSubmit={deleteUsers}
        notification={{
            title: "Suppression des utilisateurs",
            message: "Les utilisateurs sont en cours de suppression",
            messageSuccess: "Les utilisateurs ont été supprimés",
            messageError: "Une erreur est survenue lors de la suppression des utilisateurs"
        }}
    >
        <Center>Êtes-vous sur de vouloir supprimer {userIds.length} utilisateurs ? </Center>
    </Modal>
}
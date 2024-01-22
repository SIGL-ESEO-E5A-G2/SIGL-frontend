import Modal from "../../../components/Modal";
import { request } from "../../../utils/request";

export function ModalRemoveTag({ show, close, row, callback }) {
    return <Modal
        opened={show}
        onClose={close}
        title="Supprimer un tag"
        validateLabel="Supprimer"
        handleSubmit={() => request(`/tag/${row?.id}`, 'delete')
            .then(() => callback(row?.id))}
        notification={{
            title: "Suppression",
            message: `Suppression du tag ${row?.libelle} en cours`,
            messageSuccess: "Le tag a été supprimée",
            messageError: "Une erreur est survenue lors de la suppression du tag",
        }}
    >
        Êtes-vous sûr de vouloir supprimer le tag <b>{row?.libelle}</b>
    </Modal>
}

export default ModalRemoveTag;

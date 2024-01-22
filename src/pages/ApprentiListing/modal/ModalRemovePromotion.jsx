import Modal from "../../../components/Modal";
import { request } from "../../../utils/request";

export function ModalRemovePromotion({ show, close, row, callback }) {
    return <Modal
        opened={show}
        onClose={close}
        title="Supprimer une promotion"
        validateLabel="Supprimer"
        handleSubmit={() => request(`/promotion/${row?.id}`, 'delete')
            .then(() => callback(row?.id))}
        notification={{
            title: "Suppression",
            message: `Suppression de la promotion ${row?.libelle} en cours`,
            messageSuccess: "La promotion a été supprimée",
            messageError: "Une erreur est survenue lors de la suppression de la promotion",
        }}
    >
        Êtes-vous sûr de vouloir supprimer la promotion <b>{row?.libelle}</b>
    </Modal>
}

export default ModalRemovePromotion;

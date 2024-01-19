import Modal from "../../../components/Modal";
import { getNomUser } from "../../../utils/divers";

export function ModalModificationApprenti({ show, close, row }) {
    return <Modal
        opened={show}
        onClose={close}
        title={"Modification de l'apprenti " + getNomUser(row?.utilisateur)}
        validateLabel="Enregistrer"
    >
        {/* TODO */}
        Hey
    </Modal>
}

export default ModalModificationApprenti;

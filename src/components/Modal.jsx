import { Button, Group, Modal as ModalMantine, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Check2, X } from "react-bootstrap-icons";

import { isFunc } from "../utils/divers";
import { notifTimeoutLong, notifTimeoutShort } from "../data/constantes";


function Modal({
    validateLabel,  // nom du btn de validation
    checkErrors,    // fonction qui verifie les erreurs (appeler avant handleSubmit)
    handleSubmit,   // fonction qui envoie les donnnes a la db (la modal se ferme avant son appel)
    notification,
    children,       // le formulaire
    ...rest
}) {
    async function submit() {
        if (isFunc(checkErrors)) {
            // arrete l'envoie si erreurs trouvees
            if (checkErrors()) return;
        }

        rest.onClose();

        if (notification) {
            const {
                title,
                message,
                messageSuccess,
                messageError,
            } = notification;

            const notifId = notifications.show({
                loading: true,
                title: title,
                message: message,
                autoClose: false,
                withCloseButton: false,
            });

            return handleSubmit()
                .then(() => notifications.update({
                    id: notifId,
                    color: 'green',
                    message: messageSuccess,
                    icon: <Check2 />,
                    loading: false,
                    autoClose: notifTimeoutShort,
                    withCloseButton: true,
                }))
                .catch(() => notifications.update({
                    id: notifId,
                    color: 'red',
                    message: messageError || "Une erreur est survenue",
                    icon: <X />,
                    loading: false,
                    autoClose: notifTimeoutLong,
                    withCloseButton: true,
                }));
        } else {
            return handleSubmit();
        }
    }

    return <ModalMantine {...rest}>
        <Stack p="md">
            {children}

            <Group justify="right">
                <Button
                    color="red"
                    type="button"
                    onClick={rest.onClose}
                >
                    Annuler
                </Button>

                <Button
                    color="green"
                    type="button"
                    onClick={submit}
                >
                    {validateLabel}
                </Button>
            </Group>
        </Stack>
    </ModalMantine>
}

export default Modal;

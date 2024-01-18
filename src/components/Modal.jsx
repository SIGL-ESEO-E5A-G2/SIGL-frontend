import { Button, Group, Modal as ModalMantine, Stack } from "@mantine/core";

import { isFunc, withNotification } from "../utils/divers";


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
            withNotification(handleSubmit, notification);
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

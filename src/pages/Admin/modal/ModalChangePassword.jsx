import { useState } from "react";
import { Stack, TextInput } from "@mantine/core";
import { Eye, EyeSlash } from "react-bootstrap-icons";

import Modal from "../../../components/Modal";
import { request } from "../../../utils/request";
import { hashPassword } from "../../../utils/encryption";

export function ModalChangePassword({ show, close, row }) {
    const [errors, setErrors] = useState({});
    const [isPassVisible, setPassVisible] = useState();
    const [isVerifVisible, setVerifVisible] = useState();

    function isFormInvalide(e) {
        const errors = {};
        const values = {
            password: e.target["user-pass"].value,
            validation: e.target["user-valid"].value,
        }

        if (!values.password) {
            errors.password = "Champs requis";
        }

        if (!values.validation) {
            errors.validation = "Champs requis";
        }

        if (values.validation !== values.password) {
            errors.verif = "Les mots de passe ne correspondent pas";
        }

        if (Object.values(errors).length > 0) {
            setErrors(errors);
            return true;
        }

        return false;
    }

    return <Modal
        opened={show}
        onClose={close}
        title="Changement de mot de passe"
        validateLabel="Enregistrer"
        checkErrors={isFormInvalide}
        handleSubmit={(e) => hashPassword(e.target["user-pass"].value)
            .then(hashedPassword => request(`/utilisateur/${row?.id}`, 'patch', {
                password: hashedPassword
            }))
        }
        notification={{
            title: "Changement de mot de passe",
            message: "Le mot de passe est en cours de modification",
            messageSuccess: "Le mot de passe a été changé",
            messageError: "Une erreur est survenue lors de la modification du mot de passe",
        }}
    >
        <Stack>
            <TextInput
                name="user-pass"
                label="Nouveau mot de passe"
                type={isPassVisible ? "text" : "password"}
                required
                placeholder="Entrer votre nouveau mot de passe"
                error={errors.password}
                rightSection={<div className='pass-visible' onClick={() => setPassVisible(old => !old)}>
                    {isPassVisible ? <EyeSlash /> : <Eye />}
                </div>}
            />

            <TextInput
                name="user-valid"
                label="Confirmez le nouveau mot de passe"
                type={isVerifVisible ? "text" : "password"}
                required
                placeholder="Confirmez votre nouveau mot de passe"
                error={errors.verif}
                rightSection={<div className='pass-visible' onClick={() => setVerifVisible(old => !old)}>
                    {isVerifVisible ? <EyeSlash /> : <Eye />}
                </div>}
            />
        </Stack>
    </Modal>
}
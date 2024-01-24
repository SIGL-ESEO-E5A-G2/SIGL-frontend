import { useEffect } from "react";
import { Group, NumberInput, Select, Stack, TextInput } from "@mantine/core";

import Modal from "../../../components/Modal";
import { getNomUser } from "../../../utils/divers";
import useArray from "../../../hooks/useArray";
import { request } from "../../../utils/request";

export function ModalModificationApprenti({
    show,
    close,
    row,
    callback,
    tuteurs = [],
    maitreAlternances = [],
    promotions = [],
}) {
    const [values, setValue_, setValues] = useArray();
    const [errors, setError, setErrors] = useArray();
    function setValue(key, value) {
        setError(key, null);
        setValue_(key, value);
    }

    useEffect(() => {
        if (show) {
            setValues({
                tuteurPedagogique: row.tuteurPedagogique?.id + "",
                maitreAlternance: row.maitreAlternance?.id + "",
                promotion: row.promotion?.id + "",
                optionMajeure: row.optionMajeure,
                optionMineure: row.optionMineure,
            });
        } else {
            setValues({});
        }
    }, [show]);

    function isFormInvalid() {
        const errors = {};

        if (!values.tuteurPedagogique) {
            errors.tuteurPedagogique = "Champs requis";
        }

        if (!values.maitreAlternance) {
            errors.maitreAlternance = "Champs requis";
        }

        if (!values.promotion) {
            errors.promotion = "Champs requis";
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
        title={"Modification de l'apprenti " + getNomUser(row?.utilisateur)}
        validateLabel="Enregistrer"
        checkErrors={isFormInvalid}
        handleSubmit={() => request(`/apprenti/${row?.id}`, 'patch', values)
            .then(({ data }) => request(`/apprentidetail/${data.id}`, 'get'))
            .then(res => callback(res.data))
        }
        notification={{
            title: "Synchronisation",
            message: "L'apprenti est en cour de modification",
            messageSuccess: "L'apprenti a été mis à jour",
            messageError: "Une erreur est survenue lors de la mise à jour de l'apprenti",
        }}
    >
        <Stack>
            <Group grow>
                <Select
                    label="Tuteur Pédagogique"
                    required
                    data={tuteurs}
                    value={values.tuteurPedagogique}
                    onChange={value => setValue("tuteurPedagogique", value)}
                    error={errors.tuteurPedagogique}
                />

                <Select
                    label="Maître d'alternance"
                    required
                    data={maitreAlternances}
                    value={values.maitreAlternance}
                    onChange={value => setValue("maitreAlternance", value)}
                    error={errors.maitreAlternance}
                />
            </Group>

            <Select
                label="Promotion"
                required
                data={promotions}
                value={values.promotion}
                onChange={value => setValue("promotion", value)}
                error={errors.promotion}
            />

            <Group grow>
                <TextInput
                    label="Option majeure"
                    value={values.optionMajeure}
                    onChange={e => setValue("optionMajeure", e.target.value)}
                />

                <TextInput
                    label="Option mineure"
                    value={values.optionMineure}
                    onChange={e => setValue("optionMineure", e.target.value)}
                />
            </Group>

            {/* <Select
                label="Entreprise"
                required
                data={[]}
                value={values.entreprise}
                onChange={value => setValue("entreprise", value)}
            />

            <TextInput
                label="Intitulé du post"
                required
                value={values.intitulePoste}
                onChange={e => setValue("intitulePoste", e.target.value)}
            />

            <TextInput
                label="Descriptif du post"
                value={values.descriptifPoste}
                onChange={e => setValue("descriptifPoste", e.target.value)}
            />

            <TextInput
                label="Classification de la convention collective"
                required
                value={values.classificationConventionCollective}
                onChange={e => setValue("classificationConventionCollective", e.target.value)}
            />

            <NumberInput
                label="Durée hebdomadaire du contrat"
                value={values.dureeHebdoContrat}
                onChange={value => setValue("dureeHebdoContrat", value)}
            />

            <Select
                label="OPCO"
                data={[]}
                value={values.opco}
                onChange={value => setValue("opco", value)}
            /> */}
        </Stack>
    </Modal>
}

export default ModalModificationApprenti;

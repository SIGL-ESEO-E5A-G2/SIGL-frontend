import { useContext, useEffect, useState } from "react";
import { Group, MultiSelect, Select, Stack, TextInput, Textarea } from "@mantine/core";

import Modal from "../../../components/Modal";
import { UserContext } from "../../../context/UserContext";
import useArray from "../../../hooks/useArray";
import { request } from "../../../utils/request";
import { getNomUser, isDateValid } from "../../../utils/divers";
import { semesters } from "../../../data/constantes";

const typeEvenements = semesters.map(semestre => ({
    value: semestre,
    label: "Entretien semestriel " + semestre
}))

export function ModalNewEvent({ show, close, apprenti, callback }) {
    const [errors, setError, setErrors] = useArray();
    const [values, setValue_, setValues] = useArray();
    function setValue(key, value) {
        setError(key, null);
        setValue_(key, value);
    }

    const [destinataires, setDestinataires] = useState([]);

    const user = useContext(UserContext);

    function isFormInvalid() {
        const errors = {};

        if (!values.type) {
            errors.type = "Champs requis";
        }

        if (!values.dateDebut) {
            errors.dateDebut = "Champs requis";
        }

        if (!isDateValid(values.dateDebut)) {
            errors.dateDebut = "Date invalide";
        }

        if (!values.destinataires?.length) {
            errors.destinataires = "Champs requis";
        }

        if (Object.values(errors).length > 0) {
            setErrors(errors);
            return true;
        }

        return false;
    }

    useEffect(() => {
        if (!apprenti) return;

        const destinataires = [
            { ...apprenti.tuteurPedagogique?.utilisateur, type: "tuteur" },
            { ...apprenti.maitreAlternance?.utilisateur, type: "MA" },
        ]
            .filter(item => item)
            .map(item => ({
                value: item.id + "",
                label: `${getNomUser(item)} (${item.type})`
            }));

        setDestinataires(destinataires);
        setValue("destinataires", destinataires.map(item => item.value));
    }, [apprenti]);

    return <Modal
        opened={show}
        onClose={() => {
            close();
            setValues({ destinataires: destinataires.map(item => item.value) });
        }}
        title="Nouvel évènement"
        validateLabel="Ajouter"
        checkErrors={isFormInvalid}
        handleSubmit={() => request('/evenement', 'post', {
            libelle: typeEvenements.find(type => type.value === values.type)?.label,
            dateDebut: values.dateDebut,
            dateFin: values.dateDebut,
            description: values.description,
            apprenti: apprenti?.id
        })
            .then(async ({ data }) => {
                return request('/entretiensemestriel/', 'post', {
                    noteSemestre: -1,
                    evenement: data.id,
                    tuteurPedagogique: apprenti?.tuteurPedagogique?.id,
                    maitreAlternance: apprenti?.maitreAlternance?.id,
                })
                    .then(res => callback({
                        ...res.data,
                        evenement: data
                    }));
            })
        }

        notification={{
            title: "Synchronisation",
            message: "L'évènement est en train d'être enregistré",
            messageSuccess: "L'évènement à été ajouté à votre calendrier",
            messageError: "Une erreur est survenue lors de l'enregistrement de l'évènement",
        }}
    >
        <Stack>
            <Select
                label="Type d'évènement"
                required
                data={typeEvenements}
                value={values.type}
                onChange={value => setValue("type", value)}
                error={errors.type}
            />

            <MultiSelect
                label="Personnes concernées"
                required
                data={destinataires}
                disabled
                value={values.destinataires}
                onChange={value => setValue("destinataires", value)}
                error={errors.destinataires}
            />

            <Group grow>
                <TextInput
                    label="Date de l'évènement"
                    required
                    type="date"
                    value={values.dateDebut}
                    onChange={e => setValue("dateDebut", e.target.value)}
                    error={errors.dateDebut}
                />
            </Group>

            <Textarea
                label="Description"
                value={values.description}
                onChange={e => setValue("description", e.target.value)}
            />
        </Stack>
    </Modal>
}
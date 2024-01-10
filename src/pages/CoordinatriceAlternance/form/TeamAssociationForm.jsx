import React, { useState, useEffect } from 'react';
import { Button, Select } from '@mantine/core';

import FormTemplate from '../../../components/FormTemplate';
import { request } from '../../../utils/request.js';

function userToLabel(data = []) {
    return data.map(row => ({
        ...row,
        value: row.id + "",
        label: `${row.utilisateur?.prenom} ${row.utilisateur?.nom}`
    }));
}

const TeamAssociatonForm = () => {
    const [apprentis, setApprentis] = useState([]);
    const [maitresApprentissage, setMaitresApprentissage] = useState([]);
    const [tuteurs, setTuteurs] = useState([]);

    useEffect(() => {
        // load apprentis
        request("/apprentidetail/")
            .then(({ data }) => setApprentis(userToLabel(data)));

        // load MA
        request("/maitrealternancedetail/")
            .then(({ data }) => setMaitresApprentissage(userToLabel(data)));

        //load tuteur
        request("/tuteurpedagogiquedetail/")
            .then(({ data }) => setTuteurs(userToLabel(data)));
    }, []);

    const handleAssocierClick = () => {
        const apprentiId = parseInt(document.getElementById('associerApprenti').value, 10);
        const maId = parseInt(document.getElementById('associerMA').value, 10);
        const tuteurId = parseInt(document.getElementById('associerTuteur').value, 10);

        request("/apprenti/" + apprentiId + "/")
            .then((response) => {
                console.log("GET request successful:", response.data.id);

                const data = {
                    "optionMineure": response.data.optionMineure,
                    "optionMajeure": response.data.optionMajeure,
                    "utilisateur": response.data.utilisateur,
                    "maitreAlternance": maId,
                    "tuteurPedagogique": tuteurId,
                };

                return request("/apprenti/" + apprentiId + "/", "put", data);
            })
            .then((res) => {
                // Handle the response of the PUT request if necessary
                console.log("PUT request successful:", res);
            })
            .catch((error) => {
                // Handle errors for both GET and PUT requests
                if (error.response) {
                    // La requête a été effectuée, mais le serveur a répondu avec un code d'erreur
                    console.error("Réponse d'erreur du serveur :", error.response.data);
                } else if (error.request) {
                    // La requête a été effectuée, mais aucune réponse n'a été reçue
                    console.error("Aucune réponse reçue du serveur :", error.request);
                } else {
                    // Une erreur s'est produite lors de la configuration de la requête
                    console.error("Erreur de configuration de la requête :", error.message);
                }
            });
    };

    return (
        <FormTemplate title="Associer un apprenti à une équipe tutorale">
            <Select
                id="associerApprenti"
                label="Apprenti"
                data={apprentis}
            />

            <Select
                id="associerMA"
                label="Maitre d'apprentissage"
                data={maitresApprentissage}
            />

            <Select
                id="associerTuteur"
                label="Tuteur"
                data={tuteurs}
            />

            <Button type="button" onClick={handleAssocierClick}>
                Associer
            </Button>
        </FormTemplate>
    );
};

export default TeamAssociatonForm;

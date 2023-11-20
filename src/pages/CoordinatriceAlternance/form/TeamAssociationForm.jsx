import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import FormTemplate from '../../../components/FormTemplate';
import { request } from '../../../utils/request.js';

const TeamAssociatonForm = () => {
    const [apprenti, setApprenti] = useState([]);
    const [maitre, setMaitre] = useState([]);
    const [tuteur, setTuteur] = useState([]);

    useEffect(() => {
        request("/apprentidetail/")
            .then((res) => {
                setApprenti(res.data);
            });
    }, []);

    useEffect(() => {
        request("/maitrealternancedetail/")
            .then((res) => {
                setMaitre(res.data);
            });
    }, []);

    useEffect(() => {
        request("/tuteurpedagogiquedetail/")
            .then((res) => {
                setTuteur(res.data);
            });
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
    
            return request("/apprenti/" + apprentiId + "/", "put",data);
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
        <FormTemplate title="Associer apprenti à l'équipe tutorale">
            <Form.Group className="mb-3">
                <Form.Label>Apprenti:</Form.Label>
                <Form.Select id="associerApprenti" name="apprenti">
                    {apprenti.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.utilisateur.prenom} {item.utilisateur.nom}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Maitre d'apprentissage:</Form.Label>
                <Form.Select id="associerMA" name="MA">
                    {maitre.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.utilisateur.prenom} {item.utilisateur.nom}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Tuteur:</Form.Label>
                <Form.Select id="associerTuteur" name="tuteur">
                    {tuteur.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.utilisateur.prenom} {item.utilisateur.nom}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Button variant="primary" type="button" onClick={handleAssocierClick}>
                Associer
            </Button>
        </FormTemplate>
    );
};

export default TeamAssociatonForm;

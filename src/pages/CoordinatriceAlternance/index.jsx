import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import DynamicFormTutoralTeam from "./form/DynamicFormTutoralTeam";
import DynamicFormPlanningDates from "./form/DynamicFormPlanningDates";
import TeamAssociationForm from "./form/TeamAssociationForm";
import FormTemplate from '../../components/FormTemplate';
import {request} from '../../utils/request.js';

export default function ({
    
}) {
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
    
    /*useEffect(() => {
        const fetchUtilisateurs = async () => {
            const usersData = await Promise.all(
                apprenti.map((item) => (
                    request("/utilisateur/" + item.utilisateur)
                        .then((res) => ({
                            id: item.id,  // Ajoutez l'id de l'apprenti ici
                            prenom: res.data.prenom,
                            nom: res.data.nom,
                        }))
                ))
            );
            setUtilisateur(usersData);
        };
    
        if (apprenti.length > 0) {
            fetchUtilisateurs();
        }
    }, [apprenti]);*/
    
    return <>

        
        <div>
            <TeamAssociationForm />
        </div>

        <FormTemplate title="Créer un journal de formation" buttonText="Créer le journal">
            <Form.Group className="mb-3">
                <Form.Label>Apprenti:</Form.Label>
                <Form.Select id="apprenti" name="apprenti">
                {apprenti.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.utilisateur.prenom} {item.utilisateur.nom}
                    </option>
                ))}
                </Form.Select>
                <Button variant="primary" type="button">
                    Associer
                </Button>
            </Form.Group>

        </FormTemplate>

        <div>
            <DynamicFormTutoralTeam />
        </div>

        <div>
            <DynamicFormPlanningDates />
        </div>
    </>
}

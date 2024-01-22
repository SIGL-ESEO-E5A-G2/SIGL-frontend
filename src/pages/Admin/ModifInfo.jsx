import { Button, Stack, TextInput } from '@mantine/core';
import React, { useState, useEffect, useContext } from 'react';
import { request } from '../../utils/request';
import { UserContext } from '../../context/UserContext';

function ModifInfo() {

    const user = useContext(UserContext)
    const [userInfo, setUserInfo] = useState({
        id: '',
        nom: '',
        prenom: '',
        telephone: '',
        email: '',
        optionMajeure: '',
        optionMineure: '',
        intitulePoste: '',
        descriptifPoste: '',
    });


    useEffect(() => {
        // Exemple de requête HTTP pour récupérer les données de l'utilisateur actuel
        request('/apprentiutilisateurdetail?utilisateur=' + user.id, 'get')
            .then((res) => res.data ? res.data[0] : null)
            .then((data) => {
                // Mettre à jour le state avec les données de l'utilisateur actuel
                setUserInfo({
                    ...data?.utilisateur,
                    ...data
                });
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des informations utilisateur :', error);
            });
    }, []);

    // Fonction pour envoyer les informations mises à jour à la base de données
    const saveUserInfoToDatabase = () => {
        // Crée une copie de userInfo en excluant les propriétés indésirables
        const { utilisateur, tuteurPedagogique, maitreAlternance, promotion, entreprise, opco, ...userInfoToSend } = userInfo;
    
        const apprenticeRequest = request('/apprenti/' + userInfo.id, 'patch', userInfoToSend);
        const userRequest = request('/utilisateur/' + user.id, 'patch', userInfoToSend);
    
        // Utilisation de Promise.all pour attendre que les deux requêtes soient terminées
        Promise.all([apprenticeRequest, userRequest])
            .then((responses) => {
                console.log('Informations mises à jour avec succès.');
                // Ajouter ici la logique pour gérer le succès de la mise à jour
            })
            .catch((errors) => {
                // Affichez les erreurs ou effectuez une action en cas d'échec de l'une des requêtes
                console.error('Erreur lors de la mise à jour des informations :', errors);
                // Ajouter ici la logique pour gérer les erreurs
            });
    };

    return (
        <div>
            <h1>Modification des données utilisateur</h1>
            <br />

            <Stack>
                <TextInput
                    label="Nom de l'utilisateur"
                    defaultValue={userInfo.nom}
                    onChange={(e) => setUserInfo({ ...userInfo, nom: e.target.value })}
                />

                <TextInput
                    label="Prenom de l'utilisateur"
                    defaultValue={userInfo.prenom}
                    onChange={(e) => setUserInfo({ ...userInfo, prenom: e.target.value })}
                />

                <TextInput
                    label="Téléphone de l'utilisateur"
                    defaultValue={userInfo.telephone}
                    onChange={(e) => setUserInfo({ ...userInfo, telephone: e.target.value })}
                />

                <TextInput
                    label="Option Majeure"
                    defaultValue={userInfo.optionMajeure}
                    onChange={(e) => setUserInfo({ ...userInfo, optionMajeure: e.target.value })}
                />

                <TextInput
                    label="Option Mineure"
                    defaultValue={userInfo.optionMineure}
                    onChange={(e) => setUserInfo({ ...userInfo, optionMineure: e.target.value })}
                />

                <TextInput
                    label="Intitulé du poste"
                    defaultValue={userInfo.intitulePoste}
                    onChange={(e) => setUserInfo({ ...userInfo, intitulePoste: e.target.value })}
                />

                <TextInput
                    label="Descriptif du poste"
                    defaultValue={userInfo.descriptifPoste}
                    onChange={(e) => setUserInfo({ ...userInfo, descriptifPoste: e.target.value })}
                />

                <TextInput
                    label="Email de l'utilisateur"
                    type="email"
                    defaultValue={userInfo.email}
                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                />

                <Button onClick={saveUserInfoToDatabase}>Enregistrer les modifications</Button>
            </Stack>

        </div>
    );
}

export default ModifInfo;
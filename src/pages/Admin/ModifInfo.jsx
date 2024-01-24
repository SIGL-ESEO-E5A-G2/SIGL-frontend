import { Button, Group, Stack, TextInput, Title } from '@mantine/core';
import React, { useState, useEffect, useContext } from 'react';
import { request } from '../../utils/request';
import { UserContext } from '../../context/UserContext';
import { withNotification } from '../../utils/divers';

function ModifInfo() {
    const user = useContext(UserContext)
    const [userInfo, setUserInfo] = useState({
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
        request('/apprentiutilisateurdetail?utilisateur=' + user.id, 'get')
            .then((res) => res.data ? res.data[0] : null)
            .then((data) => {
                setUserInfo({
                    ...data?.utilisateur,
                    ...data
                });
            });
    }, []);

    // Fonction pour envoyer les informations mises à jour à la base de données
    const saveUserInfoToDatabase = () => {
        // Crée une copie de userInfo en excluant les propriétés indésirables
        const { utilisateur, tuteurPedagogique, maitreAlternance, promotion, entreprise, opco, ...userInfoToSend } = userInfo;
        delete userInfoToSend.ResponsableAdministration;
        delete userInfoToSend.ResponsableFinance;
        const apprenticeRequest = request('/apprenti/' + userInfo.id, 'patch', userInfoToSend);
        const userRequest = request('/utilisateur/' + user.id, 'patch', userInfoToSend);

        // Utilisation de Promise.all pour attendre que les deux requêtes soient terminées
        withNotification(() => Promise.all([apprenticeRequest, userRequest]), {
            title: "Synchronisation",
            message: "Mise à jour des données",
            messageSuccess: "Vos données ont été mises à jour",
            messageError: "Une erreur est survenue lors de la mise à jour des données",
        });
    };

    return (
        <Stack p="md">
            <Title order={3}>Modification des données utilisateur</Title>
            <br />

            <TextInput
                label="Email de l'utilisateur"
                type="email"
                disabled
                defaultValue={userInfo.email}
                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            />

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

            <Group justify="right">
                <Button onClick={saveUserInfoToDatabase}>Enregistrer les modifications</Button>
            </Group>
        </Stack>
    );
}

export default ModifInfo;
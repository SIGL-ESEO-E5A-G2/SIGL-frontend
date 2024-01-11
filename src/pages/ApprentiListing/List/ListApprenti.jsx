import React, { useState, useEffect } from 'react';
import { Button, Container, Select, Table } from '@mantine/core';

import { request } from '../../../utils/request.js';
import FormTemplate from '../../../components/FormTemplate.jsx';
import { putApprenti } from '../../../utils/api.js';

// ... (your imports and other code)

const ListApprenti = () => {
    const [promotions, setPromotions] = useState([]);
    const [apprentis, setApprentis] = useState([]);
    const [selectedPromotion, setSelectedPromotion] = useState('');
    const [defaultSelectionApplied, setDefaultSelectionApplied] = useState(false); // TODO remove
    const [selectedPromotionForApprenti, setSelectedPromotionForApprenti] = useState({});

    const handlePromotionChange = (e) => {
        setSelectedPromotion(e);
        setDefaultSelectionApplied(true);
    };

    useEffect(() => {
        request("/promotion/")
            .then((res) => {
                const data = (res.data || [])?.map(row => ({
                    value: row.id + "",
                    label: `${row.libelle} (${row.semestre})`
                }));

                setPromotions(data);
            });
    }, []);

    useEffect(() => {
        // Vérifiez si une promotion est sélectionnée
        const apiUrl = selectedPromotion ? `/apprentipromotion/?promotion=${selectedPromotion || ''}` : '/apprentidetail/';

        // Effectuez la requête pour obtenir les apprentis
        request(apiUrl)
            .then(({ data }) => setApprentis(data))
            .catch((error) => {
                console.error("Erreur lors de la récupération des apprentis :", error.message);
            });
    }, [selectedPromotion]);

    const handleUpdateApprenti = (idApprenti) => {
        const selectedPromotionId = defaultSelectionApplied ? selectedPromotionForApprenti[idApprenti] : promotions[0]?.id;

        request(`/apprenti/${idApprenti}`)
            .then((jsonApprenti) => {

                const updateApprenti = {
                    "promotion": selectedPromotionId,
                };
                putApprenti(idApprenti, jsonApprenti.data, updateApprenti);
            })
            .catch((error) => {
                console.error("Erreur lors de la mise à jour de l'apprenti :", error.message);
            });
        // Effectuer la requête pour mettre à jour l'apprenti avec l'id spécifié et la promotion sélectionnée
    };

    const handlePromotionSelectForApprenti = (idApprenti, selectedPromotionId) => {
        setSelectedPromotionForApprenti((prev) => ({ ...prev, [idApprenti]: selectedPromotionId }));
    };

    return (
        <FormTemplate title="Apprentis">
            <Select
                id="promotionApprenti"
                clearable
                w="max-content"
                label="Promotions"
                value={selectedPromotion}
                onChange={handlePromotionChange}
                data={promotions}
            />

            <Table striped bordered hover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Nom</Table.Th>
                        <Table.Th>Prénom</Table.Th>
                        <Table.Th>Promotion</Table.Th>
                        <Table.Th>Sélectionner Promotion</Table.Th>
                        <Table.Th>Action</Table.Th>
                    </Table.Tr>
                </Table.Thead>

                <Table.Tbody>
                    {
                        apprentis.length ?
                            apprentis.map((apprenti) => (
                                <Table.Tr key={apprenti.id}>
                                    <Table.Td>{apprenti.utilisateur.nom}</Table.Td>
                                    <Table.Td>{apprenti.utilisateur.prenom}</Table.Td>
                                    <Table.Td>{apprenti.promotion?.libelle}</Table.Td>
                                    <Table.Td>
                                        <Select
                                            data={promotions}
                                            onChange={(e) => handlePromotionSelectForApprenti(apprenti.id, e.value)}
                                        />
                                    </Table.Td>
                                    <Table.Td>
                                        <Button onClick={() => handleUpdateApprenti(apprenti.id)}>
                                            Mettre à jour
                                        </Button>
                                    </Table.Td>
                                </Table.Tr>
                            ))
                            :
                            <Table.Tr>
                                <Table.Td style={{ textAlign: "center" }} colSpan={5}>
                                    Aucun apprenti
                                </Table.Td>
                            </Table.Tr>
                    }
                </Table.Tbody>
            </Table>
        </FormTemplate>
    );
};

export default ListApprenti;

import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { request } from '../../../utils/request.js';
import FormTemplate from '../../../components/FormTemplate.jsx';
import { putApprenti} from '../../../utils/api.js';

// ... (your imports and other code)

const ListApprenti = () => {
    const [promotions, setPromotions] = useState([]);
    const [apprentis, setApprentis] = useState([]);
    const [selectedPromotion, setSelectedPromotion] = useState('');
    const [defaultSelectionApplied, setDefaultSelectionApplied] = useState(false);
    const [selectedPromotionForApprenti, setSelectedPromotionForApprenti] = useState({});
    const [firstPromotionId, setFirstPromotionId] = useState('');

    const handlePromotionChange = (e) => {
        setSelectedPromotion(e.target.value);
        setDefaultSelectionApplied(true);
    };

    useEffect(() => {
        request("/promotion/")
            .then((res) => {
                setPromotions(res.data);
                if (res.data.length > 0 && !defaultSelectionApplied) {
                    setFirstPromotionId(res.data[0].id);
                }
            });

        // Vérifiez si une promotion est sélectionnée
        if (selectedPromotion || selectedPromotion === '') {
            const apiUrl = selectedPromotion ? `/apprentipromotion/?promotion=${selectedPromotion}` : '/apprentidetail/';

            // Effectuez la requête pour obtenir les apprentis
            request(apiUrl)
                .then((res) => {
                    setApprentis(res.data);
                })
                .catch((error) => {
                    console.error("Erreur lors de la récupération des apprentis :", error.message);
                });
        }
    }, [selectedPromotion, defaultSelectionApplied]);

    const handleUpdateApprenti = (idApprenti) => {
        const selectedPromotionId = selectedPromotionForApprenti[idApprenti] || firstPromotionId;


        request(`/apprenti/${idApprenti}`)
            .then((jsonApprenti) => {
                
                const updateApprenti = {
                    "promotion":selectedPromotionId,
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
        <FormTemplate title="Afficher les apprentis d'une promotion">
            <Form.Group className="mb-3">
                <Form.Label>Promotions:</Form.Label>
                <Form.Select id="promotionApprenti" name="promotionApprenti" value={selectedPromotion} onChange={handlePromotionChange}>
                    {/* Ajout de l'option par défaut */}
                    <option value="" key="defaultOption">Tous les apprentis</option>

                    {/* Boucle pour mapper les promotions */}
                    {promotions.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.libelle} {item.semestre}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            {apprentis.length > 0 && (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Promotion</th>
                            <th>Sélectionner Promotion</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {apprentis.map((apprenti) => (
                            <tr key={apprenti.id}>
                                <td>{apprenti.utilisateur.nom}</td>
                                <td>{apprenti.utilisateur.prenom}</td>
                                <td>{apprenti.promotion.libelle}</td>
                                <td>
                                    <Form.Select onChange={(e) => handlePromotionSelectForApprenti(apprenti.id, e.target.value)}>
                                        {promotions.map((promotion) => (
                                            <option key={promotion.id} value={promotion.id}>
                                                {promotion.libelle} {promotion.semestre}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </td>
                                <td>
                                    <Button variant="primary" onClick={() => handleUpdateApprenti(apprenti.id)}>
                                        Mettre à jour
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </FormTemplate>
    );
};

export default ListApprenti;

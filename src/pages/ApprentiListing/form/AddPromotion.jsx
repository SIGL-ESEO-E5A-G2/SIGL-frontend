import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { request } from '../../../utils/request.js';
import { addNewPromotion, setPromotion } from '../../../utils/api.js';
import { semestersList } from '../../../data/constantes.js';

const AddPromotion = () => {
  const [newPromotionName, setNewPromotionName] = useState("");
  const [selectedSemester, setSelectedSemester] = useState(""); 
  const [promotions, setPromotions] = useState([]);
  const [modifiedSemesters, setModifiedSemesters] = useState({});
  const [newLibelles, setNewLibelles] = useState({});

  useEffect(() => {
    // Effectuer la requête pour obtenir les promotions
    request("/promotion/")
      .then((res) => {
        setPromotions(res.data);
        if (res.data.length > 0) {
          setSelectedSemester(res.data[0].semestre);
          setModifiedSemesters((prev) => ({ ...prev, [res.data[0].id]: res.data[0].semestre }));
        }
      });
  }, []);

  const handleAddPromotion = async () => {
    addNewPromotion(newPromotionName, selectedSemester);
  };

  const handleDeletePromotion = (id) => {
    // Effectuer la requête pour supprimer la promotion avec l'id spécifié
    request("/promotion/"+id, "delete")
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de la promotion :", error.message);
      });
  };

  const handleModifyPromotion = (promotionId) => {
    const modifiedSemester = modifiedSemesters[promotionId];
    const newLibelle = newLibelles[promotionId] || promotions.find(promo => promo.id === promotionId)?.libelle || "";
    
    setPromotion(promotionId, newLibelle, modifiedSemester);
  };

  const handleSemesterChange = (promotionId, selectedSemester) => {
    setModifiedSemesters((prev) => ({ ...prev, [promotionId]: selectedSemester }));
  };  

  const handleLibelleChange = (promotionId, input) => {
    setNewLibelles((prev) => ({ ...prev, [promotionId]: input }));
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nom de la promotion</th>
            <th>Semestre</th>
            <th>Modifier Semestre</th>
            <th>Nouveau Libellé</th>
            <th>Valider</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {promotions.map((promotion) => (
            <tr key={promotion.id}>
              <td>{promotion.libelle}</td>
              <td>{promotion.semestre}</td>
              <td>
              <Form.Select onChange={(e) => handleSemesterChange(promotion.id, e.target.value)}>
                {semestersList.map((semester) => (
                  <option key={semester} value={semester}>
                    {semester}
                  </option>
                ))}
              </Form.Select>
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={newLibelles[promotion.id] || ""}
                  onChange={(e) => handleLibelleChange(promotion.id, e.target.value)}
                />
              </td>
              <td>
                <Button variant="primary" onClick={() => handleModifyPromotion(promotion.id)}>
                  Valider
                </Button>
              </td>
              <td>
                <Button variant="danger" onClick={() => handleDeletePromotion(promotion.id)}>
                  Supprimer la promotion
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Ajout du champ d'entrée et du bouton */}
      <Form.Group className="mb-3">
        <Form.Label>Nouvelle Promotion:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Saisissez le nom de la nouvelle promotion"
          value={newPromotionName}
          onChange={(e) => setNewPromotionName(e.target.value)}
        />
      </Form.Group>

      {/* Ajout du champ de sélection des semestres */}
      <Form.Group className="mb-3">
        <Form.Label>Semestre:</Form.Label>
        <Form.Select
          id="promotionSemester"
          name="promotionSemester"
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
        >
          {semestersList.map((semester) => (
            <option key={semester} value={semester}>
              {semester}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Button variant="primary" onClick={handleAddPromotion}>
        Valider la nouvelle promotion
      </Button>
    </div>
  );
};

export default AddPromotion;

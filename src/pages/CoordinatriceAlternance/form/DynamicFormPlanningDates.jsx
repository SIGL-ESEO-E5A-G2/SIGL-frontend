import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { request } from '../../../utils/request.js';

const DynamicFormPlanningDates = () => {
  const [role, setRole] = useState('');
  const [dates, setDates] = useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState('');
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    request("/promotion/")
      .then((res) => {
        setPromotions(res.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des promotions :", error.message);
      });
  }, []);

  const handleRoleChange = (event) => {
    const role = event.target.value;
    setRole(role);
    setDates([]);
  };

  const handleDateChange = (index, dateType, event) => {
    const updatedDates = [...dates];
    const dateToUpdate = { ...updatedDates[index] };
    dateToUpdate[dateType] = event.target.value;
    updatedDates[index] = dateToUpdate;
    setDates(updatedDates);
  };

  const handleAddDate = () => {
    if (role === 'echeance') {
      setDates([...dates, { date: '' }]);
    } else {
      setDates([...dates, { debut: '', fin: '' }]);
    }
  };

  const handlePromotionChange = (event) => {
    setSelectedPromotion(event.target.value);
  };

  const handleSubmit = () => {
    // Logique de soumission ici
    // Vous pouvez accéder à role, dates et selectedPromotion directement
  };

  return (
    <div>
      <h2 className="text-center mt-3">Formulaire d'utilisateur</h2>
      <form className="m-5" method="post" onSubmit={handleSubmit}>
        <select
          className="form-select mb-lg-5" id="role" name="role" value={role} onChange={handleRoleChange}
        >
          <option value="" disabled>Sélectionnez un rôle</option>
          <option value="echeance">Échéance</option>
          <option value="periode">Période</option>
        </select>

        {role === 'echeance' && (
          <div className="form-group">
            <label htmlFor="dates">Échéance(s) :</label>
            {dates.map((date, index) => (
              <div key={index} className="mb-3">
                <label htmlFor={`date_${index}`}>Échéance {index + 1} :</label>
                <input
                  type="date"
                  name={`date_${index}`}
                  id={`date_${index}`}
                  value={date.date}
                  onChange={(event) => handleDateChange(index, 'date', event)}
                />
              </div>
            ))}
          </div>
        )}

        {role === 'periode' && (
          <div className="form-group">
            <label htmlFor="dates">Période(s) :</label>
            {dates.map((date, index) => (
              <div key={index} className="mb-3">
                <label htmlFor={`date_${index}_debut`}>Période {index + 1} (début) :</label>
                <input
                  type="date"
                  name={`date_${index}_debut`}
                  id={`date_${index}_debut`}
                  value={date.debut}
                  onChange={(event) => handleDateChange(index, 'debut', event)}
                />
                <label htmlFor={`date_${index}_fin`}>Période {index + 1} (fin) :</label>
                <input
                  type="date"
                  name={`date_${index}_fin`}
                  id={`date_${index}_fin`}
                  value={date.fin}
                  onChange={(event) => handleDateChange(index, 'fin', event)}
                />
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          className="btn btn-primary btn-lg btn-block"
          onClick={handleAddDate}
        >
          Ajouter une date/période
        </button>

        {/* Intégration du sélecteur de promotions */}
        <Form.Group className="mb-3">
          <Form.Label>Promotions :</Form.Label>
          <Form.Select id="promotion" name="promotion" value={selectedPromotion} onChange={handlePromotionChange}>
            <option value="" disabled>Sélectionnez une promotion</option>
            {promotions.map((promotion) => (
              <option key={promotion.id} value={promotion.id}>
                {promotion.libelle} {promotion.semestre}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <button
          type="button"
          className="btn btn-primary btn-lg btn-block"
          onClick={handleSubmit}
        >
          Valider la sélection
        </button>
      </form>
    </div>
  );
};

export default DynamicFormPlanningDates;

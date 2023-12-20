import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { request } from '../../../utils/request.js';
import { getApprentiFromPromo, postMessage } from '../../../utils/api.js';

const DynamicFormPlanningDates = ({ user }) => {
  const [selectedFormat, setSelectedFormat] = useState('');
  const [dates, setDates] = useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState('');
  const [promotions, setPromotions] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    request("/promotion/")
      .then((res) => {
        setPromotions(res.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des promotions :", error.message);
      });

    request("/tag/")
      .then((res) => {
        setTags(res.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des tags :", error.message);
      });
  }, []);

  const handleFormatChange = (event) => {
    const selectedFormat = event.target.value;
    setSelectedFormat(selectedFormat);
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
    if (selectedFormat === 'echeance') {
      setDates([...dates, { date: '', titre: '', tags: [selectedTag] }]);
    } else {
      setDates([...dates, { debut: '', fin: '', titre: '', tags: [selectedTag] }]);
    }
  };
  

  const handlePromotionChange = (event) => {
    setSelectedPromotion(event.target.value);
  };

  const handleTagChange = (event) => {
    setSelectedTag(event.target.value);
  };

  const handleSubmit = () => {
    console.log('selectedFormat:', selectedFormat);
    console.log('Dates:', dates);
    console.log('Selected Promotion:', selectedPromotion);
    
    getApprentiFromPromo(selectedPromotion)
      .then((apprentis) => {
        const apprentisID = apprentis.map((apprenti) => apprenti.id);

        dates.forEach(dateElement => {
          const tag = [];
          tag.push(dateElement.tags);
          if(selectedFormat == 'echeance'){
            var content = "Jusqu'au "+dateElement.date;
            postMessage(dateElement.titre, content, apprentisID, tag, user.id);
          }else{
            var content = "Du "+dateElement.debut +" au "+dateElement.fin;
            postMessage(dateElement.titre, content, apprentisID, tag, user.id);
          }
          
        });
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des apprentis :", error.message);
      });
  };

  return (
    <div>
      <h2 className="text-center mt-3">Formulaire d'utilisateur</h2>
      <Form className="m-5">
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
        <Form.Select
          className="form-select mb-lg-5" id="selectedFormat" name="selectedFormat" value={selectedFormat} onChange={handleFormatChange}
        >
          <option value="" disabled>Sélectionnez un format</option>
          <option value="echeance">Échéance</option>
          <option value="periode">Période</option>
        </Form.Select>

        {selectedFormat === 'echeance' && (
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
                <label htmlFor={`titre_${index}`}>Titre :</label>
                <input
                  type="text"
                  name={`titre_${index}`}
                  id={`titre_${index}`}
                  value={date.titre}
                  onChange={(event) => handleDateChange(index, 'titre', event)}
                />
                <label htmlFor={`tag_${index}`}>Tag :</label>
                <Form.Select
                  id={`tag_${index}`}
                  name={`tag_${index}`}
                  value={date.tags[0]} // Assuming only one tag is selected for simplicity
                  onChange={(event) => handleDateChange(index, 'tags', event)}
                >
                  <option value="" disabled>Sélectionnez un tag</option>
                  {tags.map((tag) => (
                    <option key={tag.id} value={tag.id}>
                      {tag.libelle}
                    </option>
                  ))}
                </Form.Select>
              </div>
            ))}
          </div>
        )}

        {selectedFormat === 'periode' && (
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
                <label htmlFor={`titre_${index}`}>Titre :</label>
                <input
                  type="text"
                  name={`titre_${index}`}
                  id={`titre_${index}`}
                  value={date.titre}
                  onChange={(event) => handleDateChange(index, 'titre', event)}
                />
                <label htmlFor={`tag_${index}`}>Tag :</label>
                <Form.Select
                  id={`tag_${index}`}
                  name={`tag_${index}`}
                  value={date.tags[0]} // Assuming only one tag is selected for simplicity
                  onChange={(event) => handleDateChange(index, 'tags', event)}
                >
                  <option value="" disabled>Sélectionnez un tag</option>
                  {tags.map((tag) => (
                    <option key={tag.id} value={tag.id}>
                      {tag.libelle}
                    </option>
                  ))}
                </Form.Select>
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

        <button
          type="button"
          className="btn btn-primary btn-lg btn-block"
          onClick={handleSubmit}
        >
          Valider la sélection
        </button>
      </Form>
    </div>
  );
};

export default DynamicFormPlanningDates;

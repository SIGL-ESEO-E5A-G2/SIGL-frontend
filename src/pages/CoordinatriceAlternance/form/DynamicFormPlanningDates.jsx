import React, { useState, useEffect } from 'react';

import { request } from '../../../utils/request.js';
import { getApprentiFromPromo, postMessage } from '../../../utils/api.js';
import { Button, Group, Select, Stack, TextInput } from '@mantine/core';

const DynamicFormPlanningDates = ({ user }) => {
  const [selectedFormat, setSelectedFormat] = useState();
  const [dates, setDates] = useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState('');
  const [promotions, setPromotions] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    request("/promotion/")
      .then((res) => {
        const data = (res.data || [])?.map(row => ({
          value: row.id + "",
          label: `${row.libelle} (${row.semestre})`
        }));

        setPromotions(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des promotions :", error.message);
      });

    request("/tag/")
      .then((res) => {
        setTags(res.data.map(row => ({
          ...row,
          value: row.id + "",
          label: row.libelle
        })));
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des tags :", error.message);
      });
  }, []);

  const handleFormatChange = (selectedFormat) => {
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

  const handleRemoveDate = (index) => {
    const updatedDates = [...dates];
    updatedDates.splice(index, 1);
    setDates(updatedDates);
  };

  const handlePromotionChange = (event) => {
    setSelectedPromotion(event);
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
          if (selectedFormat == 'echeance') {
            var content = "Jusqu'au " + dateElement.date;
            postMessage(dateElement.titre, content, apprentisID, tag, user.id);
          } else {
            var content = "Du " + dateElement.debut + " au " + dateElement.fin;
            postMessage(dateElement.titre, content, apprentisID, tag, user.id);
          }

        });
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des apprentis :", error.message);
      });
  };

  const nomFormat = selectedFormat === "periode" ? "Période" : "Échéance";

  return (
    <div>
      <h2 className="text-center mt-3">Saisie des échéances par promotion</h2>
      <form className="m-5">
        <Group>
          <Select
            id="promotionApprenti"
            w="max-content"
            label="Sélectionnez une promotion"
            value={selectedPromotion}
            onChange={handlePromotionChange}
            data={promotions}
          />

          <Select
            id="promotionApprenti"
            w="max-content"
            label="Sélectionnez un format"
            value={selectedFormat}
            onChange={handleFormatChange}
            data={[
              { value: "echeance", label: "Échéance" },
              { value: "periode", label: "Période" }
            ]}
          />
        </Group>

        <div className="form-group">
          <label htmlFor="dates">{nomFormat}(s) :</label>
          {
            dates.map((date, index) => (
              <Group key={index} className="mb-3">
                {/* TODO handle date input */}
                <label htmlFor={`date_${index}`}>{nomFormat} {index + 1} {selectedFormat === "periode" && '(debut)'}</label>
                <input
                  type="date"
                  name={`date_${index}`}
                  id={`date_${index}`}
                  value={selectedFormat === "periode" ? date.debut : date.date}
                  onChange={(event) => handleDateChange(index, selectedFormat === "periode" ? "debut" : 'date', event)}
                />

                {
                  selectedFormat === "periode" && <div>
                    {/* TODO handle date input */}
                    <label htmlFor={`date_${index}_fin`}>Période {index + 1} (fin) :</label>
                    <input
                      type="date"
                      name={`date_${index}_fin`}
                      id={`date_${index}_fin`}
                      value={date.fin}
                      onChange={(event) => handleDateChange(index, 'fin', event)}
                    />
                  </div>
                }

                <TextInput
                  label="Titre"
                  id={`titre_${index}`}
                  value={date.titre}
                  onChange={(event) => handleDateChange(index, 'titre', event)}
                />

                <Select
                  label="Tag"
                  data={tags}
                  value={date.tags[0]} // Assuming only one tag is selected for simplicity
                  onChange={(event) => handleDateChange(index, 'tags', { target: { value: event } })}
                />

                <Button
                  type="button"
                  onClick={() => handleRemoveDate(index)}
                  variant="outline"
                  color="red"
                >
                  Supprimer l'élément
                </Button>
              </Group>
            ))
          }
        </div>

        <Group>
          {
            selectedFormat && <Button
              type="button"
              onClick={handleAddDate}
            >
              Ajouter une date/période
            </Button>
          }

          <Button
            type="button"
            onClick={handleSubmit}
          >
            Valider la sélection
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default DynamicFormPlanningDates;

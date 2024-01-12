import React, { useState, useEffect } from 'react';
import { Button, Select } from '@mantine/core';
import FormTemplate from '../../../components/FormTemplate';
import { request } from '../../../utils/request.js';

function userToLabel(data = []) {
  return data.map(row => ({
    ...row,
    value: row.id + "",
    label: `${row.utilisateur?.prenom} ${row.utilisateur?.nom}`
  }));
}

const TeamAssociatonForm = () => {
  const [apprentis, setApprentis] = useState([]);
  const [maitresApprentissage, setMaitresApprentissage] = useState([]);
  const [tuteurs, setTuteurs] = useState([]);
  const [apprentiId, setApprentiId] = useState(null);
  const [maId, setMaId] = useState(null);
  const [tuteurId, setTuteurId] = useState(null);

  useEffect(() => {
    // load apprentis
    request("/apprentidetail/")
      .then(({ data }) => setApprentis(userToLabel(data)));

    // load MA
    request("/maitrealternancedetail/")
      .then(({ data }) => setMaitresApprentissage(userToLabel(data)));

    //load tuteur
    request("/tuteurpedagogiquedetail/")
      .then(({ data }) => setTuteurs(userToLabel(data)));
  }, []);

  const handleAssocierClick = () => {
    const selectedApprentiId = parseInt(apprentiId, 10);
    const selectedMaId = parseInt(maId, 10);
    const selectedTuteurId = parseInt(tuteurId, 10);
    request("/apprenti/" + apprentiId + "/")
      .then((response) => {

        const data = {
          "optionMineure": response.data.optionMineure,
          "optionMajeure": response.data.optionMajeure,
          "utilisateur": response.data.utilisateur,
          "maitreAlternance": maId,
          "tuteurPedagogique": tuteurId,
        };

        return request("/apprenti/" + apprentiId + "/", "put", data);
      })
      .catch((error) => {
        // Handle errors for both GET and PUT requests
        if (error.response) {
          // The request was made, but the server responded with an error code
          console.error("Server error response:", error.response.data);
        } else if (error.request) {
          // The request was made, but no response was received
          console.error("No response received from the server:", error.request);
        } else {
          // An error occurred while setting up the request
          console.error("Request setup error:", error.message);
        }
      });
    };

    return (
      <FormTemplate title="Associer un apprenti à une équipe tutorale">
        <Select
          id="associerApprenti"
          label="Apprenti"
          data={apprentis}
          value={apprentiId}
          onChange={(event) => setApprentiId(event)}
        />
  
        <Select
          id="associerMA"
          label="Maitre d'apprentissage"
          data={maitresApprentissage}
          value={maId}
          onChange={(event) => setMaId(event)}
        />
  
        <Select
          id="associerTuteur"
          label="Tuteur"
          data={tuteurs}
          value={tuteurId}
          onChange={(event) => setTuteurId(event)}
        />
  
        <Button type="button" onClick={handleAssocierClick}>
          Associer
        </Button>
      </FormTemplate>
    );
  };
  
  export default TeamAssociatonForm;
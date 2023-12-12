import { request } from './request';

export const addNewPromotion = async (newPromotionName, selectedSemester) => {
  try {
    const newPromotion = {
      libelle: newPromotionName,
      semestre: selectedSemester,
    };

    request("/promotion/", "post", newPromotion);
    window.location.reload();
  } catch (error) {
    console.error("Erreur lors de l'ajout de la promotion :", error.message);
    throw error;
  }
};

export const setPromotion = async (promotionId, newLibelle, modifiedSemester) => {
    try {
        const modifiedPromotion = {
            libelle: newLibelle,
            semestre: modifiedSemester,
            };

        request("/promotion/"+promotionId+"/", "put", modifiedPromotion);
        window.location.reload();
    } catch (error) {
      console.error("Erreur lors de l'ajout de la promotion :", error.message);
      throw error;
    }
};

export const putApprenti = async (idApprenti, jsonApprenti, newApprentiAttributes, method) => {
  try {
      const updateApprenti = {
          "optionMineure": newApprentiAttributes.optionMineure || jsonApprenti.optionMineure,
          "optionMajeure": newApprentiAttributes.optionMajeure || jsonApprenti.optionMajeure,
          "intitulePoste": newApprentiAttributes.intitulePoste || jsonApprenti.intitulePoste,
          "descriptifPoste": newApprentiAttributes.descriptifPoste || jsonApprenti.descriptifPoste,
          "classificationConventionCollective": newApprentiAttributes.classificationConventionCollective || jsonApprenti.classificationConventionCollective,
          "dureeHebdoContrat": newApprentiAttributes.dureeHebdoContrat || jsonApprenti.dureeHebdoContrat,
          "utilisateur": newApprentiAttributes.utilisateur || jsonApprenti.utilisateur,
          "maitreAlternance": newApprentiAttributes.maitreAlternance || jsonApprenti.maitreAlternance,
          "tuteurPedagogique": newApprentiAttributes.tuteurPedagogique || jsonApprenti.tuteurPedagogique,
          "promotion": newApprentiAttributes.promotion || jsonApprenti.promotion,
          "entreprise": newApprentiAttributes.entreprise || jsonApprenti.entreprise,
          "opco": newApprentiAttributes.opco || jsonApprenti.opco,
          "grilleEvaluation": newApprentiAttributes.grilleEvaluation || jsonApprenti.grilleEvaluation
        };
      request("/apprenti/"+idApprenti+"/", "put", updateApprenti);
      window.location.reload();
  } catch (error) {
    console.error("Erreur lors de l'ajout de la promotion :", error.message);
    throw error;
  }
};

  export const postApprenti = async (nom,prenom) => {
    try {
      const apprenti = {
        "roles": [1],
        "password": "autogenerate",
        "last_login": "2023-11-20T13:01:16.160Z",
        "is_superuser": true,
        "nom": nom,
        "prenom":prenom,
        "email": prenom+"."+nom+"@reseau.eseo.fr" ,
        "is_active": true,
        "is_staff": false,
        "groups": [],
        "user_permissions": [],
    };
        request("/apprenti/"+idApprenti+"/", "post", apprenti).then((res) => {
          const apprentiData = {
            "optionMineure": "N/A",
            "optionMajeure": "N/A",
            "utilisateur": res.data.id,
            "maitreAlternance": 1,
            "tuteurPedagogique": 1,
          };
          request("/apprenti/", "post", apprentiData);
      })
        window.location.reload();
    } catch (error) {
      console.error("Erreur lors de la création de l'apprenti :", error.message);
      throw error;
    }
  };
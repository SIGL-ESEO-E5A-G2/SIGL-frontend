import { request } from './request';

/**
 * Ajtoue une nouvelle promotion
 * 
 * @param {string} newPromotionName 
 * @param {int} selectedSemester 
 */
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

/**
 * Modifie une promotion existante
 * 
 * @param {int} promotionId 
 * @param {string} newLibelle 
 * @param {string} modifiedSemester 
 */
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

/**
 * Modifie un apprenti existant
 * 
 * @param {int} idApprenti 
 * @param {json} jsonApprenti 
 * @param {json} newApprentiAttributes 
 */
export const putApprenti = async (idApprenti, jsonApprenti, newApprentiAttributes) => {
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

/**
 * Créer un apprenti
 * 
 * @param {string} nom 
 * @param {string} prenom 
 */
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

/**
 * Modifie un apprenti existant
 * 
 * @param {int} idUtilisateur 
 * @param {json} jsonUtilisateur 
 * @param {json} newUsersAttributes 
 */
export const putUtilisateur = async (idUtilisateur, jsonUtilisateur, newUsersAttributes) => {
  try {
      const updateUser = {
        password: newUsersAttributes.password || jsonUtilisateur.password,
        last_login: newUsersAttributes.last_login || jsonUtilisateur.last_login,
        is_superuser: newUsersAttributes.is_superuser || jsonUtilisateur.is_superuser,
        nom: newUsersAttributes.nom || jsonUtilisateur.nom,
        prenom: newUsersAttributes.prenom || jsonUtilisateur.prenom,
        telephone: newUsersAttributes.telephone || jsonUtilisateur.telephone,
        email: newUsersAttributes.email || jsonUtilisateur.email,
        is_active: newUsersAttributes.is_active || jsonUtilisateur.is_active,
        is_staff: newUsersAttributes.is_staff || jsonUtilisateur.is_staff,
        groups: newUsersAttributes.groups || jsonUtilisateur.groups,
        user_permissions: newUsersAttributes.user_permissions || jsonUtilisateur.user_permissions,
        roles: newUsersAttributes.roles || jsonUtilisateur.roles,
      };
      console.log(updateUser);
      request("/utilisateur/"+idUtilisateur+"/", "put", updateUser);
      //window.location.reload();
  } catch (error) {
    console.error("Erreur lors de l'ajout de la promotion :", error.message);
    throw error;
  }
};
import { request } from './request';
import { getCurrentTime, getCurrentDate } from './formatDate';
import { generatePassword } from './encryption';
import { userHasRole } from './userRights';

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

    request("/promotion/" + promotionId + "/", "put", modifiedPromotion);
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
      "grilleEvaluation": newApprentiAttributes.grilleEvaluation || jsonApprenti.grilleEvaluation,
      "ResponsableFinance": newApprentiAttributes.ResponsableFinance || jsonApprenti.ResponseResponsableFinance,
      "ResponsableAdministration": newApprentiAttributes.ResponsableAdministration || jsonApprenti.ResponseResponsableAdmin,

    };
    request("/apprenti/" + idApprenti + "/", "put", updateApprenti);
    window.location.reload();
  } catch (error) {
    console.error("Erreur lors de l'ajout de la promotion :", error.message);
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
    request("/utilisateur/" + idUtilisateur + "/", "put", updateUser);
  } catch (error) {
    console.error("Erreur lors de l'ajout de la promotion :", error.message);
    throw error;
  }
};

/**
 * Ajoute un message
 * 
 * @param {string} title 
 * @param {string} jsonUtilisateur 
 * @param {[int]} recipient 
 * @param {[int]} idTags 
 * @param {int} idSender 
 */
export const postMessage = async (title, message, recipient, idTags, idSender) => {
  try {
    const messageObj = {
      titre: title,
      contenu: message,
      date: getCurrentDate(),
      time: getCurrentTime(),
      createur: idSender,
      destinataire: recipient,
      tags: idTags
    };
    request("/message/", "post", messageObj);
    window.location.reload();
  } catch (error) {
    console.error("Erreur lors de l'ajout de la promotion :", error.message);
    throw error;
  }
};


/**
 * Récupère les apprentis d'une promo
 * 
 * @param {int} idPromo 
 * @returns {Promise} Une promesse qui se résout avec les données des apprentis
 */
export const getApprentiFromPromo = async (idPromo) => {
  try {
    const response = await request("/apprentipromotion/?promotion=" + idPromo);
    return response.data || [];
  } catch (error) {
    console.error("Erreur lors de l'ajout de la promotion :", error.message);
    throw error;
  }
};

/**
 * Ajoute un tag
 * 
 * @param {String} libelle
 * @param {String} color
 * @param {String} type
 */
export const addTag = async (libelle, color, type) => {
  try {
    const newTag = {
      libelle: libelle,
      couleur: color,
      type: type
    };
    request("/tag/", "post", newTag);
    window.location.reload();
  } catch (error) {
    console.error("Erreur lors de l'ajout du tag :", error.message);
    throw error;
  }
};

/**
 * Ajoute un opco
 * 
 * @param {json} companyData
 * @returns {Promise} La promesse résultante de la requête POST
 */
export const postCompany = async (companyData) => {
  return request("/entreprise/", "post", companyData)
  .then((response) => {
    return response.data
  })
  .catch((error)=>{
    console.error("Erreur lors de l'ajout de l'opco :", error.message);
    throw error;
  });
};

/**
 * Ajoute un opco
 * 
 * @param {json} opcoData
 * @returns {Promise} La promesse résultante de la requête POST
 */
export const postOpco = async (opcoData) => {
  return request("/opco/", "post", opcoData)
  .then((response) => {
    return response.data
  })
  .catch((error)=>{
    console.error("Erreur lors de l'ajout de l'opco :", error.message);
    throw error;
  });
};

/**
 * Ajoute un representant d'entreprise
 * 
 * @param {json} representantData
 */
export const postRepresentantEntreprise = async (representantData) => {
  return request("/responsableentreprise/", "post", representantData)
  .then((response) => {
    return response.data
  })
  .catch((error)=>{
    console.error("Erreur lors de l'ajout de l'opco :", error.message);
    throw error;
  });
};

/**
 * Ajoute un representant d'entreprise
 * 
 * @param {json} maitreAlternanceData
 */
export const postMaitreAlternance = async (maitreAlternanceData) => {
  return request("/maitrealternance/", "post", maitreAlternanceData)
  .then((response) => {
    return response.data
  })
  .catch((error)=>{
    console.error("Erreur lors de l'ajout de l'opco :", error.message);
    throw error;
  });
};

/**
 * Ajoute un representant d'entreprise
 * 
 * @param {json} apprentiData
 */
export const postApprenti = async (apprentiData) => {
  return request("/apprenti/", "post", apprentiData)
  .then((response) => {
    return response.data
  })
  .catch((error)=>{
    console.error("Erreur lors de l'ajout de l'opco :", error.message);
    throw error;
  });
};

/**
 * Ajoute un representant des finances de l'entreprise
 * 
 * @param {json} financeData
 */
export const postResponsableFinance= async (financeData) => {
  return request("/responsablefinance/", "post", financeData)
  .then((response) => {
    return response.data
  })
  .catch((error)=>{
    console.error("Erreur lors de l'ajout de l'opco :", error.message);
    throw error;
  });
};

/**
 * Ajoute un representant du suivi administratif
 * 
 * @param {json} adminData
 */
export const postResponsableAdmin= async (adminData) => {
  return request("/responsableadministration/", "post", adminData)
  .then((response) => {
    return response.data
  })
  .catch((error)=>{
    console.error("Erreur lors de l'ajout de l'opco :", error.message);
    throw error;
  });
};

/**
 * Ajoute un utilisateur
 * 
 * @param {json} userData
 */
export const postUtilisateur = async (userData) => {

    return generatePassword()
    .then((res) => {
      const newUser ={
        "password": res,
        "last_login": "2024-01-21T09:42:25.602Z",
        "is_superuser": false,
        "nom": userData.nom,
        "prenom": userData.prenom,
        "telephone": userData.telephone,
        "email": userData.email,
        "is_active": true,
        "is_staff": true,
        "groups": [
          0
        ],
        "user_permissions": [
          0
        ],
        "roles": userData.roles
      }
  
      return request("/utilisateur/", "post", newUser)
      .then((response) => {
        return response.data
      })
      .catch((error)=>{
        console.error("Erreur lors de l'ajout de l'opco :", error.message);
        throw error;
      });
    })
    .catch((error)=>{
      console.error("Erreur lors de l'ajout de l'opco :", error.message);
      throw error;
    });
};



export async function getApprentis(user) {
  const isApprenti = userHasRole(user, [1]);
  const isTuteur = userHasRole(user, [2]);
  const isMA = userHasRole(user, [5]);

  if (isApprenti) {
    return request(`/apprentiutilisateurdetail?utilisateur=${user.id}`)
      .then((res) => res.data ? [res.data[0]] : []);
  }
  else if (isMA) {
    return request(`/maitrealternanceutilisateurdetail?utilisateur=${user.id}`, "get")
      .then(res => res.data?.length > 0 && res.data[0].apprentis?.length > 0 ? [res.data[0].apprentis[0]] : [])
  }
  else if (isTuteur) {
    return request(`/tuteurpedagogiqueutilisateurdetail?utilisateur=${user.id}`, "get")
      .then(res => res.data?.length > 0 ? res.data[0].apprentis : []);
  }
}
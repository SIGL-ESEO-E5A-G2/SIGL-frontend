import React, { useState } from 'react';
import { request } from '../../../utils/request.js';

const ApprenticeshipForm = () => {
  const [formData, setFormData] = useState({
    apprenticeLastName: '',
    apprenticeFirstName: '',
    apprenticePostName: '',
    positionDescription: '',
    conventionCoef: '',
    workHours: '',
    socialName: '',
    siretNum: '',
    membersNum: '',
    cpne: '',
    idcc: '',
    collectiveConvention: '',
    nafCode: '',
    activitySector: '',
    principalPhoneNumber: '',
    principalMail: '',
    companyAddress: '',
    formationPlaceSocialReason: '',
    formationPlaceSiret: '',
    formationPlaceAddress: '',
    opcoName: '',
    opcoSiret: '',
    opcoAddress: '',
    opcoPhoneNumber: '',
    opcoEmail: '',
    companyRepresentativeLastName: '',
    companyRepresentativeFirstName: '',
    companyRepresentativeFunction: '',
    companyRepresentativePhoneNumber: '',
    companyRepresentativeIsAlumni:'',
    masterLastName: '',
    masterFirstName: '',
    masterPhoneNumber: '',
    masterEmail: '',
    masterFunction: '',
    masterLastDiploma: '',
    billingContactLastName: '',
    billingContactFirstName: '',
    billingContactPhone: '',
    billingContactEmail: '',
    isBillingContactEseoAlumnus: '',
    adminContactLastName: '',
    adminContactFirstName: '',
    adminContactPhone: '',
    adminContactEmail: '',
    isAdminContactEseoAlumnus: '',
    hasInternationalExperience: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const apprenti = {
      "roles": [1],
      "password": "autogenerate",
      "last_login": "2023-11-20T13:01:16.160Z",
      "is_superuser": true,
      "nom": formData.apprenticeLastName,
      "prenom": formData.apprenticeFirstName,
      "email": formData.apprenticeFirstName+"."+formData.apprenticeLastName+"@reseau.eseo.fr" , // replace "user@example.com" with the actual value for "email"
      "is_active": true,
      "is_staff": false,
      "groups": [],
      "user_permissions": [],
  };

  const master = {
  "roles": [2],
  "password": "autogenerate",
  "last_login": "2023-11-20T13:01:16.160Z",
  "is_superuser": true,
  "nom": formData.masterLastName,
  "prenom": formData.masterFirstName,
  "email": formData.masterEmail, // replace "user@example.com" with the actual value for "email"
  "is_active": true,
  "is_staff": true,
  "groups": [],
  "user_permissions": [],
  }



  console.log(JSON.stringify(apprenti));
  
  request("/utilisateur/", "post", apprenti)
      .then((res) => {
          const apprentiData = {
            "optionMineure": "N/A",
            "optionMajeure": "N/A",
            "utilisateur": res.data.id,
            "maitreAlternance": 1,
            "tuteurPedagogique": 1,
          };
          request("/apprenti/", "post", apprentiData)
          .then((res) => {
          })
          .catch((error) => {
              console.error("Erreur de configuration de la requête :", error.message);
          });
      })
      .catch((error) => {
          console.error("Erreur de configuration de la requête :", error.message);
      });
  };

  return (
    <form className=""onSubmit={handleSubmit}>
      <section>
        <h1>APPRENTI(E)</h1>
        <div className="mb-3 d-flex flex-column">
          <label className="form-label">APPRENTI(E) ESEO (NOM)*</label>
          <small>Indiquez le nom de famille de l'apprenti(e).</small>
          <input type="text" name="apprenticeLastName" value={formData.apprenticeLastName} onChange={handleChange} required/>
        </div>

        <div className="mb-3 d-flex flex-column">
          <label className="form-label">APPRENTI(E) ESEO (Prénom) *</label>
          <small>PRÉNOM de l'apprenti(e) ESEO recruté(e) dans le cadre du contrat d'apprentissage</small>
          <input type="text" name="apprenticeFirstName" value={formData.apprenticeFirstName} onChange={handleChange} required/>
        </div>

        <div className="mb-3 d-flex flex-column">
          <label className="form-label">INTITULÉ DU POSTE OCCUPÉ PAR L’APPRENTI(E) : * </label>
          <input type="text" name="apprenticePostName" value={formData.apprenticePostName} onChange={handleChange} required/>
        </div>

        <div className="mb-3 d-flex flex-column">
          <label className="form-label">DESCRIPTIF DU POSTE : fiche de poste détaillée des missions confiées dans le cadre du contrat d'apprentissage : * </label>
          <small>L'ESEO vérifiera l'adéquation des missions afférentes avec les objectifs du diplôme préparé</small>
          <textarea name="positionDescription" value={formData.positionDescription} onChange={handleChange} required/>
        </div>

        <div className="mb-3 d-flex flex-column">
          <label className="form-label">CLASSIFICATION DANS LA CONVENTION COLLECTIVE (Niveaux et coefficients hiérarchiques) : * </label>
          <small>Il s’agit des niveaux et coefficients d’entrée et de sortie de l'apprenti(e) (en début, puis en fin de contrat)</small>
          <input type="text" name="conventionCoef" value={formData.conventionCoef} onChange={handleChange} required/>
        </div>
        
        <div className="mb-3">
          <label className="form-label">Durée hebdomadaire de travail :*</label>
          <div className="mb-3">
            <input type="radio" id="35hours" name="workHours" value="35" checked={formData.workHours === '35'} onChange={handleChange} required/>
            <label htmlFor="35hours">35 heures</label>
          </div>

          <div className="mb-3">
            <input type="radio" id="39hours" name="workHours" value="39" checked={formData.workHours === '39'} onChange={handleChange} required/>
            <label htmlFor="39hours">39 heures</label>
          </div>

          <div className="mb-3">
            <input type="radio" id="otherHours" name="workHours" checked={!['35', '39'].includes(formData.workHours)} onChange={handleChange} required/>
            <label htmlFor="otherHours">Autre</label>
            {['35', '39'].includes(formData.workHours) || (
              <div className="mb-3">
                <label className="form-label">Indiquez le nombre d'heures :</label>
                <input
                  type="text"
                  name="workHours"
                  value={formData.workHours}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <section>
        <h1>ORGANISMES</h1>
        <div className="mb-3 d-flex flex-column">
          <label className="form-label">RAISON SOCIALE DE L’ENTREPRISE *</label>
          <small>Il s’agit de la dénomination juridique de la société et non sa dénomination commerciale.</small>
          <input type="text" name="socialName" value={formData.socialName} onChange={handleChange} required/>
        </div>

        <div className="mb-3 d-flex flex-column">
          <label className="form-label">N° SIRET DE L'ENTREPRISE : * </label>
          <input type="text" name="siretNum" value={formData.siretNum} onChange={handleChange} required/>
        </div>

        <div className="mb-3 d-flex flex-column">
          <label className="form-label">NOMBRE DE SALARIES EN FRANCE : *</label>
          <input type="text" name="membersNum" value={formData.membersNum} onChange={handleChange} required/>
        </div>

        <div className="mb-3 d-flex flex-column">
          <label className="form-label">Code et Libellé CPNE - Commission paritaire nationale de l’emploi : * </label>
          <small>Sollicités dans le cadre de la prise en charge par l'OPCO (barème France Compétences). Pour les entreprises du secteur public, noter "Secteur public".</small>
          <input type="text" name="cpne" value={formData.cpne} onChange={handleChange} required/>
        </div>

        <div className="mb-3 d-flex flex-column">
          <label className="form-label">Code IDCC : *  </label>
          <small>Sollicité dans le cadre de la prise en charge par l'OPCO (barème France Compétences). Pour les entreprises du secteur public, noter le nom et la localité du CNFPT de rattachement</small>
          <input type="text" name="idcc" value={formData.idcc} onChange={handleChange} required/>
        </div>

        <div className="mb-3 d-flex flex-column">
          <label className="form-label">CONVENTION COLLECTIVE : * </label>
          <input type="text" name="collectiveConvention" value={formData.collectiveConvention} onChange={handleChange} required/>
        </div>

        <div className="mb-3 d-flex flex-column">
          <label className="form-label">CODE NAF/APE : *  </label>
          <input type="text" name="nafCode" value={formData.nafCode} onChange={handleChange} required/>
        </div>

        <div className="mb-3 d-flex flex-column">
          <label className="form-label">SECTEUR ACTIVITÉ PRINCIPALE : *</label>
          <input type="text" name="activitySector" value={formData.activitySector} onChange={handleChange} required/>
        </div>

        <div className="mb-3 d-flex flex-column">
          <label className="form-label">TÉLÉPHONE PRINCIPAL : *</label>
          <input type="text" name="principalPhoneNumber" value={formData.principalPhoneNumber} onChange={handleChange} required/>
        </div>

        <div className="mb-3 d-flex flex-column">
          <label className="form-label">E-MAIL PRINCIPAL : *</label>
          <input type="email" name="principalMail" value={formData.principalMail} onChange={handleChange} required/>
        </div>

        <div className="mb-3 d-flex flex-column">
          <label className="form-label">ADRESSE (ADRESSE - CP - VILLE) : *</label>
          <small>Merci de renseigner ici l'adresse de l'entreprise signataire de la convention</small>
          <input type="text" name="companyAddress" value={formData.companyAddress} onChange={handleChange} required/>
        </div>

        <div className="mb-3 d-flex flex-column">
          <label className="form-label">LIEU DE FORMATION (RAISON SOCIALE) :</label>
          <small>Merci de renseigner, si elle est différente de celle renseignée ci-dessus, la raison sociale du lieu d'exécution du contrat d'apprentissage.</small>
          <input type="text" name="formationPlaceSocialReason" value={formData.formationAddressSocialReason} onChange={handleChange}/>
        </div>

        <div className="mb-3 d-flex flex-column">
          <label className="form-label">LIEU DE FORMATION (SIRET) :</label>
          <small>Merci de renseigner, s'il est différent de celui renseigné ci-dessus, le n° de SIRET du lieu d'exécution du contrat d'apprentissage.</small>
          <input type="text" name="formationPlaceSiret" value={formData.formationPlaceSiret} onChange={handleChange}/>
        </div>

        <div className="mb-3 d-flex flex-column">
          <label className="form-label">LIEU DE FORMATION (ADRESSE - CP - VILLE) :</label>
          <small>Merci de renseigner, si elle est différente de celle renseignée ci-dessus, l'adresse COMPLÈTE du lieu d'exécution du contrat d'apprentissage.</small>
          <input type="text" name="formationPlaceAddress" value={formData.formationPlaceAddress} onChange={handleChange}/>
        </div>

        <div className="mb-3 d-flex flex-column">
          <label className="form-label">OPCO (NOM - RAISON SOCIALE) : *</label>
          <small>Il s’agit de votre opérateur de compétences. Merci de bien vouloir indiquer ses coordonnées
            complètes, ici le NOM - RAISON SOCIALE.
            Pour les entreprises du secteur public : CNFPT (NOM - RAISON SOCIALE) :</small>
          <input type="text" name="opcoName" value={formData.opcoName} onChange={handleChange} required/>
        </div>

        <div className="mb-3 d-flex flex-column">
          <label className="form-label">OPCO (SIRET) : * </label>
          <small>Il s’agit de votre opérateur de compétences. Merci de bien vouloir indiquer ses coordonnées complètes, ici le SIRET.
            Pour les entreprises du secteur public : CNFPT (SIRET) :</small>
          <input type="text" name="opcoSiret" value={formData.opcoSiret} onChange={handleChange} required/>
        </div>

        <div className="mb-3 d-flex flex-column">
          <label className="form-label">OPCO (ADRESSE - CP - VILLE) : *</label>
          <small>Il s’agit de votre opérateur de compétences. Merci de bien vouloir indiquer ses coordonnées complètes, ici l'ADRESSE - CP- VILLE.
            Pour les entreprises du secteur public : CNFPT (ADRESSE - CP - VILLE)</small>
          <input type="text" name="opcoAddress" value={formData.opcoAddress} onChange={handleChange} required/>
        </div>

        <div className="mb-3 d-flex flex-column">
          <label className="form-label">OPCO (TÉLÉPHONE) : * </label>
          <small>Il s’agit de votre opérateur de compétences. Merci de bien vouloir indiquer ses coordonnées complètes, ici le TÉLÉPHONE.
            Pour les entreprises du secteur public : CNFPT (TÉLÉPHONE) :</small>
          <input type="text" name="opcoPhoneNumber" value={formData.opcoPhoneNumber} onChange={handleChange} required/>
        </div>

        <div className="mb-3 d-flex flex-column">
          <label className="form-label">OPCO (E-MAIL) : *  </label>
          <small>Il s’agit de votre opérateur de compétences. Merci de bien vouloir indiquer ses coordonnées complètes, ici l'E-MAIL.
            Pour les entreprises du secteur public : CNFPT (E-MAIL) :</small>
          <input type="email" name="opcoEmail" value={formData.opcoEmail} onChange={handleChange} required/>
        </div>
      </section>

      <section>
        <h1>PERSONNES</h1>

        <div className="mb-3 d-flex flex-column">
          <label className="form-label">REPRÉSENTANT DE L'ENTREPRISE (NOM) : * </label>
          <small>Il s’agit du NOM de la personne qui signera la Convention de partenariat envoyée par l’ESEO</small>
          <input type="text" name="companyRepresentativeLastName" value={formData.companyRepresentativeLastName} onChange={handleChange} required/>
        </div>

        <div className="mb-3 d-flex flex-column">
          <label className="form-label">REPRÉSENTANT DE L'ENTREPRISE (Prénom) : *</label>
          <small>Il s’agit du PRÉNOM de la personne qui signera la Convention de partenariat envoyée par l’ESEO</small>
          <input type="text" name="companyRepresentativeFirstName" value={formData.companyRepresentativeFirstName} onChange={handleChange} required/>
        </div>

        <div className="mb-3 d-flex flex-column">
          <label className="form-label">REPRÉSENTANT DE L'ENTREPRISE (Fonction) : *</label>
          <small>Il s’agit de la FONCTION de la personne qui signera la Convention de partenariat envoyée par l’ESEO.</small>
          <input type="text" name="companyRepresentativeFunction" value={formData.companyRepresentativeFunction} onChange={handleChange} required/>
        </div>

        <div className="mb-3 d-flex flex-column">
          <label className="form-label">REPRÉSENTANT DE L'ENTREPRISE (Téléphone) *</label>
          <small>Il s’agit du numéro de TÉLÉPHONE de la personne qui signera la Convention de partenariat envoyée par l’ESEO.</small>
          <input type="text" name="companyRepresentativePhoneNumber" value={formData.companyRepresentativePhoneNumber} onChange={handleChange} required/>
        </div>
      </section>

      <div className="mb-3">
      <label className="form-label">LE REPRESENTANT DE L'ENTREPRISE EST-IL UN ANCIEN DE L'ESEO ? *</label>
        <div className="mb-3">
          <input type="radio" id="companyRepresentativeEseoAlumniYes" name="companyRepresentativeIsEseoAlumnus" value="OUI" checked={formData.companyRepresentativeIsEseoAlumnus === 'OUI'} onChange={handleChange} required/>
          <label htmlFor="companyRepresentativeEseoAlumnusYes">OUI</label>
        </div>
        <div className="mb-3">
          <input type="radio" id="companyRepresentativeEseoAlumniNo" name="companyRepresentativeIsEseoAlumnus" value="NON" checked={formData.companyRepresentativeIsEseoAlumnus === 'NON'} onChange={handleChange} required/>
          <label htmlFor="companyRepresentativeEseoAlumniNo">NON</label>
        </div>
      </div>

      <div className="mb-3 d-flex flex-column">
        <label className="form-label">MAÎTRE D'APPRENTISSAGE (NOM) *</label>
        <small>Il s'agit du NOM de la personne qui va assurer l'encadrement opérationnel de l'apprenti(e) en entreprise.</small>
        <input type="text" name="masterLastName" value={formData.masterLastName} onChange={handleChange} required/>
      </div>

      <div className="mb-3 d-flex flex-column">
        <label className="form-label">MAÎTRE D'APPRENTISSAGE (PRENOM) *</label>
        <small>Il s'agit du PRÉNOM de la personne qui va assurer l'encadrement opérationnel de l'apprenti(e) en entreprise.</small>
        <input type="text" name="masterFirstName" value={formData.masterFirstName} onChange={handleChange} required/>
      </div>

      <div className="mb-3 d-flex flex-column">
        <label className="form-label">MAÎTRE D'APPRENTISSAGE (Téléphone) *</label>
        <small>Il s'agit du NUMÉRO DE LIGNE DIRECTE de la personne qui va assurer l'encadrement opérationnel de l'apprenti(e) en entreprise</small>
        <input type="text" name="masterPhoneNumber" value={formData.masterPhoneNumber} onChange={handleChange} required/>
      </div>

      <div className="mb-3 d-flex flex-column">
        <label className="form-label">MAÎTRE D'APPRENTISSAGE (E-mail) *</label>
        <small>Il s'agit de l'E-MAIL de la personne qui va assurer l'encadrement opérationnel de l'apprenti(e) en entreprise.</small>
        <input type="email" name="masterEmail" value={formData.masterEmail} onChange={handleChange} required />
      </div>

      <div className="mb-3 d-flex flex-column">
        <label className="form-label">MAÎTRE D'APPRENTISSAGE (Fonction) *</label>
        <small>Il s'agit de la FONCTION occupée par la personne qui va assurer l'encadrement opérationnel de l'apprenti(e) en entreprise.</small>
        <input type="text" name="masterFunction" value={formData.masterFunction} onChange={handleChange} required />
      </div>

      <div className="mb-3 d-flex flex-column">
        <label className="form-label">MAÎTRE D'APPRENTISSAGE (Dernier diplôme obtenu) *</label>
        <small>Il s'agit du DERNIER DIPLÔME OBTENU par la personne qui va assurer l'encadrement
          opérationnel de l'apprenti(e) en entreprise.
          Critères d'éligibilité :
          - être titulaire d'un diplôme, ou titre, du même domaine professionnel et d'un niveau au moins
          équivalent à celui visé par l'apprenti et d'une année d'exercice d'une activité professionnelle en
          rapport avec la qualification préparée par l'apprenti,
          OU
          - justifier de deux années d'exercice d'une activité professionnelle en rapport avec la qualification
          préparée par l'apprenti être d'un niveau au moins équivalent</small>
        <input type="text" name="masterLastDiploma" value={formData.masterLastDiploma} onChange={handleChange} required />
      </div>

      <div className="mb-3">
        <label className="form-label">LE MAÎTRE D'APPRENTISSAGE DE L'APPRENTI EST-IL UN ANCIEN DE L'ESEO ? *</label>
        <div className="mb-3">
          <input type="radio" id="masterEseoAlumniYes" name="isMasterEseoAlumni" value="OUI" checked={formData.isMasterEseoAlumni === 'OUI'} onChange={handleChange} required/>
          <label htmlFor="masterEseoAlumniYes">OUI</label>
        </div>
        <div className="mb-3">
          <input type="radio" id="masterEseoAlumniNo" name="isMasterEseoAlumni" value="NON" checked={formData.isMasterEseoAlumni === 'NON'} onChange={handleChange} required/>
          <label htmlFor="masterEseoAlumniNo">NON</label>
        </div>
      </div>

      <div className="mb-3 d-flex flex-column">
        <label className="form-label">RESPONSABLE FINANCE/COMPTABILITÉ (NOM) *</label>
        <small>Il s’agit du NOM de la personne qui sera le contact du CFA pour la facturation</small>
        <input type="text" name="billingContactLastName" value={formData.billingContactLastName} onChange={handleChange} required />
      </div>

      <div className="mb-3 d-flex flex-column">
        <label className="form-label">RESPONSABLE FINANCE/COMPTABILITÉ (Prénom) *</label>
        <small>Il s’agit du PRÉNOM de la personne qui sera le contact du CFA pour la facturation</small>
        <input type="text" name="billingContactFirstName" value={formData.billingContactFirstName} onChange={handleChange} required />
      </div>

      <div className="mb-3 d-flex flex-column">
        <label className="form-label">RESPONSABLE FINANCE/COMPTABILITÉ (Téléphone) *</label>
        <small>Il s’agit du N° DE TÉLÉPHONE de la personne qui sera le contact du CFA pour la facturation.</small>
        <input type="text" name="billingContactPhone" value={formData.billingContactPhone} onChange={handleChange} required />
      </div>

      <div className="mb-3 d-flex flex-column">
        <label className="form-label">RESPONSABLE FINANCE/COMPTABILITÉ (E-mail) *</label>
        Il s’agit de l'E-MAIL de la personne qui sera le contact du CFA pour la facturation.
        <input type="email" name="billingContactEmail" value={formData.billingContactEmail} onChange={handleChange} required />
      </div>

      <div className="mb-3">
        <label className="form-label">LE RESPONSABLE FINANCE/COMPTABILITÉ EST-IL UN ANCIEN DE L'ESEO ? *</label>
        <div className="mb-3">
          <input type="radio" id="billingContactEseoAlumnusYes" name="isBillingContactEseoAlumnus" value="OUI" checked={formData.isBillingContactEseoAlumnus === 'OUI'} onChange={handleChange} required/>
          <label htmlFor="billingContactEseoAlumnusYes">OUI</label>
        </div>
        <div className="mb-3">
          <input type="radio" id="billingContactEseoAlumnusNo" name="isBillingContactEseoAlumnus" value="NON" checked={formData.isBillingContactEseoAlumnus === 'NON'} onChange={handleChange} required/>
          <label htmlFor="billingContactEseoAlumnusNo">NON</label>
        </div>
      </div>

      <div className="mb-3 d-flex flex-column">
        <label className="form-label">SUIVI ADMINISTRATIF DU DOSSIER (NOM) *</label>
        <small>Il s’agit du NOM de la personne qui gérera opérationnellement le dossier, pour la signature de la
          Convention de partenariat et aussi en cas de problème rencontré. Elle sera destinataire du CERFA
          (contrat de travail) en vue de sa signature électronique.</small>
        <input type="text" name="adminContactLastName" value={formData.adminContactLastName} onChange={handleChange} required />
      </div>

      <div className="mb-3 d-flex flex-column">
        <label className="form-label">SUIVI ADMINISTRATIF DU DOSSIER (Prénom) *</label>
        <small>Il s’agit du PRÉNOM de la personne qui gérera opérationnellement le dossier, pour la signature
          de la Convention de partenariat et aussi en cas de problème rencontré. Elle sera destinataire du
          CERFA (contrat de travail) en vue de sa signature électronique.</small>
        <input type="text" name="adminContactFirstName" value={formData.adminContactFirstName} onChange={handleChange} required />
      </div>

      <div className="mb-3 d-flex flex-column">
        <label className="form-label">SUIVI ADMINISTRATIF DU DOSSIER (Téléphone) *</label>
        <small>Il s’agit du N° DE TÉLÉPHONE de la personne qui gérera opérationnellement le dossier, pour la
          signature de la Convention de partenariat et aussi en cas de problème rencontré. Elle sera
          destinataire du CERFA (contrat de travail) en vue de sa signature électronique</small>
        <input type="text" name="adminContactPhone" value={formData.adminContactPhone} onChange={handleChange} required />
      </div>

      <div className="mb-3 d-flex flex-column">
        <label className="form-label">SUIVI ADMINISTRATIF DU DOSSIER (E-mail) *</label>
        <small>Il s’agit de l'E-MAIL de la personne qui gérera opérationnellement le dossier, pour la signature de
          la Convention de partenariat et aussi en cas de problème rencontré. Elle sera destinataire du
          CERFA (contrat de travail) en vue de sa signature électronique.</small>
        <input type="email" name="adminContactEmail" value={formData.adminContactEmail} onChange={handleChange} required />
      </div>

      <div className="mb-3">
        <label className="form-label">LE RESPONSABLE DU SUIVI ADMINISTRATIF DU DOSSIER EST-IL UN ANCIEN DE L'ESEO ? *</label>
        <div className="mb-3">
          <input type="radio" id="adminContactEseoAlumnusYes" name="isAdminContactEseoAlumnus" value="OUI" checked={formData.isAdminContactEseoAlumnus === 'OUI'} onChange={handleChange} required/>
          <label htmlFor="adminContactEseoAlumnusYes">OUI</label>
        </div>
        <div className="mb-3">
          <input type="radio" id="adminContactEseoAlumnusNo" name="isAdminContactEseoAlumnus" value="NON" checked={formData.isAdminContactEseoAlumnus === 'NON'} onChange={handleChange} required/>
          <label htmlFor="adminContactEseoAlumnusNo">NON</label>
        </div>
      </div>

      <div className="mb-3 d-flex flex-column">
        <label className="form-label">Rappel concernant l'Expérience Internationale exigée par la CTI *</label>
        <small>La Commission des Titres d’Ingénieurs (CTI) a rendu obligatoire une expérience internationale
          pour pouvoir valider le diplôme d’ingénieur.
          Pour satisfaire les exigences pédagogiques d’une expérience professionnelle internationale (EPI),
          l’apprenti(e) devra impérativement, au cours de sa formation, réaliser un stage de 12 semaines
          consécutives à l’étranger. Il s’exécutera sur une période estivale (de préférence la première année
          de formation), le calendrier d’alternance étant aménagé pour que cela soit possible.
          A cette fin, l’apprenti(e) devra compléter une déclaration d'EPI à l’ESEO pour validation avant
          départ. L’ESEO éditera une convention quadripartite spécifique à cette période de mobilité. Celleci sera signée par l’employeur, l’entreprise d’accueil, le CFA et l’apprenti(e). Cette convention
          définira les modalités de cette mobilité telles que les missions confiées à l’apprenti(e), les moyens
          à mettre en œuvre (prises en charge des frais éventuels, etc.).
          L’OPCO peut prendre en charge tout ou partie des frais générés par la mobilité à l’étranger. (cf.
          modalités de prise en charge de l’OPCO de l’entreprise).
          Pour les entreprises du secteur public, les frais liés à la mobilité doivent être intégrés dans le plan
          de financement de la formation.
          Informations saisies certifiées exactes le :</small>
          <input type="date" name="hasInternationalExperience" value={formData.hasInternationalExperience} onChange={handleChange} required/>
      </div> 

      <button type="submit">Soumettre</button>
    </form>
  );
};

export default ApprenticeshipForm;

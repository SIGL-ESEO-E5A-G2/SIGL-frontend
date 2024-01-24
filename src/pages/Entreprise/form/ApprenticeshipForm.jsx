import React, { useState } from 'react';
import { TextInput, Textarea, NumberInput, Radio, Stack, Group, Text, Title, Button, Box } from "@mantine/core";

import { postApprenti, postCompany, postMaitreAlternance, postOpco, postRepresentantEntreprise, postResponsableAdmin, postResponsableFinance, postUtilisateur } from '../../../utils/api.js';

const ApprenticeshipForm = () => {
  const [formData, setFormData] = useState({
    apprenticeLastName: '',
    apprenticeFirstName: '',
    apprenticePostName: '',
    positionDescription: '',
    conventionCoef: '',
    workHours: '',
    workHoursOther: '',    
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
    companyRepresentativeEmail: '',
    companyRepresentativeLastName: '',
    companyRepresentativeFirstName: '',
    companyRepresentativeFunction: '',
    companyRepresentativePhoneNumber: '',
    companyRepresentativeIsAlumni: '',
    masterLastName: '',
    masterFirstName: '',
    masterPhoneNumber: '',
    masterEmail: '',
    masterFunction: '',
    masterLastDiploma: '',
    isMasterEseoAlumni: '',
    billingContactLastName: '',
    billingContactFirstName: '',
    billingContactPhone: '',
    billingContactEmail: '',
    isBillingContactEseoAlumni: '',
    adminContactLastName: '',
    adminContactFirstName: '',
    adminContactPhone: '',
    adminContactEmail: '',
    isAdminContactEseoAlumni: '',
    hasInternationalExperience: '',
  });

  const handleChange = (e) => {
    const {name , value} = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //données de l'entreprise
    const entreprise = {
      raisonSociale: formData.socialName,
      adresse: formData.formationPlaceAddress,
      secteurDactivite: formData.activitySector,
      description: formData.positionDescription,
      siret: formData.siretNum,
      libelleCPNE: formData.cpne,
      codeIDCC: formData.idcc,
      conventionCollective: formData.collectiveConvention,
      codeNAF: formData.nafCode,
      telephone: formData.adminContactPhone,
      email: formData.adminContactEmail,
      nombreSalarie: formData.membersNum
    }
    
    //données de l'opco
    const opco = {
      raisonSociale: formData.opcoName,
      adresse: formData.opcoAddress,
      siret: formData.opcoSiret,
      telephone: formData.opcoPhoneNumber,
      email: formData.opcoEmail
    }

    //données apprenti
    const apprenti = {
      nom: formData.apprenticeLastName,
      prenom: formData.apprenticeFirstName,
      email: formData.apprenticeFirstName+"."+formData.apprenticeLastName+"@reseau.eseo.fr",
      roles: [1]
    }

    //données du representant d'entreprise
    const companyRepresentative = {
      nom: formData.companyRepresentativeLastName,
      prenom: formData.companyRepresentativeFirstName,
      telephone: formData.companyRepresentativePhoneNumber,
      email: formData.companyRepresentativeEmail,
      roles:[6]
    }

    //données du maitre d'alternance
    const maitreAlternance ={
      nom: formData.masterLastName,
      prenom: formData.masterFirstName,
      telephone: formData.masterPhoneNumber,
      email: formData.masterEmail,
      roles:[5]
    }

    //données responsable des finances
    const responsableFinance = {
      nom: formData.billingContactLastName,
      prenom: formData.billingContactFirstName,
      telephone: formData.billingContactPhone,
      email: formData.billingContactEmail,
      roles:[9]
    }

    //données responsable administratif
    const responsableAdmin = {
      nom: formData.adminContactLastName,
      prenom: formData.adminContactFirstName,
      telephone: formData.adminContactPhone,
      email: formData.adminContactEmail,
      roles:[10]
    }



    postOpco(opco).then((responseOpco) => {

      postCompany(entreprise).then((responseCompany) => {

        postUtilisateur(companyRepresentative).then((responseUserRepresentative) =>{

          let respresentativeData = {
            fonction: formData.companyRepresentativeFunction,
            ancienEseo: formData.companyRepresentativeIsAlumni,
            utilisateur: responseUserRepresentative.id,
            entreprise: responseCompany.id
          }
          postRepresentantEntreprise(respresentativeData);
        });
        
        postUtilisateur(maitreAlternance).then((responseUserMaitreAlternance) =>{
          let maitreAlternanceData = {
            fonction: formData.masterFunction,
            dernierdiplome: formData.masterLastDiploma,
            ancienEseo: formData.isMasterEseoAlumni,
            utilisateur: responseUserMaitreAlternance.id,
            entreprise: responseCompany.id
          }
          postMaitreAlternance(maitreAlternanceData).then((responseMaitreAlternance) => {
            
            postUtilisateur(responsableFinance).then((responseUserFinance) => {
              let financeData = {
                ancienEseo: formData.isBillingContactEseoAlumni,
                utilisateur: responseUserFinance.id,
              }

              postResponsableFinance(financeData).then((responseResponsableFinance)=> {

                postUtilisateur(responsableAdmin).then((responseUserAdmin) => {
                  let adminData = {
                    ancienEseo: formData.isAdminContactEseoAlumni,
                    utilisateur: responseUserAdmin.id,
                  }
                  
                  postResponsableAdmin(adminData).then((responseResponsableAdmin) =>{
                    postUtilisateur(apprenti).then((responseUserApprenti) => {
                      let apprenti = {
                        optionMajeure: "N/A",
                        optionMineure: "N/A",
                        intitulePoste: formData.apprenticePostName,
                        descriptifPoste:formData.positionDescription,
                        classificationConventionCollective: formData.conventionCoef,
                        dureeHebdoContrat: formData.workHours || formData.workHoursOther,
                        utilisateur: responseUserApprenti.id,
                        tuteurPedagogique: null,
                        maitreAlternance: responseMaitreAlternance.id,
                        promotion: null,
                        entreprise: responseCompany.id,
                        opco: responseOpco.id,
                        grilleEvaluation: null,
                        ResponsableFinance: responseResponsableFinance.id,
                        ResponsableAdministration: responseResponsableAdmin.id,
                      }
        
                      postApprenti(apprenti);
                    });
                  })
                });
              });
            });
          });
        });
      });
    });
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <Stack gap="xl">
        <Section title="Apprenti(e)">
          <TextInput
            name="apprenticeLastName"
            label="Nom"
            required
            value={formData.apprenticeLastName}
            onChange={handleChange}
          />

          <TextInput
            name="apprenticeFirstName"
            label="Prénom"
            required
            value={formData.apprenticeFirstName}
            onChange={handleChange}
          />

          <TextInput
            name="apprenticePostName"
            label="Intitulé du poste"
            required
            value={formData.apprenticePostName}
            onChange={handleChange}
          />

          <Textarea
            name="positionDescription"
            label="Descriptif du poste"
            description={<>
              Fiche de poste détaillée des missions confiées dans le cadre du contrat d'apprentissage
              <br />
              L'ESEO vérifiera l'adéquation des missions afférentes avec les objectifs du diplôme préparé
            </>}
            required
            value={formData.positionDescription}
            onChange={handleChange}
          />

          <TextInput
            name="conventionCoef"
            label="Classification dans la convention collective"
            description="Niveaux et coefficients hiérarchiques. Il s’agit des niveaux et coefficients d’entrée et de sortie de l'apprenti(e) (en début, puis en fin de contrat)"
            required
            value={formData.conventionCoef}
            onChange={handleChange}
          />

          <Radio.Group
            name="workHours"
            label="Durée hebdomadaire de travail"
            required
            value={formData.workHours}
            onChange={value => handleChange({ target: { value: value, name: "workHours" } })}
          >
            <Group>
              <Radio value="35" label="35 heures" />
              <Radio value="37" label="37 heures" />
              <Radio value="39" label="39 heures" />
              <Group>
                <Radio value="" label="Autre" />
                <NumberInput
                 size="xs"
                 disabled={["35", "37.5", "39"].includes(formData.workHours)}
                 value={formData.workHoursOther}
                 onChange={(value) => handleChange({ target: { value, name: "workHoursOther" } })}
                />
              </Group>
            </Group>
          </Radio.Group>
        </Section>

        <Section title="Entreprise">
          <TextInput
            name="socialName"
            required
            label="Raison sociale"
            description="Il s’agit de la dénomination juridique de la société et non sa dénomination commerciale"
            value={formData.socialName}
            onChange={handleChange}
          />

          <TextInput
            name="siretNum"
            required
            label="N° siret"
            value={formData.siretNum}
            onChange={handleChange}
          />

          <TextInput
            name="membersNum"
            required
            label="Nombres de salariés en france"
            value={formData.membersNum}
            onChange={handleChange}
          />

          <TextInput
            name="cpne"
            required
            label={<>Code et libellé CPNE (<i>Commission Paritaire Nationale de l’Emploi</i>)</>}
            description="Sollicités dans le cadre de la prise en charge par l'OPCO (barème France Compétences). Pour les entreprises du secteur public : notez Secteur public"
            value={formData.cpne}
            onChange={handleChange}
          />

          <TextInput
            name="idcc"
            required
            label="Code IDCC"
            description="Sollicité dans le cadre de la prise en charge par l'OPCO (barème France Compétences). Pour les entreprises du secteur public : notez le nom et la localité du CNFPT de rattachement"
            value={formData.idcc}
            onChange={handleChange}
          />

          <TextInput
            name="collectiveConvention"
            required
            label="Convention collective"
            value={formData.collectiveConvention}
            onChange={handleChange}
          />

          <TextInput
            name="nafCode"
            required
            label="Code NAF / APE"
            value={formData.nafCode}
            onChange={handleChange}
          />

          <TextInput
            name="activitySector"
            required
            label="Secteur d'activité principal"
            value={formData.activitySector}
            onChange={handleChange}
          />

          <TextInput
            name="principalPhoneNumber"
            required
            type="tel"
            label="Numéro de téléphone"
            value={formData.principalPhoneNumber}
            onChange={handleChange}
          />

          <TextInput
            name="principalMail"
            required
            type="email"
            label="Email"
            value={formData.principalMail}
            onChange={handleChange}
          />

          <TextInput
            name="companyAddress"
            required
            label="Adresse (Adresse - CP - Ville)" // TODO séparer en 3
            description="Merci de renseigner ici l'adresse de l'entreprise signataire de la convention"
            value={formData.companyAddress}
            onChange={handleChange}
          />
        </Section>

        <Section
          title="Lieu de formation de l'apprenti"
          description="A renseigner si différent de l'adresse de l'entreprise. Sinon, à laisser vide"
        >
          <TextInput
            name="formationAddressSocialReason"
            label="Raison sociale"
            value={formData.formationAddressSocialReason}
            onChange={handleChange}
          />

          <TextInput
            name="formationPlaceSiret"
            label="Siret"
            value={formData.formationPlaceSiret}
            onChange={handleChange}
          />

          <TextInput
            name="formationPlaceAddress"
            label="Adresse - CP - Ville"
            value={formData.formationPlaceAddress}
            onChange={handleChange}
          />
        </Section>

        <Section title="OPCO" description="Il s’agit de votre opérateur de compétences">
          <TextInput
            name="opcoName"
            required
            label="Nom - Raison sociale" // TODO renseigner separement
            description="Pour les entreprises du secteur public : CNFPT (NOM - RAISON SOCIALE)"
            value={formData.opcoName}
            onChange={handleChange}
          />

          <TextInput
            name="opcoSiret"
            required
            label="Siret"
            description="Pour les entreprises du secteur public : CNFPT (SIRET)"
            value={formData.opcoSiret}
            onChange={handleChange}
          />

          <TextInput
            name="opcoAddress"
            required
            label="Adresse - CP - Ville"
            description="Pour les entreprises du secteur public : CNFPT (ADRESSE - CP - VILLE)"
            value={formData.opcoAddress}
            onChange={handleChange}
          />

          <TextInput
            name="opcoPhoneNumber"
            required
            type="tel"
            label="Téléphone"
            description="Pour les entreprises du secteur public : CNFPT (TÉLÉPHONE)"
            value={formData.opcoPhoneNumber}
            onChange={handleChange}
          />

          <TextInput
            name="opcoEmail"
            required
            type="email"
            label="Email"
            description="Pour les entreprises du secteur public : CNFPT (E-MAIL)"
            value={formData.opcoEmail}
            onChange={handleChange}
          />
        </Section>

        <Section title="Représentant de l'entreprise" description="Personne devant signer la Convention de partenariat envoyée par l’ESEO">
          <TextInput
            name="companyRepresentativeLastName"
            required
            label="Nom"
            value={formData.companyRepresentativeLastName}
            onChange={handleChange}
          />

          <TextInput
            name="companyRepresentativeFirstName"
            required
            label="Prénom"
            value={formData.companyRepresentativeFirstName}
            onChange={handleChange}
          />

          <TextInput
            name="companyRepresentativeFunction"
            required
            label="Fonction"
            value={formData.companyRepresentativeFunction}
            onChange={handleChange}
          />

          <TextInput
            name="companyRepresentativePhoneNumber"
            required
            type="tel"
            label="Numéro de téléphone"
            value={formData.companyRepresentativePhoneNumber}
            onChange={handleChange}
          />

          <TextInput
            name="companyRepresentativeEmail"
            required
            type="email"
            label="Email"
            value={formData.companyRepresentativeEmail}
            onChange={handleChange}
          />

          <Radio.Group
            required
            label="Ancien(ne) de l'ESEO"
            value={formData.companyRepresentativeIsAlumni}
            onChange={(value) => handleChange({ target: { name: 'companyRepresentativeIsAlumni', value } })}
          >
            <Group>
              <Radio value="true" label="Oui" />
              <Radio value="false" label="Non" />
            </Group>
          </Radio.Group>
        </Section>

        <Section title="Maître d'apprentissage">
          <TextInput
            name="masterLastName"
            required
            label="Nom"
            value={formData.masterLastName}
            onChange={handleChange}
          />

          <TextInput
            name="masterFirstName"
            required
            label="Prénom"
            value={formData.masterFirstName}
            onChange={handleChange}
          />

          <TextInput
            name="masterPhoneNumber"
            required
            type="tel"
            label="Téléphone"
            value={formData.masterPhoneNumber}
            onChange={handleChange}
          />

          <TextInput
            name="masterEmail"
            required
            type="email"
            label="Email"
            value={formData.masterEmail}
            onChange={handleChange}
          />

          <TextInput
            name="masterFunction"
            required
            label="Fonction"
            value={formData.masterFunction}
            onChange={handleChange}
          />

          <TextInput
            name="masterLastDiploma"
            required
            label="Dernier diplôme obtenu"
            description={<>
              Il s'agit du dernier diplôme obtenu par la personne qui va assurer l'encadrement opérationnel de l'apprenti(e) en entreprise.
              <br />
              Critères d'éligibilité :
              <br />
              <ul>
                <li>
                  être titulaire d'un diplôme, ou titre, du même domaine professionnel et d'un niveau au moins
                  équivalent à celui visé par l'apprenti et d'une année d'exercice d'une activité professionnelle en
                  rapport avec la qualification préparée par l'apprenti
                </li>
                <b>OU</b>
                <li>
                  justifier de deux années d'exercice d'une activité professionnelle en rapport avec la qualification
                  préparée par l'apprenti être d'un niveau au moins équivalent
                </li>
              </ul>
            </>}
            value={formData.masterLastDiploma}
            onChange={handleChange}
          />

          <Radio.Group
            required
            label="Ancien(ne) de l'ESEO"
            value={formData.isMasterEseoAlumni}
            onChange={(value) => handleChange({ target: { name: 'isMasterEseoAlumni', value } })}
          >
            <Group>
              <Radio value="true" label="Oui" />
              <Radio value="false" label="Non" />
            </Group>
          </Radio.Group>
        </Section>

        <Section
          title="Responsable finance/comptabilité"
          description="Personne contact du CFA concernant la facturation"
        >
          <TextInput
            name="billingContactLastName"
            required
            label="Nom"
            value={formData.billingContactLastName}
            onChange={handleChange}
          />

          <TextInput
            name="billingContactFirstName"
            required
            label="Prénom"
            value={formData.billingContactFirstName}
            onChange={handleChange}
          />

          <TextInput
            name="billingContactPhone"
            required
            type="tel"
            label="Téléphone"
            value={formData.billingContactPhone}
            onChange={handleChange}
          />

          <TextInput
            name="billingContactEmail"
            required
            type="email"
            label="Email"
            value={formData.billingContactEmail}
            onChange={handleChange}
          />

          <Radio.Group
            required
            label="Ancien(ne) de l'ESEO"
            value={formData.isBillingContactEseoAlumni}
            onChange={(value) => handleChange({ target: { name: 'isBillingContactEseoAlumni', value } })}
          >
            <Group>
              <Radio value="true" label="Oui" />
              <Radio value="false" label="Non" />
            </Group>
          </Radio.Group>
        </Section>

        <Section
          title="Suivi administratif du dossier"
          description="Personne gérant opérationnellement le dossier pour la signature de la Convention de partenariat et aussi en cas de problème rencontré. Elle sera destinataire du CERFA (contrat de travail) en vue de sa signature électronique"
        >
          <TextInput
            name="adminContactLastName"
            required
            label="Nom"
            value={formData.adminContactLastName}
            onChange={handleChange}
          />

          <TextInput
            name="adminContactFirstName"
            required
            label="Prénom"
            value={formData.adminContactFirstName}
            onChange={handleChange}
          />

          <TextInput
            name="adminContactPhone"
            required
            type="tel"
            label="Téléphone"
            value={formData.adminContactPhone}
            onChange={handleChange}
          />

          <TextInput
            name="adminContactEmail"
            required
            type="email"
            label="Email"
            value={formData.adminContactEmail}
            onChange={handleChange}
          />

          <Radio.Group
            required
            label="Ancien(ne) de l'ESEO"
            value={formData.isAdminContactEseoAlumni}
            onChange={(value) => handleChange({ target: { name: 'isAdminContactEseoAlumni', value } })}
          >
            <Group>
              <Radio value="true" label="Oui" />
              <Radio value="false" label="Non" />
            </Group>
          </Radio.Group>
        </Section>

        <Stack>
          <Box p="md" style={{ border: "1px solid var(--mantine-color-red-7)", borderRadius: "5px" }}>
            <Text c="red">Rappel concernant l'expérience internationale exigée par la CTI</Text>
            <Text ta="justify">
              La Commission des Titres d’Ingénieurs (CTI) a rendu obligatoire une expérience internationale
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
            </Text>
          </Box>

          <TextInput
            name="hasInternationalExperience" // TODO rename
            required
            label="Informations saisies certifiées exactes le"
            type="date"
            value={formData.hasInternationalExperience}
            onChange={handleChange}
          />

          <Button type="submit">Soumettre</Button>
        </Stack>
      </Stack>
    </form>
  );
};

function Section({ title, description, children }) {
  return <Stack>
    <div>
      <Title order={1}>{title}</Title>
      {description && <Text size="sm" c="dimmed">{description}</Text>}
    </div>

    {children}
  </Stack>
}

export default ApprenticeshipForm;

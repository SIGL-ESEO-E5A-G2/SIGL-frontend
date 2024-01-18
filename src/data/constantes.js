
export const applicationTitle = "MyApprenticeship";

export const locale = 'fr-FR';

export const tokenSecret = "TODO put in env vars";

export const semestersData = [
    { numero: 5, color: '#0077b6' },
    { numero: 6, color: '#7209b7' },
    { numero: 7, color: '#ef233c' },
    { numero: 8, color: '#f18701' },
    { numero: 9, color: '#ffd166' },
    { numero: 10, color: '#99d98c' },
];
export const semesters = semestersData.map(semester => "S" + semester.numero);

export const etatCompetences = ["Non acquis", "En cours d'acquisition", "Acquis"];

export const roles = ['Apprenti', 'TuteurPedagogique', 'MaitreAlternance', 'CoordinatriceAlternance', 'Administrateur', 'ResponsableEntreprise'];

export const tailleMaxFileEnMo = 1;

export const notifTimeoutShort = 1000;

export const notifTimeoutLong = 3000;

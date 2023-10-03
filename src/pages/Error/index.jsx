export default function ({ code = 0 }) {
    const message = getErrorMessage(code);

    return <>
        Erreur {code} - {message}
    </>
}

function getErrorMessage(code) {
    switch (code) {
        case 404: return "Page non trouvée"
        default: return "Erreur non trouvée";
    }
}
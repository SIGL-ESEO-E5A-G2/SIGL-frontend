import { useContext, useEffect, useState } from "react";
import { Button, Alert, FileInput } from "@mantine/core";
import { saveAs } from 'file-saver';

import MessagesContainer from "../../components/Post";

import { getFile, request, uploadFile } from "../../utils/request";
import { dateString } from "../../utils/formatDate";

import { UserContext } from "../../context/UserContext";

function JournalDepot() {
    const [depots, setDepots] = useState([]);

    const user = useContext(UserContext);

    useEffect(() => {
        request("/depotdetail") // TODO depotutilisateurdetail
            .then(({ data }) => {
                console.log("TAG a", data)
                setDepots(data?.map(depot => ({
                    ...depot.message,
                    idDepot: depot.id,
                    echeance: depot.echeance,
                    cheminFichier: depot.cheminFichier,
                    deposer: depot.message.tags?.map(tag => tag?.libelle)?.includes('Déposé')
                })))
            });
    }, []);

    return (
        <body>
            {/* Messages */}
            <MessagesContainer
                posts={depots}
                Decoration={AddFile}
                setPosts={setDepots}
            />
        </body>
    );
}

/**
 * 
 * @param {File, {cheminFichier}} file 
 */
async function addFile(file, post) {
    if (!file || !post.id) {
        alert('Vous devez sélectionner un fichier')
        return
    }

    return uploadFile({ id: post.idDepot, cheminFichier: post.cheminFichier }, file)
        .then(async () => {
            return request('/message/' + post.id, 'patch', {
                tags: [...post.tags.map(tag => tag.id), 9]
            })
                .then((res) => {
                    alert('Votre document est déposé')
                    return res.data;
                });
        })
        .catch((error) => {
            alert('Une erreur est survenue');
            console.error(error);
        })
}

/**
 * 
 * @param {{cheminFichier}} post 
 * @returns 
 */
async function downloadFile(post) {
    return getFile(post.cheminFichier)
        .then(({ data }) => {
            const filePath = post.cheminFichier.split('/');
            const fileName = filePath ? filePath[filePath.length - 1] : "Fichier.pdf";

            return saveAs(new Blob([data], { type: "application/pdf" }), fileName);
        })
        .catch((error) => {
            alert(error?.response?.data || 'Une erreur est survenue');
            console.error(error);
        })
}

function AddFile({ post }) {
    const [file, setFile] = useState();
    const [estDeposer, setDeposer] = useState(post.deposer);

    const dateEcheance = new Date(post.echeance);
    const echeance = dateString(dateEcheance);
    const dateComparaison = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1);

    const isLate = dateComparaison > dateEcheance;

    return <div className="post-file">
        <Alert
            variant="light"
            title={`Date d'échéance: ${echeance}`}
            color={estDeposer ? "green" : isLate ? "red" : "blue"}
        />

        {
            !estDeposer && <>
                <br />

                <div className="post-file-form">
                    <FileInput
                        clearable
                        accept=".pdf"
                        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                    />

                    <Button
                        onClick={async () => {
                            addFile(file, post)
                                .then(() => setDeposer(true));
                            setFile(null);
                        }}
                    >
                        Déposer
                    </Button>
                </div>
            </>
        }

        {
            estDeposer && <>
                <br />
                <div className="">
                    <Button onClick={() => downloadFile(post)}>
                        Télécharger
                    </Button>
                </div>
            </>
        }
    </div>
}

export default JournalDepot;

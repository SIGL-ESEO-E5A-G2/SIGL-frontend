import { useState } from "react";
import { saveAs } from 'file-saver';
import { Button, Paper, Stack, Group, Text, Badge } from "@mantine/core";
import { Download, Pen, Upload } from "react-bootstrap-icons";

import { getFile, uploadFile } from "../../utils/request";
import { dateString } from "../../utils/formatDate";
import ModalUploadFile from "./ModalUploadFile";

/**
 * 
 * @param {File, {cheminFichier}} file 
 */
async function addFile(file, depot, postId) {
    if (!file || !depot.id || !postId) {
        alert('Un problème est survenue dans le formulaire')
        return
    }

    return uploadFile({
        id: depot.id,
        cheminFichier: depot.cheminFichier
    }, file)
    // .then(async () => request(`/message/${postId}`, 'get'))
    // .then((res) => res.data);
}

/**
 * 
 * @param {{cheminFichier}} depot 
 * @returns 
 */
async function downloadFile(depot) {
    return getFile(depot.cheminFichier)
        .then(({ data }) => {
            const filePath = depot.cheminFichier.split('/');
            const fileName = filePath ? filePath[filePath.length - 1] : "Fichier.pdf";

            return saveAs(new Blob([data], { type: "application/pdf" }), fileName);
        })
        .catch((error) => {
            alert(error?.response?.data || 'Une erreur est survenue');
            console.error(error);
        })
}

function Depot({ post: { depot, id } }, updatePost) {
    const [showModalUpload, setShowModalUpload] = useState();
    const [estDeposer, setDeposer] = useState(!!depot.dateLivraison);

    const [dateLivraison, setDateLivraison] = useState(depot.dateLivraison ? dateString(new Date(depot.dateLivraison)) : null);

    const dateEcheance = new Date(depot.echeance);
    const echeance = dateString(dateEcheance);

    const dateComparaison = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1);
    const isLate = dateComparaison > dateEcheance;

    async function handleAddFile(file) {
        return addFile(file, depot, id)
            .then(() => {
                // update depot
                // TODO update (cheminFichier + dateLivraison)
                setDeposer(true);
                setDateLivraison(dateString(new Date()));
            });
    }

    return <Paper shadow="md" p="md" className="post-box">
        <Group justify="space-between">
            <Stack gap={5}>
                {/* Status */}
                <Group align="center">
                    <Text>Statut:</Text>
                    <Badge color={estDeposer ? "green" : isLate ? "red" : "yellow"}>
                        {estDeposer ? "Déposé" : "Non déposé"}
                    </Badge>
                </Group>

                {/* Echeance */}
                <Text>
                    Echéance le: <i>{echeance}</i>
                    {estDeposer ? <>, Livrer le: <i>{dateLivraison}</i></> : ""}
                </Text>
            </Stack>

            {
                showModalUpload && <ModalUploadFile
                    show={showModalUpload}
                    close={() => setShowModalUpload(false)}
                    uploadFile={handleAddFile}
                />
            }

            {/* Btn upload / download */}
            {
                estDeposer ?
                    <Stack>
                        <Button
                            onClick={() => setShowModalUpload(true)}
                            rightSection={<Pen />}
                        >
                            Modifier
                        </Button>

                        <Button
                            onClick={() => downloadFile(depot)}
                            rightSection={<Download />}
                        >
                            Télécharger
                        </Button>
                    </Stack>
                    :
                    <Button
                        onClick={() => setShowModalUpload(true)}
                        rightSection={<Upload />}
                    >
                        Déposer
                    </Button>
            }
        </Group>
    </Paper>
}

export default Depot;

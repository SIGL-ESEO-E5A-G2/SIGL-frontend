import { Badge, Button, Stack, Table } from "@mantine/core";
import { dateString } from "../../utils/formatDate";
import { useEffect, useState } from "react";
import { downloadFile, request } from "../../utils/request";
import { getNomUser } from "../../utils/divers";
import { Download } from "react-bootstrap-icons";

export function DepotList() {
    const [data, setData] = useState([]);

    useEffect(() => {
        request('/depotdetail', 'get')
            .then(res => setData(res.data));
    }, []);

    return <Stack>

        {/* Tableau */}
        <Table striped highlightOnHover withTableBorder>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Apprenti</Table.Th>
                    <Table.Th>Déppôt</Table.Th>
                    <Table.Th>Tags</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th>Date d'échéance</Table.Th>
                    <Table.Th>Date de livraison</Table.Th>
                    <Table.Th w="6vw">Télécharger</Table.Th>
                </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
                {
                    data.length < 1 && <Table.Tr>
                        <Table.Td colSpan={5} ta="center">
                            Aucun dépôt
                        </Table.Td>
                    </Table.Tr>
                }

                {
                    data.map(row => {
                        if (!row?.id) return;

                        const estDeposer = !!row.dateLivraison;
                        const dateEcheance = new Date(row.echeance).getTime();
                        const dateComparaison = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1).getTime();
                        const isLate = dateComparaison > dateEcheance;
                        const apprenti = row.message?.destinataire?.length ? row.message.destinataire[0] : null;

                        return <Table.Tr>
                            <Table.Td>{getNomUser(apprenti)}</Table.Td>
                            <Table.Td>{row.message?.titre}</Table.Td>
                            <Table.Td>{row.message?.tags?.map(tag => <Badge color={tag.couleur}>{tag.libelle}</Badge>)}</Table.Td>
                            <Table.Td>
                                <Badge color={estDeposer ? "green" : isLate ? "red" : "yellow"}>
                                    {estDeposer ? "Déposé" : "Non déposé"}
                                </Badge>
                            </Table.Td>
                            <Table.Td>{dateString(new Date(row.echeance))}</Table.Td>
                            <Table.Td>{dateString(new Date(row.dateLivraison))}</Table.Td>
                            <Table.Td>
                                <Button onClick={() => downloadFile(apprenti?.utilisateur?.id, row)}><Download /></Button>
                            </Table.Td>
                        </Table.Tr>
                    })
                }
            </Table.Tbody>
        </Table>
    </Stack>
}
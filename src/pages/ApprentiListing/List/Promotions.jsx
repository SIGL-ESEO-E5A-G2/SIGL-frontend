import { useContext, useEffect, useState } from "react";
import { Button, Stack, Table, Title } from "@mantine/core"
import { FilePlus, Pen, Trash } from "react-bootstrap-icons";

import { UserContext } from "../../../context/UserContext";
import ModalAddPromotion from '../modal/ModalAddPromotion';
import ModalRemovePromotion from '../modal/ModalRemovePromotion';
import ModalModificationPromotion from '../modal/ModalModificationPromotion';
import { request } from "../../../utils/request";
import { addRow, removeRow, updateRow } from "../../../utils/divers";
import ModalAddDepotPromotion from "../modal/ModalAddDepotPromotion";

export function Promotions() {
    const [tags, setTags] = useState([]);

    const [data, setData] = useState([]);
    const [currentRow, setCurrentRow] = useState();

    const [showAddDepot, setShowAddDepot] = useState();
    const [showAdd, setShowAdd] = useState();
    const [showModif, setShowModif] = useState();
    const [showRemove, setShowRemove] = useState();

    const user = useContext(UserContext);

    useEffect(() => {
        request('/tag', 'get') // TODO rendre certains tags inacessibles
            .then(({ data }) => setTags((data || [])
                .map(tag => ({
                    ...tag,
                    value: tag.id + "",
                    label: tag.libelle
                }))));

        request('/promotion', 'get')
            .then(res => setData(res.data));
    }, []);

    return <Stack>
        <Title order={3}>Promotions</Title>

        {/* Btn ajout */}
        <Button onClick={() => setShowAdd(true)} w="max-content">
            Ajouter une promotion
        </Button>

        {/* Modal ajout depot */}
        <ModalAddDepotPromotion
            show={showAddDepot}
            close={() => setShowAddDepot(false)}
            row={currentRow}
            tags={tags}
            user={user}
        />

        {/* Modal ajout */}
        <ModalAddPromotion
            show={showAdd}
            close={() => setShowAdd(false)}
            callback={row => addRow(row, setData)}
        />

        {/* Modal modification */}
        <ModalModificationPromotion
            show={showModif}
            close={() => setShowModif(false)}
            row={currentRow}
            callback={row => updateRow(row, setData)}
        />

        {/* Modal suppression */}
        <ModalRemovePromotion
            show={showRemove}
            close={() => setShowRemove(false)}
            row={currentRow}
            callback={rowId => removeRow(rowId, setData)}
        />

        {/* Tableau */}
        <Table striped highlightOnHover withTableBorder>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Nom</Table.Th>
                    <Table.Th>Semestre en cours</Table.Th>
                    <Table.Th w="7vw">Ajouter un dépôt</Table.Th>
                    <Table.Th w="6vw">Modifier</Table.Th>
                    <Table.Th w="6vw">Supprimer</Table.Th>
                </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
                {
                    data.length < 1 && <Table.Tr>
                        <Table.Td colSpan={5} ta="center">
                            Aucune promotion
                        </Table.Td>
                    </Table.Tr>
                }

                {
                    data.map(row => <Table.Tr>
                        <Table.Td>{row.libelle}</Table.Td>
                        <Table.Td>{row.semestre}</Table.Td>
                        <Table.Td>
                            <Button onClick={() => {
                                setCurrentRow(row);
                                setShowAddDepot(true);
                            }}><FilePlus /></Button>
                        </Table.Td>
                        <Table.Td>
                            <Button onClick={() => {
                                setCurrentRow(row);
                                setShowModif(true);
                            }}><Pen /></Button>
                        </Table.Td>
                        <Table.Td>
                            <Button
                                onClick={() => {
                                    setCurrentRow(row);
                                    setShowRemove(true);
                                }}
                                variant="outline"
                                color='red'
                            ><Trash /></Button>
                        </Table.Td>
                    </Table.Tr>)
                }
            </Table.Tbody>
        </Table>
    </Stack>
}

export default Promotions;

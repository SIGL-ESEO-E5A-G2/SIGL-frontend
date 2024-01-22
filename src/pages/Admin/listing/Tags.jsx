import { useEffect, useState } from "react";
import { Button, ColorSwatch, Stack, Table } from "@mantine/core";
import { Pen, Trash } from "react-bootstrap-icons";

import ModalAddTag from "../modal/ModalAddTag";
import ModalModificationTag from "../modal/ModalModificationTag";

import { request } from "../../../utils/request";
import { addRow, removeRow, updateRow } from "../../../utils/divers";
import ModalRemoveTag from "../modal/ModalRemoveTag";

export function Tags() {
    const [data, setData] = useState([]);
    const [currentRow, setCurrentRow] = useState();

    const [showAdd, setShowAdd] = useState();
    const [showModif, setShowModif] = useState();
    const [showRemove, setShowRemove] = useState();

    useEffect(() => {
        request('/tag', 'get')
            .then(res => setData(res.data));
    }, []);

    return <Stack>
        <Button onClick={() => setShowAdd(true)} w="max-content">
            Ajouter un tag
        </Button>

        {/* Modal ajout */}
        <ModalAddTag
            show={showAdd}
            close={() => setShowAdd(false)}
            callback={row => addRow(row, setData)}
        />

        {/* Modal modif */}
        <ModalModificationTag
            show={showModif}
            close={() => setShowModif(false)}
            row={currentRow}
            callback={row => updateRow(row, setData)}
        />

        {/* Modal remove */}
        <ModalRemoveTag
            show={showRemove}
            close={() => setShowRemove(false)}
            row={currentRow}
            callback={row => removeRow(row, setData)}
        />

        {/* Tableau */}
        <Table striped highlightOnHover withTableBorder>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th fw="bold">#</Table.Th>
                    <Table.Th>Nom</Table.Th>
                    <Table.Th>Couleur</Table.Th>
                    <Table.Th>Type</Table.Th>

                    <Table.Th w="6vw">Modifier</Table.Th>
                    <Table.Th w="6vw">Supprimer</Table.Th>
                </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
                {
                    data.length < 1 && <Table.Tr>
                        <Table.Td colSpan={5} ta="center">
                            Aucun tag
                        </Table.Td>
                    </Table.Tr>
                }

                {
                    data.map(row => <Table.Tr>
                        <Table.Td>{row.id}</Table.Td>
                        <Table.Td>{row.libelle}</Table.Td>
                        <Table.Td><ColorSwatch color={row.couleur} /></Table.Td>
                        <Table.Td>{row.type}</Table.Td>

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

export default Tags;

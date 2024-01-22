import { useEffect, useMemo, useState } from "react";
import { Button, Group, Select, Stack, Table, TextInput, Title } from "@mantine/core";

import ModalModificationApprenti from "../modal/ModalModificationApprenti";
import { request } from "../../../utils/request";
import { getNomUser } from "../../../utils/divers";
import useArray from "../../../hooks/useArray";
import { Pen } from "react-bootstrap-icons";

export function Apprentis() {
    const [promotions, setPromotions] = useState([]);
    const [filtres, setFiltre, setFiltres] = useArray();

    const [data, setData] = useState([]);
    const [currentRow, setCurrentRow] = useState();
    const filteredData = useMemo(() => {
        let filtered = data;
        const filtrePromotion = parseInt(filtres.promotion);
        const filtreNom = filtres.nom?.toLowerCase() || "";

        // filtre par promotion
        if (filtrePromotion) {
            if (filtrePromotion === -1) filtered = filtered.filter(row => !row.promotion?.id); // sans promotion
            else filtered = filtered.filter(row => row.promotion?.id === filtrePromotion);
        }

        if (filtreNom) {
            filtered = filtered.filter(row => getNomUser(row.utilisateur).toLowerCase().includes(filtreNom));
        }

        return filtered;
    }, [data, filtres]);

    const [showModif, setShowModif] = useState();

    useEffect(() => {
        request('/apprentidetail', 'get')
            .then(res => setData(res.data));

        request("/promotion/")
            .then((res) => {
                const data = [{ value: "-1", label: "Sans promotion" }];

                (res.data || []).map((row) => data.push({
                    value: row.id + '',
                    label: `${row.libelle} (${row.semestre})`,
                }));

                return data;
            })
            .then(data => setPromotions(data));
    }, []);

    return <Stack>
        <Title order={3}>Apprentis</Title>

        {/* Modal de modification */}
        <ModalModificationApprenti
            show={showModif}
            close={() => setShowModif(false)}
            row={currentRow}
        />

        <Group align="end">
            {/* Btn ajout */}
            <Button onClick={() => setShowAdd(true)} w="max-content">
                Ajouter un(e) apprenti(e)
            </Button>

            {/* Filtres promotion */}
            <Select
                label="Promotion"
                data={promotions}
                clearable
                placeholder="Sélectionnez une promotion"
                value={filtres.promotion}
                onChange={selected => setFiltre('promotion', selected)}
            />

            {/* Filtres nom */}
            <TextInput
                label="Nom"
                placeholder="Saisissez un nom"
                value={filtres.nom}
                onChange={e => setFiltre('nom', e.target.value)}
            />
        </Group>

        {/* Tableau */}
        <Table striped highlightOnHover withTableBorder>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Nom</Table.Th>
                    <Table.Th>Promotion</Table.Th>
                    <Table.Th>Tuteur</Table.Th>
                    <Table.Th>Maitre d'Alternance</Table.Th>
                    <Table.Th w="6vw">Modifier</Table.Th>
                </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
                {
                    filteredData.length < 1 && <Table.Tr>
                        <Table.Td colSpan={5} ta="center">
                            Aucun apprenti
                        </Table.Td>
                    </Table.Tr>
                }

                {
                    filteredData.map(row => {
                        if (!row.id) return;

                        return <Table.Tr>
                            <Table.Td>{getNomUser(row.utilisateur)}</Table.Td>
                            <Table.Td>{row.promotion?.libelle}</Table.Td>
                            <Table.Td>{getNomUser(row.tuteurPedagogique?.utilisateur)}</Table.Td>
                            <Table.Td>{getNomUser(row.maitreAlternance?.utilisateur)}</Table.Td>
                            <Table.Td>
                                <Button onClick={() => {
                                    setShowModif(true);
                                    setCurrentRow(row);
                                }}><Pen /></Button>
                            </Table.Td>
                        </Table.Tr>
                    })
                }
            </Table.Tbody>
        </Table>
    </Stack>
}

export default Apprentis;

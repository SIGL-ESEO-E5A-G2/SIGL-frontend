import { useEffect, useMemo, useState } from "react";
import { CalendarPlus, Pen } from "react-bootstrap-icons";
import { Button, Group, Select, Stack, Table, TextInput, Title } from "@mantine/core";

import { ModalPlannificationSoutenance } from "../modal/ModalSoutenance";
import ModalModificationApprenti from "../modal/ModalModificationApprenti";

import { request } from "../../../utils/request";
import { getNomUser, updateRow, userToLabel } from "../../../utils/divers";
import useArray from "../../../hooks/useArray";

export function Apprentis() {
    const [tuteurs, setTuteurs] = useState([]);
    const [maitreAlternances, setMaitresAlternances] = useState([]);

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
    const [showPlannSoutenance, setShowPlannSoutenance] = useState();

    useEffect(() => {
        // load apprentis
        request('/apprentidetail', 'get')
            .then(res => setData(res.data));

        // load MA
        request("/maitrealternancedetail/")
            .then(({ data }) => setMaitresAlternances(userToLabel(data)));

        // load tuteur
        request("/tuteurpedagogiquedetail/")
            .then(({ data }) => setTuteurs(userToLabel(data)));

        // load promos
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
            tuteurs={tuteurs}
            maitreAlternances={maitreAlternances}
            promotions={promotions}
            callback={(row) => updateRow(row, setData)}
        />

        {/* Modal de plannification de soutenance */}
        <ModalPlannificationSoutenance
            show={showPlannSoutenance}
            close={() => setShowPlannSoutenance(false)}
            row={currentRow}
        />

        <Group align="end">
            {/* Btn ajout */}
            {/* <Button onClick={() => setShowAdd(true)} w="max-content">
                Ajouter un(e) apprenti(e)
            </Button> */}

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
                    {/* <Table.Th w="6vw">Plannifier une soutenance</Table.Th> */}
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
                            {/* <Table.Td>
                                <Button onClick={() => {
                                    setShowPlannSoutenance(true);
                                    setCurrentRow(row);
                                }}><CalendarPlus /></Button>
                            </Table.Td> */}
                        </Table.Tr>
                    })
                }
            </Table.Tbody>
        </Table>
    </Stack>
}

export default Apprentis;

import '../../css/calendar.css';

import { Button, Group, Paper, Divider, Table, TextInput } from "@mantine/core";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";

import { capitalize } from '../../utils/divers';
import { getDayName, getSimpleDate } from "../../utils/formatDate";

const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

export function Calendar() {
    const hourStart = 8;
    const hourEnd = 19;
    const arrayHours = new Array(hourEnd - hourStart).fill(0).map((_, index) => index + hourStart);

    const [date, setDate] = useState(new Date(getSimpleDate(new Date())));
    const dateToString = useMemo(() => getSimpleDate(date), [date]);
    const isToTodayBtnDisabled = useMemo(() => {
        const today = new Date(getSimpleDate(new Date()));
        return date.getTime() === today.getTime();
    }, [date]);
    const dates = useMemo(() => {
        const currentDayName = getDayName(date);
        const selectedIndex = jours.findIndex(jour => jour.toLowerCase() === currentDayName);

        return jours.map((jour, index) => {
            const currentDate = new Date(date);
            currentDate.setDate(currentDate.getDate() + index - selectedIndex);
            return currentDate;
        });
    }, [date]);

    function addDay(old) {
        old.setDate(old.getDate() + 1);
        setDate(new Date(old));
    }

    function removeDay(old) {
        old.setDate(old.getDate() - 1);
        setDate(new Date(old));
    }

    function goToToday() {
        setDate(new Date(getSimpleDate(new Date())));
    }

    return <Paper shadow="md" radius="xl" h="85vh">
        {/* Header */}
        <Group justify="space-between" p="md">
            <Button color="red" disabled={isToTodayBtnDisabled} onClick={goToToday}>Aujourd'hui</Button>

            <Group p="md">
                <Button variant="light" radius="xl" onClick={() => removeDay(date)}><ChevronLeft /></Button>

                <TextInput
                    type="date"
                    value={dateToString}
                    onChange={e => setDate(e.target.value ? new Date(e.target.value) : new Date())}
                />

                <Button variant="light" radius="xl" onClick={() => addDay(date)}><ChevronRight /></Button>
            </Group>

            <Button.Group>
                <Button variant="light" disabled>Mois</Button>
                <Button variant="light">Semaine</Button>
                <Button variant="light" disabled>Jour</Button>
            </Button.Group>
        </Group>

        <Divider />

        <Group p="md" w="100%" h="70vh">
            <Table w="100%" h="100%" horizontalSpacing="sm">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th></Table.Th>
                        {
                            dates.map(currentDate => <Table.Th ta="center">
                                {capitalize(getDayName(currentDate))} {currentDate.getDate()}/{currentDate.getMonth() + 1}
                            </Table.Th>)
                        }
                    </Table.Tr>
                </Table.Thead>

                <Table.Tbody>
                    {
                        arrayHours.map(hour => <Table.Tr>
                            <Table.Td>{hour}h</Table.Td>
                            {
                                dates.map((currentDate, index) => {
                                    const isWeekEnd = index >= dates.length - 2;
                                    return <Table.Td className={isWeekEnd ? "calendar-off-day" : ""}>

                                    </Table.Td>
                                })
                            }
                        </Table.Tr>)
                    }
                </Table.Tbody>
            </Table>
        </Group>
    </Paper>
}
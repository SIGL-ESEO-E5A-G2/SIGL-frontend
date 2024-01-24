import '../../css/calendar.css';

import { Button, Group, Paper, Divider, TextInput, Text, Stack, Title, Center } from "@mantine/core";
import { useContext, useEffect, useMemo, useState } from "react";
import { CalendarPlus, ChevronLeft, ChevronRight, Pen } from "react-bootstrap-icons";

import { capitalize, getMonday, getNomUser } from '../../utils/divers';
import { getDayName, getSimpleDate } from "../../utils/formatDate";
import { ModalNewEvent } from './modal/ModalNewEvent';
import { request } from '../../utils/request';
import { UserContext } from '../../context/UserContext';
import { userHasRole } from '../../utils/userRights';
import { getApprentis } from '../../utils/api';
import { ModalEditNotes } from './modal/ModalEditNotes';

const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

export function Calendar() {
    const [apprentis, setApprentis] = useState([]);

    const [showModalEditNote, setShowModalEditNote] = useState();
    const [showPopup, setShowPopup] = useState();

    const [events, setEvents] = useState([]);
    const [currentEventId, setCurrentEventId] = useState();
    const [date, setDate] = useState(new Date(getSimpleDate(new Date())));
    const dateToString = useMemo(() => getSimpleDate(date), [date]);
    const isToTodayBtnDisabled = useMemo(() => {
        const today = getMonday(getSimpleDate(new Date()));
        return date.getTime() === today.getTime();
    }, [date]);
    const dates = useMemo(() => {
        const currentDayName = getDayName(date);
        const selectedIndex = jours.findIndex(jour => jour.toLowerCase() === currentDayName);

        const dates = jours.map((jour, index) => {
            const currentDate = new Date(date);
            currentDate.setDate(currentDate.getDate() + index - selectedIndex);
            return currentDate;
        });

        // select le 1er jour de la semaine
        if (dates[0].getTime() !== date.getTime()) {
            setDate(dates[0]);
        }

        return dates;
    }, [date]);

    const user = useContext(UserContext);
    const isApprenti = userHasRole(user, [1]);
    const isTuteur = userHasRole(user, [2]);

    useEffect(() => {
        getApprentis(user)
            .then(apprentis => {
                console.log("TAG apprentis", apprentis)
                return apprentis;
            })
            .then(apprentis => {
                setApprentis(apprentis);
                return apprentis.filter(apprenti => apprenti).map(apprenti => apprenti.id);
            })
            .then(apprentiIds => request("/entretiensemestrieldetail", 'get')
                .then(res => (res.data || [])
                    .filter(entretien => apprentiIds.includes(entretien?.evenement?.apprenti?.id)))
            )
            .then(entretiens => setEvents(entretiens));
    }, []);

    function updateNote(eventId, note) {
        setEvents(old => {
            const index = old.findIndex(item => item.id === eventId);

            if (index < 0) return old;

            old[index] = {
                ...old[index],
                noteSemestre: note
            };

            return [...old];
        })
    }

    function getAllEventsAttDate(date) {
        const dateTime = date?.getTime();
        return events?.filter(event => new Date(event?.evenement?.dateDebut)?.getTime() === dateTime);
    }

    function addDay(old) {
        old.setDate(old.getDate() + 7);
        setDate(new Date(old));
    }

    function removeDay(old) {
        old.setDate(old.getDate() - 7);
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

        <Stack p="md" w="100%" h="70vh">
            {/* Version box */}
            <Group grow w="100%" h="100%">
                {
                    dates.map((currentDate, index) => <Stack w="100%" h="100%">
                        <Text ta="center">
                            {capitalize(getDayName(currentDate))} {currentDate.getDate()}/{currentDate.getMonth() + 1}
                        </Text>

                        <Stack w="100%" h="100%">
                            {
                                getAllEventsAttDate(currentDate)
                                    .map(({ id, noteSemestre, evenement }) => <div className={'event ' + evenement.libelle}>
                                        {!isApprenti && <Text fs="italic" size='sm'>{getNomUser(evenement.apprenti?.utilisateur)}</Text>}
                                        <Stack gap="4px">
                                            <Title order={4}>{evenement.libelle}</Title>
                                            <Text>{evenement.description}</Text>
                                            <Center>
                                                <Text><b>Note:</b> {noteSemestre >= 0 ? noteSemestre : "Pas encore noté"}</Text>
                                                {/* Btn modif note */}
                                                {
                                                    isTuteur && <Button
                                                        m="0 0 0 5px"
                                                        variant='light'
                                                        color="white"
                                                        onClick={() => {
                                                            setShowModalEditNote(true);
                                                            setCurrentEventId(id);
                                                        }}
                                                        size="compact-sm"
                                                    ><Pen /></Button>
                                                }
                                            </Center>
                                        </Stack>
                                    </div>)
                            }

                            <Paper className={index > 4 ? "calendar-off-day" : ""} w="100%" h="100%" />
                        </Stack>
                    </Stack>)
                }
            </Group>
        </Stack>

        {/* Modal modif note */}
        <ModalEditNotes
            show={showModalEditNote}
            close={() => setShowModalEditNote(false)}
            rowId={currentEventId}
            callback={updateNote}
        />

        {/* Modal ajout event */}
        <ModalNewEvent
            show={showPopup}
            close={() => setShowPopup(false)}
            apprenti={apprentis ? apprentis[0] : null}
            callback={(event) => setEvents(old => [...old, event])} // TODO
        />

        {/* Btn ajouter event */}
        {
            isApprenti && <Button
                onClick={() => setShowPopup(true)}
                radius="xl"
                size="lg"
                color="red"
                className="round-button"
                rightSection={<CalendarPlus />}
            >
                Nouvel évènement
            </Button>
        }
    </Paper>
}
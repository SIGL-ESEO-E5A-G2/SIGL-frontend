import '../../css/grille.css';

import { useContext, useEffect, useState } from "react";
import { Accordion, Button, Flex, Group, Paper, Select, Stack, Text, TextInput, Title, Tooltip } from "@mantine/core";
import { QuestionCircle } from "react-bootstrap-icons";

import { request } from "../../utils/request";
import { UserContext } from "../../context/UserContext";
import { etatCompetences, semestersData } from "../../data/constantes";
import { userHasRole } from '../../utils/userRights';
import { withNotification } from '../../utils/divers';


export function GrilleEvaluation() {
    const user = useContext(UserContext);
    const isTuteur = userHasRole(user, [2]);
    const isMA = userHasRole(user, [5]);
    const isApprenti = userHasRole(user, [1]);

    const [apprentis, setApprentis] = useState([]);
    const [apprentiSelectedId, setApprentiSelectedId] = useState(isApprenti ? user.id : null);

    const [semestres, setSemestres] = useState();
    const [competences, setCompetences] = useState();

    const [key, setKey] = useState();

    useEffect(() => {
        if (isApprenti) return;

        if (isMA) {
            request(`/maitrealternanceutilisateurdetail?utilisateur=${user.id}`, "get")
                .then(res => res.data?.length > 0 && res.data[0].apprentis?.length > 0 ? res.data[0].apprentis[0] : null)
                .then(apprenti => setApprentiSelectedId(apprenti?.utilisateur));

        } else if (isTuteur) {
            request(`/tuteurpedagogiqueutilisateurdetail?utilisateur=${user.id}`, "get")
                .then(res => res.data?.length > 0 ? res.data[0].apprentis : [])
                .then(async apprentis => {

                    if (apprentis.length === 1) {
                        setApprentiSelectedId(apprentis[0].id);
                    } else if (apprentis.length > 0) {
                        const usersApprentis = await Promise.all(
                            apprentis.map(apprenti => request(`/utilisateur/${apprenti.utilisateur}`, 'get')
                                .then(res => res.data))
                        );

                        console.log("TAG apprentis", usersApprentis)

                        setApprentis(usersApprentis.map(apprenti => ({
                            ...apprenti,
                            value: apprenti.id + "",
                            label: ((apprenti.prenom || "") + " " + (apprenti.nom || "")).trim()
                        })))
                    }
                });
        }
    }, []);

    useEffect(() => {
        if (!apprentiSelectedId) return;

        request(`/apprentiutilisateurdetail?utilisateur=${apprentiSelectedId}`, 'get')
            .then(res => res.data ? res.data[0] : null)
            .then(apprenti => {
                if (!apprentis.find(userApprenti => userApprenti.id === apprenti.id)) {
                    setApprentis(old => [...old, apprenti.utilisateur]);
                }

                setKey(apprenti.promotion?.semestre);

                return apprenti;
            })
            .then((apprenti) => request(`/grilleevaluation/${apprenti.grilleEvaluation}`, 'get'))
            .then(({ data }) => {
                const competences = [];
                const semestres = {};

                Object.entries(data).map(([key, value]) => {
                    if (key.startsWith('competenceApprenti_')) {
                        value.forEach(semestreGrille => {
                            const nomSemestre = semestreGrille.semestre;

                            if (!semestres[nomSemestre]) semestres[nomSemestre] = [];
                            semestres[nomSemestre].push(semestreGrille);
                        })
                    }
                    else if (key.startsWith('competence_')) competences.push(value);
                });

                setCompetences(competences);
                setSemestres(semestres);
            });
    }, [apprentiSelectedId]);

    const apprentiSelected = apprentiSelectedId && apprentis.length > 0 ? apprentis.find(userApprenti => userApprenti.id === apprentiSelectedId) : null;

    return <Stack gap="lg">
        {
            apprentis.length > 1 && <Select
                label="Apprentis"
                data={apprentis}
                onChange={selected => setApprentiSelectedId(parseInt(selected))}
            />
        }

        {
            !isApprenti && apprentiSelected && <Paper shadow="md" p="md">
                <Group>
                    <Text>Apprenti:</Text>
                    <Text fw="bold">{((apprentiSelected.prenom || "") + " " + (apprentiSelected.nom || "")).trim()}</Text>
                </Group>
            </Paper>
        }

        <Accordion value={key} variant="separated" className="grille-evaluation">
            {
                semestersData.map(semestre => {
                    const grille = semestres ? semestres["S" + semestre.numero] : null;
                    const currentKey = "S" + semestre.numero;

                    const handleClick = () => setKey(old => {
                        if (old === currentKey) return null;
                        else return currentKey;
                    })

                    if (grille)
                        return <GrilleItem
                            numero={semestre.numero}
                            color={semestre.color}
                            grille={grille}
                            competences={competences}
                            isTuteur={isTuteur}
                            onClick={handleClick}
                        />
                    else return <ProxyGrilleItem
                        numero={semestre.numero}
                        color={semestre.color}
                        onClick={handleClick}
                    />
                })
            }
        </Accordion>
    </Stack>
}

function ProxyGrilleItem({ numero, color, onClick }) {
    return <Accordion.Item
        key={numero}
        value={"S" + numero}
        style={{ backgroundColor: color }}
    >
        <Accordion.Control onClick={onClick}>
            Semestre {numero}
        </Accordion.Control>

        <Paper shadow="md" ta="center">
            <Accordion.Panel>
                En cours de chargement ...
            </Accordion.Panel>
        </Paper>
    </Accordion.Item>
}

function GrilleItem({ numero, color, onClick, isTuteur, grille, competences }) {
    function handleSubmit(e) {
        e.preventDefault();

        const target = e.target;
        const submit = competences.map((competence, idx) => {
            const competenceGrille = grille.find(val => val.competence === competence.id);

            return {
                id: competenceGrille.id,
                evaluation: target['status' + idx]?.value,
                commentaire: target['commentaire' + idx]?.value
            }
        });

        async function sendAll() {
            await Promise.all(submit
                .map(competence => request(`/competenceapprenti/${competence.id}`, "patch", competence))
            );
        }

        withNotification(sendAll, {
            title: "Grille d'évaluation",
            message: "La grille d'évaluation est en cours d'enregistrement",
            messageSuccess: "La grille d'évaluation a été enregistrée",
            messageError: "Une erreur est survenue",
        });
    }

    return <Accordion.Item
        key={numero}
        value={"S" + numero}
        style={{ backgroundColor: color }}
    >
        <Accordion.Control onClick={onClick}>
            Semestre {numero}
        </Accordion.Control>

        <Paper shadow="md">
            <Accordion.Panel>
                <form onSubmit={handleSubmit}>
                    <Stack p="sm">
                        {
                            competences?.map((competence, idx) => {
                                const competenceGrille = grille.find(val => val.competence === competence.id);

                                return <Paper p="sm" className="grille-competence">
                                    <Group grow>
                                        {/* Title */}
                                        <Flex>
                                            <Title order={3}>{competence.libelle}</Title>
                                            <Tooltip
                                                label={competence.description}
                                                position="bottom"
                                                w="20vw"
                                                multiline
                                            >
                                                <Button variant="transparent">
                                                    <QuestionCircle size="1rem" />
                                                </Button>
                                            </Tooltip>
                                        </Flex>

                                        {/* Status */}
                                        <GrilleDetail
                                            label="Status"
                                            isTuteur={isTuteur}
                                            edit={<Select
                                                name={"status" + idx}
                                                data={etatCompetences}
                                                defaultValue={competenceGrille.evaluation}
                                            />}
                                        >
                                            <Competence>{competenceGrille.evaluation}</Competence>
                                        </GrilleDetail>

                                        {/* Détaille */}
                                        <GrilleDetail
                                            label="Commentaires"
                                            isTuteur={isTuteur}
                                            edit={<TextInput name={"commentaire" + idx} defaultValue={competenceGrille.commentaire} />}
                                        >
                                            <Text>{competenceGrille.commentaire}</Text>
                                        </GrilleDetail>
                                    </Group>
                                </Paper>
                            })
                        }

                        {isTuteur && <Button type='submit'>Enregistrer</Button>}
                    </Stack>
                </form>
            </Accordion.Panel>
        </Paper>
    </Accordion.Item>
}

function GrilleDetail({ label, isTuteur, edit, children }) {
    return <Stack p="sm" className="detail-competence">
        <Text fw="bold">{label}</Text>
        {isTuteur ? edit : children}
    </Stack>
}

function Competence({ children }) {
    const acquis = etatCompetences.findIndex(etat => children === etat);

    return <Text c={acquis === 0 ? "red" : (acquis === 1 ? "orange" : (acquis === 2 ? "green" : "inherit"))}>
        {children}
    </Text>
}

export default GrilleEvaluation;

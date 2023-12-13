import { useEffect, useMemo, useState } from 'react';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import { semestersList } from '../../data/constantes';
import { request } from '../../utils/request';

export default function ({ }) {
    const [optionsApprentis, setOptionsApprentis] = useState([]);
    const [optionsEvaluations, setOptionsEvaluations] = useState([]);
    const [semestreSelected, setSemestreSelected] = useState();

    const [competences, setCompetences] = useState([
        {
            Libelle: "Concevoir",
            semestre: "S7",
            description: "concevoir un S.I.",
            commentaire: "Point sur l'eleve"
        }
    ]);

    const competencesFiltered = useMemo(() => {
        let filtered = competences;

        if (semestreSelected && semestreSelected !== "all") {
            filtered = filtered.filter(competence => competence.semestre === semestreSelected);
        }

        return filtered;
    }, [competences, semestreSelected]);

    useEffect(() => {
        // TODO load apprentis
        // TODO load options evaluation
        // TODO load competences
    }, []);

    return <Row>
        <Row>
            <Col>
                <Form.Group>
                    <Form.Label>Apprenti</Form.Label>
                    <Form.Select>
                        {
                            optionsApprentis.map(apprenti => <option
                                value={apprenti.id}
                            >
                                {apprenti.prenom + " " + apprenti.nom}
                            </option>)
                        }
                    </Form.Select>
                </Form.Group>
            </Col>

            <Col>
                <Form.Group>
                    <Form.Label>Semestre</Form.Label>
                    <Form.Select onChange={(e) => {
                        console.log("TAG select", e.target.value)
                        setSemestreSelected(e.target.value);
                    }}>
                        <option value={"all"}>Tous</option>
                        {
                            semestersList.map(semestre => <option value={semestre}>{semestre}</option>)
                        }
                    </Form.Select>
                </Form.Group>
            </Col>
        </Row>

        <br />

        <Row>
            {
                competencesFiltered.map(competence => {
                    if (!competence.Libelle) return;
                    return <CompetenceComponent
                        competence={competence}
                        optionsEvaluations={optionsEvaluations}
                    />
                })
            }
        </Row>
    </Row>
}

function CompetenceComponent({ competence, optionsEvaluations }) {
    const [commentaire, setCommentaire] = useState("");
    const [notationSelected, setNotationSelected] = useState();

    return <Form
        onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();

            request('/TODO');
        }}
    >
        <Row>
            <Col>
                <h3>{competence.Libelle}</h3>
                <p>{competence.semestre}</p>
                <small>{competence.description}</small>
            </Col>

            <Col>
                <Form.Group>
                    <Form.Label>Commentaire</Form.Label>
                    <Form.Control
                        defaultValue={competence.commentaire}
                        onChange={(e) => setCommentaire(e.target.value)}
                        as="textarea" rows={3}
                    />
                </Form.Group>
            </Col>

            <Col>
                <Form.Group>
                    <Form.Label>Notation</Form.Label>
                    <Form.Select>
                        {
                            optionsEvaluations.map(optionEval => <option
                                value={optionEval}
                                selected={optionEval === notationSelected}
                                onClick={() => setNotationSelected(optionEval)}
                            >
                                {optionEval}
                            </option>)
                        }
                    </Form.Select>
                </Form.Group>
            </Col>
        </Row>

        <Row>
            <div style={{ marginLeft: "auto", width: "max-content" }}>
                <Button>Enregistrer</Button>
            </div>
        </Row>
    </Form>
}
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container, Stack } from "react-bootstrap";

/**
 * 
 * @param {{children: [{link: string, icon, nom: string, disabled: boolean}]}} props 
 * @returns 
 */
export default function ({
    children = []
}) {
    const items = useMemo(() => {
        const filteredChildrens = children.filter(child => child && !child.disabled);
        const rows = [];

        filteredChildrens.forEach((child, idx) => {
            if (idx % 4 == 0) rows.push([child, null, null, null]);
            else rows[Math.floor(idx / 4)][idx % 4] = child;
        });

        return rows;
    }, []);

    return <Container>
        {
            items.map(row => <Row>
                {
                    row.map(column => <Col>
                        {
                            column && <Link to={column.link}>
                                <Stack gap={3} style={{ width: "100%", textAlign: "center" }}>
                                    {
                                        column.icon ? <column.icon size="200px" color="lightslategray" className="mx-auto" />
                                            : <div
                                                style={{
                                                    width: "200px",
                                                    height: "200px",
                                                    borderRadius: "7px",
                                                    margin: "auto",
                                                    backgroundColor: "lightgray"
                                                }}
                                            />
                                    }
                                    <p>{column.nom}</p>
                                </Stack>
                            </Link>
                        }
                    </Col>)
                }
            </Row>
            )
        }
    </Container>
}
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container, Stack } from "react-bootstrap";

const numberOfChildsPerLine = 4;

/**
 * 
 * @param {{children: [{link: string, icon, nom: string, disabled: boolean}]}} props 
 * @returns 
 */
export default function ({
    children = []
}) {
    const items = useMemo(() => {
        const rows = [];

        children.forEach((child, idx) => {
            if (idx % numberOfChildsPerLine == 0) {
                const newLine = Array(numberOfChildsPerLine).fill(null);
                newLine[0] = child;
                rows.push(newLine);
            }
            else rows[Math.floor(idx / numberOfChildsPerLine)][idx % numberOfChildsPerLine] = child;
        });

        return rows;
    }, []);

    return <Container>
        {
            items.map(row => <Row style={{ height: "max-content" }}>
                {
                    row.map(column => <Col>
                        {
                            column && <Link to={column.path}>
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
                                    <p>{column.name}</p>
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
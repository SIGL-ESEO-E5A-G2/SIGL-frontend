import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Group, Stack } from "@mantine/core";

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

    return <Stack style={{ zIndex: "-1" }}>
        {
            items.map(row => <Group justify="center" grow>
                {
                    row.map(column => <div style={{ width: "max-content" }}>
                        {
                            column && <Link to={column.path}>
                                <div style={{ textAlign: "center" }}>
                                    {
                                        column.icon ? <column.icon size="200px" color="var(--mantine-color-blue-3)" className="mx-auto" />
                                            : <div
                                                style={{
                                                    width: "200px",
                                                    height: "200px",
                                                    borderRadius: "7px",
                                                    margin: "auto",
                                                    backgroundColor: "var(--mantine-color-blue-0)"
                                                }}
                                            />
                                    }
                                    <p>{column.name}</p>
                                </div>
                            </Link>
                        }
                    </div>)
                }
            </Group>
            )
        }
    </Stack>
}
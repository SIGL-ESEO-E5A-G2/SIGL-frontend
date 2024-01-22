
import { Accordion } from "@mantine/core";
import ManageUsers from "./listing/ManageUsers";
import Tags from "./listing/Tags";

export default function () {
    return <Accordion variant="separated" color="blue">
        <Accordion.Item value="tags">
            <Accordion.Control>Tags</Accordion.Control>
            <Accordion.Panel p="md">
                <Tags />
            </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="users">
            <Accordion.Control>Utilisateurs</Accordion.Control>
            <Accordion.Panel p="md">
                <ManageUsers />
            </Accordion.Panel>
        </Accordion.Item>
    </Accordion>
}
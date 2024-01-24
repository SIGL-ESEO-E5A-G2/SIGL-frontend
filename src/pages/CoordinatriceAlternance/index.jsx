import React, { useContext } from 'react';
import { Accordion } from "@mantine/core";

import { UserContext } from "../../context/UserContext";
import DynamicFormTutoralTeam from "./form/DynamicFormTutoralTeam";
import DynamicFormPlanningDates from "./form/DynamicFormPlanningDates";
import TeamAssociationForm from "./form/TeamAssociationForm";

export default function () {
    const user = useContext(UserContext);

    return (
        <Accordion variant="separated" color="blue">
            {/* <div>
            <TeamAssociationForm />
        </div> */}

            <Accordion.Item value="equipe-tutorale">
                <Accordion.Control>Ajouter des membres à l'équipe tutorale</Accordion.Control>
                <Accordion.Panel p="md">
                    <DynamicFormTutoralTeam />
                </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="echeances">
                <Accordion.Control>Saisie des échéances par promotion</Accordion.Control>
                <Accordion.Panel p="md">
                    <DynamicFormPlanningDates user={user} />
                </Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    );
}

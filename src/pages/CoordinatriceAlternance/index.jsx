import React, { useState, useEffect } from 'react';
import DynamicFormTutoralTeam from "./form/DynamicFormTutoralTeam";
import DynamicFormPlanningDates from "./form/DynamicFormPlanningDates";
import TeamAssociationForm from "./form/TeamAssociationForm";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function () {
    const user = useContext(UserContext);
    return (
        <>
        <div>
            <TeamAssociationForm />
        </div>

        <div>
            <DynamicFormTutoralTeam />
        </div>

        <div>
            <DynamicFormPlanningDates user={user}/>
        </div>
        </>
    );
}

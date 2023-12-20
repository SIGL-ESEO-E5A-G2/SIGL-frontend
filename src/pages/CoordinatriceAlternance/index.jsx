import React, { useState, useEffect } from 'react';
import DynamicFormTutoralTeam from "./form/DynamicFormTutoralTeam";
import DynamicFormPlanningDates from "./form/DynamicFormPlanningDates";
import TeamAssociationForm from "./form/TeamAssociationForm";
import {request} from '../../utils/request.js';

export default function ({
    
}) {
    return <>

        
        <div>
            <TeamAssociationForm />
        </div>

        <div>
            <DynamicFormTutoralTeam />
        </div>

        <div>
            <DynamicFormPlanningDates />
        </div>
    </>
}

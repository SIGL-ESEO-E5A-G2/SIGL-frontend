import React from 'react';
import DynamicFormTutoralTeam from "../../components/DynamicFormTutoralTeam";
import DynamicFormPlanningDates from "../../components/DynamicFormPlanningDates";
export default function ({
    
}) {
    return <>
        <h2 class="text-center mt-3">Associer apprenti à l'équipe tutorale</h2>
        <form class="m-5"method="post">
            <div class="form-group">
                <label for="apprenti">Apprenti :</label>
                <select class="form-select mb-lg-5" id="apprenti" name="apprenti">
                    <option value="Apprenti1">Apprenti1</option>
                    <option value="Apprenti2">Apprenti2</option>
                    <option value="Apprenti3">Apprenti3</option>
                </select>
                <label for="MA">Maitre d'apprentissage :</label>
                <select class="form-select mb-lg-5" id="MA" name="rMAole">
                    <option value="nomApprenti1">Apprenti1</option>
                    <option value="Apprenti2">Apprenti2</option>
                    <option value="Apprenti3">Apprenti3</option>
                </select>
                <label for="tuteur">Apprenti :</label>
                <select class="form-select mb-lg-5" id="tuteur" name="tuteur">
                    <option value="nomApprenti1">Apprenti1</option>
                    <option value="Apprenti2">Apprenti2</option>
                    <option value="Apprenti3">Apprenti3</option>
                </select>
            </div>
    
            <input class="btn btn-primary btn-lg btn-block" type="submit" value="Associer"/>
        </form>

        <h2 class="text-center mt-3">Créer un journal de formation</h2>
        <form class="m-5"method="post">
            <div class="form-group">
                <label for="apprenti">Apprenti :</label>
                <select class="form-select mb-lg-5" id="apprenti" name="apprenti">
                    <option value="nomApprenti1">Apprenti1</option>
                    <option value="Apprenti2">Apprenti2</option>
                    <option value="Apprenti3">Apprenti3</option>
                </select>
            </div>        
            <input class="btn btn-primary btn-lg btn-block" type="submit" value="Créer le journal"/>
        </form>

        <div>
            <DynamicFormTutoralTeam />
        </div>

        <div>
            <DynamicFormPlanningDates />
        </div>
    </>
}

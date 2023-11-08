
export default function ({

}) {
    return <>
        <h2 class="text-center mt-3">Associer apprenti à l'équipe tutorale</h2>
        <form class="m-5"method="post">
            <div class="form-group">
                <label for="role">Apprenti :</label>
                <select class="form-select mb-lg-5" id="role" name="role">
                    <option value="nomApprenti1">Apprenti1</option>
                    <option value="Apprenti2">Apprenti2</option>
                    <option value="Apprenti3">Apprenti3</option>
                </select>
            </div>
            <div class="form-group">
                <label for="nom">Equipe tutorale :</label>
                <input class="form-control" type="text" id="nom" name="nom" required/>
            </div>            
            <input class="btn btn-primary btn-lg btn-block" type="submit" value="Associer"/>
        </form>
    </>
}
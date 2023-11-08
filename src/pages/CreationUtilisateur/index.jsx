
export default function ({

}) {
    return <>
        <h2 class="text-center mt-3">Création d'utilisateur</h2>
        <form class="m-5"method="post">
            <div class="form-group">
                <label for="nom">Nom :</label>
                <input class="form-control" type="text" id="nom" name="nom" required/>
            </div>

            <div class="form-group">
                <label for="prenom">Prénom :</label>
                <input class="form-control" type="text" id="prenom" name="prenom" required/>
            </div>

            <div class="form-group">
                <label for="email">Email :</label>
                <input  class="form-control" type="email" id="email" name="email" required/>
            </div>

            <div class="form-group">
            <label for="role">Rôle :</label>
                <select class="form-select mb-lg-5" id="role" name="role">
                    <option value="utilisateur">Utilisateur</option>
                    <option value="administrateur">Administrateur</option>
                    <option value="modérateur">Modérateur</option>
                </select>
            </div>
            <input class="btn btn-primary btn-lg btn-block" type="submit" value="Créer l'utilisateur"/>
        </form>
    </>
}
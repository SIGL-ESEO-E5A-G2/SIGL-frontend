
export default function ({

}) {
    return <>
        <h2 class="text-center mt-3">Créer journal de formation</h2>
        <form class="m-5"method="post">
            <div class="form-group">
                <label for="promo">Promo :</label>
                <select class="form-select mb-lg-5" id="role" name="promo">
                    <option value="e3a">e3a</option>
                    <option value="e4a">e4a</option>
                    <option value="e5a">e5a</option>
                </select>
            </div>        
            <input class="btn btn-primary btn-lg btn-block" type="submit" value="Associer"/>
        </form>
    </>
}
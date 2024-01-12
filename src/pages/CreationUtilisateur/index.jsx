import { TextInput, Select, Button } from "@mantine/core";

export default function () {
    return <>
        <h2 class="text-center mt-3">Création d'utilisateur</h2>
        <form class="m-5" method="post">
            <TextInput
                name="nom"
                label="Nom"
                required
            />

            <TextInput
                name="prenom"
                label="Prénom"
                required
            />

            <TextInput
                name="email"
                label="Email"
                type="email"
                required
            />

            <Select
                name="role"
                label="Rôle"
                data={[
                    { value: "utilisateur", label: "Utilisateur" },
                    { value: "administrateur", label: "Administrateur" },
                    { value: "modérateur", label: "Modérateur" },
                ]}
            />

            <Button type="submit">Créer l'utilisateur</Button>
        </form>
    </>
}
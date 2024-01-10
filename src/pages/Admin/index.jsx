import { Button, Select } from "@mantine/core";

export default function ({

}) {
    return <>
        <h2 className="text-center mt-3">Créer journal de formation</h2>
        <form className="m-5" method="post">
            <Select
                id="role"
                w="max-content"
                label="Promo"
                data={["e3a", "e4a", "e5a"]}
            />

            <Button type="submit">
                Associer
            </Button>
        </form>
    </>
}
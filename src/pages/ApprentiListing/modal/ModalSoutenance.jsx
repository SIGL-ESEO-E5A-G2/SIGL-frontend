import { Button, Group, Select, Stack, Text, TextInput } from "@mantine/core";
import Modal from "../../../components/Modal";
import { useState } from "react";

export function ModalPlannificationSoutenance({ show, close, row }) {
    const [errors, setError] = useState({});
    const [isCreateJury, setCreateJury] = useState();

    return <Modal
        opened={show}
        onClose={close}
        title="Plannifier une soutenance"

    >
        <Stack>
            <TextInput
                name="date-soutenance"
                type="date"
                label="Date soutenance"
                required
                error={errors.date}
            />

            <Group align="end">
                <Select
                    name="jury"
                    label="Jury"
                    placeholder="Sélectionnez un jury"
                    required
                    error={errors.jury}
                />

                <Text>OU</Text>

                <Button onClick={() => setCreateJury(true)}>Créer un jury</Button>
            </Group>


        </Stack>
    </Modal>
}
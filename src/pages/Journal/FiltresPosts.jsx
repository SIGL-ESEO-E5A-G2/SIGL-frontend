import { Button, Group, Select, Stack, TextInput } from "@mantine/core";
import SelectTags from "../../components/SelectTags";
import { useMemo } from "react";

export function FiltresPosts({ filtres, tags, setFiltre, resetFiltres }) {
    const tagsSelection = useMemo(() => {
        return [
            {
                id: "-1",
                value: "-1",
                label: "Aucun tag",
                couleur: "#000"
            },
            ...tags
        ];
    }, [tags]);

    return <Stack>
        <Group>
            {/* Tags filter */}
            <SelectTags
                tags={tagsSelection}
                placeholder="Sélectionnez des tags"
                value={filtres?.tags || []}
                setSelected={selected => setFiltre('tags', selected)}
            />

            {/* Title filter */}
            <TextInput
                label="Titre"
                placeholder="Entrez le titre du message"
                value={filtres?.titre || ""}
                onChange={e => setFiltre('titre', e.target.value)}
            />

            {/* Author filter */}
            <TextInput
                label="Auteur"
                placeholder="Entrez un nom"
                value={filtres?.createur || ""}
                onChange={e => setFiltre('createur', e.target.value)}
            />

            {/* Date filter */}
            <Group>
                <TextInput
                    label="Date"
                    type="date"
                    placeholder="Saisissez une date"
                    value={filtres?.date || ""}
                    onChange={e => setFiltre('date', e.target.value)}
                />

                <Select
                    label=" "
                    w="60px"
                    withCheckIcon={false}
                    data={[
                        { value: "1", label: "=" },
                        { value: "2", label: "<" },
                        { value: "3", label: ">" },
                    ]}
                    value={filtres?.dateOp || "1"}
                    onChange={selected => setFiltre('dateOp', selected)}
                />
            </Group>
        </Group>

        {/* Rest btn */}
        <Button onClick={resetFiltres} w="max-content">
            Enlever les filtres
        </Button>
    </Stack>
}

export function handleFilters(posts, filtres) {
    let postsFiltereds = [...posts];

    // filtre par titre
    if (filtres.titre?.trim()) {
        postsFiltereds = filtreTypeText(postsFiltereds, filtres, "titre");
    }

    // filtre par auteur
    if (filtres.createur?.trim()) {
        postsFiltereds = filtreTypeText(postsFiltereds, filtres, "createur");
    }

    // filtre par auteur
    if (filtres.date) {
        const typeOp = filtres.dateOp || "1";
        const selectedDate = (new Date(filtres.date)).getTime();

        postsFiltereds = postsFiltereds.filter(post => {
            const datePost = (new Date(post.date)).getTime();
            switch (typeOp) {
                case "2":
                    return datePost < selectedDate;
                case "3":
                    return datePost > selectedDate;
                default:
                    return datePost === selectedDate;
            }
        });
    }

    // filtre par tag
    if (filtres.tags?.length > 0) {
        const tagsSelected = filtres.tags?.map(id => parseInt(id));
        const isNoTagSelected = tagsSelected.includes(-1);

        postsFiltereds = postsFiltereds.filter(post => {
            if (post.tags?.length < 1 && isNoTagSelected) return true;

            return tagsSelected.some(tag => post.tags
                ?.map(({ id }) => id)
                ?.includes(tag));
        });
    }

    return postsFiltereds;
}

function filtreTypeText(postsFiltereds, filtres, key) {
    const selectedTitle = filtres[key]?.toLowerCase()?.trim();

    return postsFiltereds.filter(post => {
        return post[key]?.toLowerCase()?.includes(selectedTitle);
    });
}

export default FiltresPosts;

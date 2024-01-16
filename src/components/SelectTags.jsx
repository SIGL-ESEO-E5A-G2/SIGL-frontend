import { MultiSelect } from "@mantine/core";

function SelectTags({ tags, setSelected, ...props }) {
    return <MultiSelect
        label="Tags"
        searchable
        {...props}
        data={tags}
        onChange={selected => setSelected(selected)}
    />
}

export default SelectTags;

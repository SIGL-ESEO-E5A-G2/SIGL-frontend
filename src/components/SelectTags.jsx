import { useEffect, useState } from "react";
import { Badge, CloseButton, Combobox, Group, Input, InputBase, Text, useCombobox } from "@mantine/core";
import { X } from "react-bootstrap-icons";

function SelectTags({ tags, ...props }) {
    // return <MultiSelect
    //     label="Tags"
    //     searchable
    //     {...props}
    //     data={tags}
    //     onChange={selected => props.onChange(selected)}
    // />

    const [values, setValues] = useState([]);

    function resetValues() {
        setValues([]);

        if (props.onChange) {
            props.onChange([]);
        }
    }

    function addValue(value) {
        let newValues
        setValues(old => {
            newValues = [...old, value];
            return newValues;
        });

        if (props.onChange && newValues) {
            props.onChange(newValues);
        }
    }

    function removeValue(value) {
        let newValues
        setValues(old => {
            newValues = [...old.filter(tag => tag !== value)];
            return newValues;
        });

        if (props.onChange && newValues) {
            props.onChange(newValues);
        }
    }

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    useEffect(() => {
        if (JSON.stringify(values) !== JSON.stringify(props.value)) {
            setValues(props.value || []);
        }
    }, [props.value]);

    return <Combobox
        w="max-content"
        store={combobox}
        onOptionSubmit={(value) => {
            if (values.includes(value)) {
                removeValue(value);
            } else {
                addValue(value);
            }

            combobox.closeDropdown();
        }}
    >
        <div>
            <Text size="sm">{props.label || "Tags"}</Text>
            <Combobox.Target>
                <InputBase
                    component="button"
                    type="button"
                    pointer
                    rightSection={<Combobox.Chevron />}
                    rightSectionPointerEvents="none"
                    onClick={() => combobox.toggleDropdown()}
                >
                    {
                        values?.length > 0 ?
                            <Group gap="5px">
                                {
                                    values.map(value => <DisplayTag
                                        removeValue={() => removeValue(value)}
                                        {...tags.find(tag => tag.value === value)}
                                    />)
                                }
                                <CloseButton c="inherit" onClick={resetValues} />
                            </Group>
                            :
                            <Input.Placeholder w="max-content">{props.placeholder || "Sélectionnez des tags"}</Input.Placeholder>
                    }
                </InputBase>
            </Combobox.Target>
        </div>

        <Combobox.Dropdown>
            <Combobox.Options>
                {
                    tags
                        .filter(tag => !values.includes(tag.value))
                        .map((tag) => <OptionTag {...tag} />)
                }
            </Combobox.Options>
        </Combobox.Dropdown>
    </Combobox>
}

function DisplayTag({ id, couleur, label, removeValue }) {
    return <Badge color={couleur} key={id}>
        <Group gap="1px">
            {label}
            <div onClick={removeValue} style={{ display: "flex" }}>
                <X size="18px" style={{ justifyContent: "center" }} />
            </div>
            {/* <Button onClick={removeValue} size="20px" variant="transparent">X</Button> */}
        </Group>
    </Badge>
}

function OptionTag({ value, id, couleur, label }) {
    return <Combobox.Option value={value} key={id}>
        <Group>
            <div style={{
                borderRadius: "50%",
                width: "7px",
                height: "7px",
                backgroundColor: couleur
            }} />
            <Text>{label}</Text>
        </Group>
    </Combobox.Option>
}

export default SelectTags;

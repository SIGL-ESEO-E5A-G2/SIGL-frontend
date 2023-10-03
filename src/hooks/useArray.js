const { useState } = require("react");

export default function (baseValues = {}) {
    const [values, setValues] = useState(baseValues);

    function setValue(key, value) {
        setValues(old => {
            const newValue = isFunc(value) ? value(old[key]) : value;
            return { ...old, [key]: newValue }
        });
    }

    return [values, setValue, setValues];
}
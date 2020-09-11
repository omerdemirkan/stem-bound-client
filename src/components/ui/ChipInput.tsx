import { useState, LegacyRef, useEffect } from "react";
import {
    Chip,
    TextField,
    TextFieldProps,
    ChipTypeMap,
    IconButton,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import InputAdornment from "@material-ui/core/InputAdornment";

type Props = {
    value: string[];
    onChange(chips: string[]): void;
    TextFieldProps?: TextFieldProps;
    ChipProps?: ChipTypeMap<{}, "div">;
    onBlur?(): void;
    initialValues?: string[];
    name?: string;
    ref?: LegacyRef<HTMLInputElement>;
};

const ChipInput: React.FC<Props> = ({
    value,
    onChange,
    onBlur,
    name,
    ref,
    initialValues,
    TextFieldProps,
}) => {
    const [textField, setTextField] = useState<string>("");

    function handleCheckIconClicked() {
        if (!textField.length || value.includes(textField)) return;
        onChange([...value, textField]);
        setTextField("");
    }

    return (
        <>
            <TextField
                {...TextFieldProps}
                value={textField}
                onChange={(e) => setTextField(e.target.value)}
                onBlur={onBlur}
                InputProps={{
                    endAdornment: (
                        <InputAdornment {...({} as any)}>
                            <IconButton size="small">
                                <CheckIcon onClick={handleCheckIconClicked} />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            {value?.map((chip, index) => (
                <Chip
                    label={chip}
                    key={chip}
                    color="primary"
                    onDelete={() => onChange(value.filter((s) => s !== chip))}
                />
            ))}

            {}
        </>
    );
};

export default ChipInput;

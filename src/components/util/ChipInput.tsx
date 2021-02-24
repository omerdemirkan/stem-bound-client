import { useState, LegacyRef } from "react";
import CheckIcon from "@material-ui/icons/Check";
import Chip, { ChipProps } from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

interface IChipInputProps {
    value: string[];
    onChange(chips: string[]): void;
    TextFieldProps?: TextFieldProps;
    onBlur?(): void;
    ChipProps?: ChipProps;
    max?: number;
}

const ChipInput: React.FC<IChipInputProps> = ({
    value,
    onChange,
    onBlur,
    TextFieldProps,
    ChipProps,
    max,
}) => {
    const [textField, setTextField] = useState<string>("");
    const canAddMore = typeof max === "number" && value.length === max;
    function handleCheckIconClicked() {
        if (!textField.length || value.includes(textField) || !canAddMore)
            return;
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
                required={false}
                InputProps={{
                    endAdornment: (
                        <InputAdornment {...({} as any)}>
                            <IconButton
                                size="small"
                                onClick={handleCheckIconClicked}
                            >
                                <CheckIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                disabled={!canAddMore}
            />
            {value?.map((chip, index) => (
                <Chip
                    label={chip}
                    key={chip}
                    color="primary"
                    onDelete={() => onChange(value.filter((s) => s !== chip))}
                    {...ChipProps}
                />
            ))}
        </>
    );
};

export default ChipInput;

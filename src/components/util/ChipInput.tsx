import { useState, LegacyRef } from "react";
import CheckIcon from "@material-ui/icons/Check";
import Chip, { ChipProps } from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { IValidatorFunction } from "../../utils/types/validation.types";
import { configureErrorMessageFromValidators } from "../../utils/helpers";

interface IChipInputProps {
    value: string[];
    onChange(chips: string[]): void;
    validate?: IValidatorFunction<string>[] | IValidatorFunction<string>;
    TextFieldProps?: TextFieldProps;
    ChipProps?: ChipProps;
    max?: number;
}

const ChipInput: React.FC<IChipInputProps> = ({
    value,
    onChange,
    TextFieldProps,
    ChipProps,
    max,
    validate,
}) => {
    const [textField, setTextField] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>();
    const maxReached = typeof max === "number" && value.length === max;

    function handleAddClicked() {
        if (!textField.length || value.includes(textField) || maxReached)
            return;

        validate = validate || [];
        let validators = Array.isArray(validate) ? validate : [validate];
        const errorMessage = configureErrorMessageFromValidators(
            textField,
            validators
        );

        console.log({ errorMessage });

        if (!errorMessage) {
            onChange([...value, textField]);
            setTextField("");
        }
        setErrorMessage(errorMessage);
    }

    function handleDeleteClicked(chip: string) {
        onChange(value.filter((s) => s !== chip));
    }

    return (
        <>
            <TextField
                {...TextFieldProps}
                value={textField}
                onChange={(e) => setTextField(e.target.value)}
                required={false}
                error={!!errorMessage || TextFieldProps?.error}
                helperText={
                    errorMessage ||
                    (maxReached && `Maximum reached`) ||
                    TextFieldProps?.helperText
                }
                InputProps={{
                    endAdornment: (
                        <InputAdornment
                            component="span"
                            position="end"
                            aria-label={`Add ${value}${
                                TextFieldProps?.label
                                    ? " to " + TextFieldProps.label
                                    : ""
                            }`}
                        >
                            <IconButton size="small" onClick={handleAddClicked}>
                                <CheckIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                disabled={maxReached}
            />
            {value?.map((chip, index) => (
                <Chip
                    label={chip}
                    key={chip}
                    color="primary"
                    onDelete={() => handleDeleteClicked(chip)}
                    {...ChipProps}
                />
            ))}
        </>
    );
};

export default ChipInput;

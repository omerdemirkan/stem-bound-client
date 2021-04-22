import { ChangeEvent, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Chip, { ChipProps } from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { IValidatorFunction } from "../../utils/types/validation.types";
import { configureErrorMessageFromValidators } from "../../utils/helpers";
import Tooltip from "@material-ui/core/Tooltip";

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

        if (!errorMessage) {
            onChange([...value, textField]);
            setTextField("");
        }
        setErrorMessage(errorMessage);
    }

    function handleDeleteClicked(chip: string) {
        onChange(value.filter((s) => s !== chip));
    }

    function handleChange(
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) {
        if (/[\n,]/.test(e.target.value)) return;
        setTextField(e.target.value);
    }

    function handleKeyPress(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddClicked();
        }
    }

    return (
        <>
            <TextField
                {...TextFieldProps}
                value={textField}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
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
                            <Tooltip title="Add">
                                <IconButton
                                    onClick={handleAddClicked}
                                    color="primary"
                                >
                                    <AddIcon />
                                </IconButton>
                            </Tooltip>
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

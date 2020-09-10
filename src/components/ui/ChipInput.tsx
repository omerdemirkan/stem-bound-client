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
    TextFieldProps?: TextFieldProps;
    ChipProps?: ChipTypeMap<{}, "div">;
    onChange?(chips: string[]): void;
    initialValues?: string[];
    name?: string;
    ref?: LegacyRef<HTMLInputElement>;
};

const ChipInput: React.FC<Props> = ({
    onChange,
    name,
    ref,
    initialValues,
    TextFieldProps,
}) => {
    const [textField, setTextField] = useState<string>("");
    const [chips, setChips] = useState<string[]>([]);

    function handleCheckIconClicked() {
        if (!textField.length) return;
        setChips((prev) => [...prev, textField]);
        setTextField("");
    }

    useEffect(
        function () {
            onChange && onChange(chips);
        },
        [chips]
    );

    return (
        <div>
            <TextField
                {...TextFieldProps}
                value={textField}
                onChange={(e) => setTextField(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment>
                            <IconButton size="small">
                                <CheckIcon onClick={handleCheckIconClicked} />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            {chips.map((chip, index) => (
                <>
                    <Chip
                        label={chip}
                        color="primary"
                        onDelete={() =>
                            setChips((prev) => prev.filter((s) => s !== chip))
                        }
                    />
                    <input
                        type="text"
                        style={{ display: "none" }}
                        ref={ref}
                        name={`${name}[${index}]`}
                    />
                </>
            ))}

            {}
        </div>
    );
};

export default ChipInput;

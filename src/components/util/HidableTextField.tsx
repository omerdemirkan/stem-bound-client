import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

export type IHidableTextFieldProps = {
    initial?: "hidden" | "visible";
} & TextFieldProps;

const HidableTextField: React.FC<IHidableTextFieldProps> = ({
    initial,
    ...textFieldProps
}) => {
    const [isHidden, setIsHidden] = useState<boolean>(initial !== "visible");
    let defaultType = textFieldProps.type || textFieldProps.InputProps.type;
    if (defaultType === "password" || !defaultType) defaultType = "text";
    return (
        <TextField
            {...textFieldProps}
            InputProps={{
                ...textFieldProps?.InputProps,
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle visibility"
                            onClick={() => setIsHidden((prev) => !prev)}
                            onMouseDown={(e) => e.preventDefault()}
                        >
                            {isHidden ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
                type: isHidden ? "password" : defaultType,
            }}
        />
    );
};

export default HidableTextField;

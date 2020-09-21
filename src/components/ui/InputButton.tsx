import { useState, Dispatch, ChangeEvent } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
} from "@material-ui/core";

interface Props {
    renderInput(
        value: any,
        setValue: Dispatch<any>,
        options?: {
            updateFields(value: any): void;
            handleChange(event: ChangeEvent<any>): void;
        }
    ): any;
    onSubmit: (value: any) => any;
    initialValue?: any;
    disabled?: boolean;
}

const InputButton: React.FC<Props> = ({
    children,
    onSubmit,
    renderInput,
    initialValue,
    disabled,
}) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [value, setValue] = useState<any>(initialValue);

    function handleSubmit() {
        onSubmit(value);
        setModalOpen(false);
    }

    function handleButtonClicked() {
        setModalOpen(true);
        setValue(initialValue);
    }

    function updateFields(updates: any) {
        setValue((prev) => ({ ...prev, ...updates }));
    }

    function handleChange(e: ChangeEvent<any>) {
        updateFields({ [e.target.name || e.target.id]: e.target.value });
    }

    return (
        <>
            <Button onClick={handleButtonClicked} disabled={disabled}>
                {children}
            </Button>

            <Dialog open={!!modalOpen} onClose={() => setModalOpen(false)}>
                <DialogContent>
                    {renderInput(value, setValue, {
                        updateFields,
                        handleChange,
                    })}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setModalOpen(false)}
                        color="primary"
                        variant="outlined"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        color="primary"
                        variant="contained"
                        autoFocus
                    >
                        Continue
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default InputButton;

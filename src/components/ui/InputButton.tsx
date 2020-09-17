import { useState, Dispatch } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
} from "@material-ui/core";

interface Props {
    renderInput(value: any, setValue: Dispatch<any>): any;
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

    return (
        <>
            <Button onClick={handleButtonClicked} disabled={disabled}>
                {children}
            </Button>

            <Dialog open={!!modalOpen} onClose={() => setModalOpen(false)}>
                <DialogContent>{renderInput(value, setValue)}</DialogContent>
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

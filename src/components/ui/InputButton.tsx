import { useState, Dispatch } from "react";
import Modal, { ModalFooter } from "./Modal";

interface Props {
    renderInput(value: any, setValue: Dispatch<any>): void;
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
        onSubmit(value.filter((s) => s));
        setModalOpen(false);
    }

    function handleCancelButtonClicked() {
        setModalOpen(false);
        setValue(initialValue);
    }

    return (
        <>
            <button onClick={() => setModalOpen(true)} disabled={disabled}>
                {children}
            </button>
            <Modal open={modalOpen}>
                {renderInput(value, setValue)}
                <ModalFooter>
                    <button onClick={handleCancelButtonClicked}>CANCEL</button>
                    <button onClick={handleSubmit}>CONTINUE</button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default InputButton;

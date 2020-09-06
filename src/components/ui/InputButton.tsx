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
        onSubmit(value);
        setModalOpen(false);
    }

    function handleButtonClicked() {
        setModalOpen(true);
        setValue(initialValue);
    }

    return (
        <>
            <button onClick={handleButtonClicked} disabled={disabled}>
                {children}
            </button>
            <Modal open={modalOpen}>
                {renderInput(value, setValue)}
                <ModalFooter>
                    <button onClick={() => setModalOpen(false)}>CANCEL</button>
                    <button onClick={handleSubmit}>CONTINUE</button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default InputButton;

import { useState, Dispatch } from "react";
import Modal, { ModalFooter } from "../ui/Modal";

interface Props {
    renderInput: (
        value: any,
        setValue: Dispatch<any>
    ) => React.ComponentClass | React.FC;
    onSubmit?: (value: any) => any;
    initialValue: any;
}

const InputButton: React.FC<Props> = ({
    children,
    onSubmit,
    renderInput,
    initialValue,
}) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [value, setValue] = useState<any>(initialValue);

    function handleSubmit() {
        onSubmit(value);
        setModalOpen(false);
    }
    return (
        <>
            <button onClick={() => setModalOpen(true)}>{children}</button>
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

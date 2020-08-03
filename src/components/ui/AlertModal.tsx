import CrossSVG from "../svg/icons/cross";
import Modal from "./Modal";

interface Props {
    open: boolean;
    onClose: (...args: any) => any;
    headerText?: string;
    bodyText?: string;
    hideCloseIcon?: boolean;
}

const AlertModal: React.FC<Props> = ({
    open,
    headerText,
    bodyText,
    onClose,
    children,
    hideCloseIcon,
}) => {
    return (
        <>
            <Modal open={open}>
                {!hideCloseIcon ? <CrossSVG onClick={onClose} /> : null}
                <h3>{headerText}</h3>
                <p>{bodyText}</p>
                {children}
            </Modal>
            <style jsx>{``}</style>
        </>
    );
};

export default AlertModal;

export const AlertModalFooter: React.FC = ({ children }) => (
    <div>{children}</div>
);

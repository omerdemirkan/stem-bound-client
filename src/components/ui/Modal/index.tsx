import classes from "./modal.module.css";
import CrossSVG from "../../svg/icons/cross";

interface Props {
    open: boolean;
    onClose: (...args: any) => any;
    headerText?: string;
    bodyText?: string;
}

const Modal: React.FC<Props> = ({
    open,
    headerText,
    bodyText,
    onClose,
    children,
}) => {
    return (
        <>
            <div
                className={classes.modal}
                style={{ display: open ? "block" : "none" }}
            >
                <CrossSVG onClick={onClose} />
                <h3>{headerText}</h3>
                <p>{bodyText}</p>
                {children}
            </div>
            <div
                className={classes.backdrop}
                style={{ display: open ? "block" : "none" }}
            ></div>
        </>
    );
};

export default Modal;

export const ModalFooter: React.FC = ({ children }) => <div>{children}</div>;

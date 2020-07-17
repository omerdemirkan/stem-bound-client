import CrossSVG from "../svg/icons/cross";

interface Props {
    open: boolean;
    onClose: (...args: any) => any;
    headerText?: string;
    bodyText?: string;
    hideCloseIcon?: boolean;
}

const Modal: React.FC<Props> = ({
    open,
    headerText,
    bodyText,
    onClose,
    children,
    hideCloseIcon,
}) => {
    return (
        <>
            <div className="modal" style={{ display: open ? "block" : "none" }}>
                {!hideCloseIcon ? <CrossSVG onClick={onClose} /> : null}
                <h3>{headerText}</h3>
                <p>{bodyText}</p>
                {children}
            </div>
            <div
                className="backdrop"
                style={{ display: open ? "block" : "none" }}
            ></div>

            <style jsx>{`
                .modal {
                    position: fixed;
                    height: 400px;
                    width: 400px;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);

                    background-color: var(--background-light);

                    z-index: 10;
                }

                .backdrop {
                    position: fixed;
                    height: 100vh;
                    width: 100vw;
                    top: 0;
                    left: 0;

                    background-color: rgba(0, 0, 0, var(--shadow-opacity-dark));
                    transition: color 0.2s ease;

                    z-index: 9;
                }
            `}</style>
        </>
    );
};

export default Modal;

export const ModalFooter: React.FC = ({ children }) => <div>{children}</div>;

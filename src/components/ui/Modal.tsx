interface Props {
    open: boolean;
}

const Modal: React.FC<Props> = ({ open, children }) => {
    return (
        <>
            <div className="modal" style={{ display: open ? "block" : "none" }}>
                {children}
            </div>
            <div
                className="backdrop"
                style={{ display: open ? "block" : "none" }}
            ></div>

            <style jsx>{`
                .modal {
                    position: fixed;
                    width: 400px;
                    top: 50%;
                    left: 50%;
                    padding: 30px;
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

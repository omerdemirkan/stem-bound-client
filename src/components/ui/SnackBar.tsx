import CrossSVG from "../svg/icons/cross";
import { ENotificationTypes } from "../../utils/types";
import { useEffect } from "react";
import IconButton from "./IconButton";

interface Props {
    text: string;
    type: ENotificationTypes;
    onClose: () => any;
    renderActions?: () => any;
    autoClose?: number;
    onClick?: () => any;
}

const SnackBar: React.FC<Props> = ({
    text,
    onClose,
    renderActions,
    autoClose,
    onClick,
}) => {
    useEffect(function () {
        setTimeout(onClose, autoClose || 6000);
    }, []);

    return (
        <>
            <div className="root" onClick={onClick || (() => {})}>
                <div className="text-box">
                    <p>{text}</p>
                </div>
                <span className="actions-box">
                    {renderActions ? (
                        renderActions()
                    ) : (
                        <IconButton>
                            <CrossSVG
                                className="close-icon"
                                style={{
                                    fill: "var(--background-light)",
                                    cursor: "pointer",
                                }}
                                onClick={onClose}
                            />
                        </IconButton>
                    )}
                </span>
            </div>
            <style jsx>{`
                .root {
                    background-color: var(--contrast-light);
                    color: var(--background-light);

                    position: fixed;
                    bottom: 5vh;
                    left: 5vw;

                    width: 600px;
                    max-width: 90%;
                    height: 60px;
                    margin: 0;

                    display: flex;
                    justify-content: space-between;
                }

                .text-box {
                    width: 80%;
                    margin: auto 10px;
                }

                .actions-box {
                    margin: auto 10px;
                }
            `}</style>
        </>
    );
};

export default SnackBar;

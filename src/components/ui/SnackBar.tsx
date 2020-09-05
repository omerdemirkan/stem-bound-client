import CrossSVG from "../svg/icons/cross";
import { ENotificationTypes } from "../../utils/types";
import { useEffect } from "react";

interface Props {
    text: string;
    type: ENotificationTypes;
    onClose: () => any;
    renderActions?: () => any;
    autoClose?: number;
}

const SnackBar: React.FC<Props> = ({
    text,
    onClose,
    renderActions,
    autoClose,
}) => {
    useEffect(function () {
        setTimeout(onClose, autoClose || 6000);
    }, []);

    return (
        <>
            <div className="root">
                <p>{text}</p>
                {renderActions ? (
                    renderActions()
                ) : (
                    <CrossSVG onClick={onClose} />
                )}
            </div>
            <style jsx>{`
                .root {
                    display: fixed;
                    bottom: 5vh;
                    left: 5vw;

                    width: 90%;
                    max-width: 600px;
                    height: 60px;
                    margin: 0;
                }
            `}</style>
        </>
    );
};

export default SnackBar;

import { ENotificationTypes } from "../../utils/types";

interface Props {
    type?: ENotificationTypes;
}

const IconButton: React.FC<Props> = ({ children }) => {
    return (
        <>
            <span className="root">{children}</span>
            <style jsx>{`
                .root {
                    margin: 15px;
                }
            `}</style>
        </>
    );
};

export default IconButton;

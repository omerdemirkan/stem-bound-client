import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {}

const Center: React.FC<Props> = ({ children, ...divProps }) => {
    return (
        <div
            style={{
                ...divProps.style,
                display: "flex",
                justifyContent: "center",
            }}
        >
            {children}
        </div>
    );
};

export default Center;

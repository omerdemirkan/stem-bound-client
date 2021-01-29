import { HTMLAttributes } from "react";

export interface IHidableProps extends HTMLAttributes<HTMLDivElement> {
    visible: boolean;
}

const HidableDiv: React.FC<IHidableProps> = ({
    visible,
    children,
    ...divProps
}) => {
    return (
        <div
            {...divProps}
            style={{ ...divProps.style, display: visible ? "block" : "none" }}
        >
            {children}
        </div>
    );
};

export default HidableDiv;

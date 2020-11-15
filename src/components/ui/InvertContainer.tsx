import { DetailedHTMLProps, HTMLAttributes } from "react";

const InvertContainer: React.FC<DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
>> = ({ children, ...divProps }) => {
    return (
        <div
            style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
            }}
        >
            <div {...divProps} className="invert-container">
                {children}
            </div>
        </div>
    );
};

export default InvertContainer;

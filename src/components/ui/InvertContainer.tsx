import { DetailedHTMLProps, HTMLAttributes, useEffect } from "react";

const InvertContainer: React.FC<DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
>> = ({ children, ...divProps }) => {
    useEffect(
        function () {
            // update scroll
        },
        [children[1]]
    );

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

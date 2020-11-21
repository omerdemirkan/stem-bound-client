import { DetailedHTMLProps, HTMLAttributes, useEffect, useRef } from "react";

interface Props {
    key?: string;
}

const InvertScroll: React.FC<
    Props & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ children, key, ...divProps }) => {
    const divRef = useRef<HTMLDivElement>();
    useEffect(
        function () {
            divRef.current.scrollTop = divRef.current.scrollHeight;
        },
        [children, key]
    );

    return (
        <div {...divProps} ref={divRef}>
            {children}
        </div>
    );
};

export default InvertScroll;

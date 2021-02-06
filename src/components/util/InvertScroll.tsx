import { DetailedHTMLProps, HTMLAttributes, useEffect, useRef } from "react";

interface IInverseScrollProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    pageKey?: string;
}

const InvertScroll: React.FC<IInverseScrollProps> = ({
    children,
    pageKey,
    ...divProps
}) => {
    const divRef = useRef<HTMLDivElement>();
    useEffect(
        function () {
            divRef.current.scrollTop = 9;
            console.log("Scrolling to bottom");
        },
        [pageKey]
    );
    return (
        <div className="outer">
            <div className="inner" ref={divRef}>
                {children}
            </div>
            <style jsx>{`
                .outer {
                    position: relative;
                    overflow: hidden;
                    height: 100%;
                }
                .inner {
                    display: flex;
                    flex-direction: column-reverse;
                    position: relative;
                    overflow-y: auto;
                    height: 100%;
                }
            `}</style>
        </div>
    );
};

export default InvertScroll;

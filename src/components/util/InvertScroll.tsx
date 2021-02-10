import { DetailedHTMLProps, HTMLAttributes, useEffect, useRef } from "react";

interface IInverseScrollProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    pageKey?: string;
    onScrollToTop?(): any;
}

const InvertScroll: React.FC<IInverseScrollProps> = ({
    children,
    pageKey,
    onScrollToTop,
    ...divProps
}) => {
    const divRef = useRef<HTMLDivElement>();
    useEffect(
        function () {
            divRef.current.scrollTop = 100;
            console.log("Scrolling to bottom");
        },
        [pageKey]
    );
    return (
        <div className="invert-scroll-outer">
            <div
                className="invert-scroll-inner"
                ref={divRef}
                onScroll={
                    onScrollToTop &&
                    divRef.current.scrollTop +
                        divRef.current.scrollHeight -
                        divRef.current.clientHeight <=
                        1 &&
                    onScrollToTop()
                }
            >
                {children}
            </div>
            <style jsx>{`
                .invert-scroll-outer {
                    position: relative;
                    overflow: hidden;
                    height: 100%;
                }
                .invert-scroll-inner {
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

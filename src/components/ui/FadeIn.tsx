import { useRef } from "react";
import useOnScreen from "../../hooks/useOnScreen";

export interface IFadeInProps {
    delayMs?: number;
    durationMs?: number;
}

const FadeIn: React.FC<IFadeInProps> = ({
    children,
    delayMs = 0,
    durationMs = 300,
}) => {
    const ref = useRef();
    const { enteredScreen } = useOnScreen(ref);
    return (
        <div
            ref={ref}
            className="fade-in-container"
            style={{
                animationName: enteredScreen ? "fadeIn" : null,
                animationDelay: delayMs + "ms",
                animationDuration: durationMs + "ms",
                animationTimingFunction: "ease-out",
                animationFillMode: "forwards",
            }}
        >
            {children}
        </div>
    );
};

export default FadeIn;

import { useRef } from "react";
import useOnScreen from "../../hooks/useOnScreen";

export interface IFadeInProps {
    delayMs?: number;
    durationMs?: number;
}

const FadeIn: React.FC<IFadeInProps> = ({
    children,
    delayMs = 0,
    durationMs = 200,
}) => {
    const ref = useRef();
    const isOnScreen = useOnScreen(ref);
    return (
        <div
            ref={ref}
            className="fade-in-container"
            style={{
                animation: isOnScreen
                    ? `fadeIn ${durationMs + "ms"} ease-out ${
                          delayMs + "ms"
                      } forwards`
                    : null,
            }}
        >
            {children}
        </div>
    );
};

export default FadeIn;

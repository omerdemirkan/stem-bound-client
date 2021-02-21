import { useRef } from "react";

// this hook is to generate resource intensive values
// that persist between renders.value gets calculated
// only on the first render rather than on every render.
// this has no refresh/memo functionality (not like useMemo)
export default function useCalculateOnce<T>(calculateFn: () => T): T {
    const ref = useRef<T>();
    if (!ref.current) ref.current = calculateFn();
    return ref.current;
}

import { useRef } from "react";

export function useCalculateOnce<T>(calculateFn: () => T): T {
    const ref = useRef<T>();
    if (!ref.current) ref.current = calculateFn();
    return ref.current;
}

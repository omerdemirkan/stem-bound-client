import { useRef } from "react";

// Returns a function that can retrieve the most recent
// value. Useful when referring to state in callbacks
// so that they execute based on the most recent value
// rather than the value at the render it was set on
export default function useGetCurrentValue<T>(state: T) {
    const valueRef = useRef<T>(state);
    valueRef.current = state;

    return () => valueRef.current;
}

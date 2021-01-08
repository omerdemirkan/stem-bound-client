import { useEffect, useState } from "react";

export default function useCompute<T>(
    computeValue: () => T,
    dependencyList: any[] = []
) {
    const [computedValue, setComputedValue] = useState<T>();
    useEffect(function () {
        setComputedValue(computeValue());
    }, dependencyList);
    return computedValue;
}

import { useState } from "react";
import { appendQueriesToUrl, getClientQueryParams } from "../../utils/helpers";

export default function useRouterQueryState<T>({
    initialValue,
    field,
}: {
    initialValue: T;
    field: string;
}): [T, (update: T) => any] {
    const [value, setValue] = useState<T>(initialValue);
    function setRouterQueryState(value: T) {
        const basePath = window.location.pathname;
        let query = getClientQueryParams();
        query[field] = value;
        window.history.replaceState(
            `Updating ${field}`,
            "",
            appendQueriesToUrl(basePath, query)
        );
        setValue(value);
    }
    return [value, setRouterQueryState];
}

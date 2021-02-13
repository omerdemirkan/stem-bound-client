import { useEffect, useState } from "react";
import { appendQueriesToUrl, getClientQueryParams } from "../utils/helpers";

export default function useQueryState<T>(
    field: string,
    initialValue?: T
): [T, (update: T) => any] {
    const [value, setValue] = useState<T>(
        initialValue || getClientQueryParams()[field]
    );

    useEffect(function () {
        let query = getClientQueryParams();
        if (!query[field]) updateBrowserQueryField(field, initialValue);
    }, []);

    function updateBrowserQueryField(field: string, value: any) {
        const basePath = window.location.pathname;
        let query = getClientQueryParams();
        query[field] = value;
        window.history.pushState(
            `Updating ${field}`,
            "",
            appendQueriesToUrl(basePath, query)
        );
        setValue(value);
    }

    function setRouterQueryState(value: T) {
        updateBrowserQueryField(field, value);
    }

    return [value, setRouterQueryState];
}

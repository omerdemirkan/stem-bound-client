import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { appendQueriesToUrl, getClientQueryParams } from "../utils/helpers";

export function useQueryStateShallow<T>(
    field: string,
    {
        defaultValue,
        configureStateValue,
        configureQueryValue,
    }: {
        defaultValue?: T;
        configureStateValue?: (original: string | string[]) => T;
        configureQueryValue?: (original: T) => string;
    } = {}
): [T, (update: T) => any] {
    configureStateValue = configureStateValue || ((a) => a as any);
    configureQueryValue = configureQueryValue || ((a) => a as any);
    const [value, setValue] = useState<T>(
        defaultValue ||
            configureStateValue(getClientQueryParams()[field] as any)
    );

    useEffect(function () {
        let query = getClientQueryParams();
        if (query[field] !== configureQueryValue(defaultValue))
            updateBrowserQueryField(field, defaultValue);
    }, []);

    function updateBrowserQueryField(field: string, value: any) {
        const basePath = window.location.pathname;
        let query = getClientQueryParams();
        query[field] = configureQueryValue(value);
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

export default function useQueryState<T>(
    field: string,
    {
        defaultValue,
        configureStateValue,
        configureQueryValue,
    }: {
        defaultValue?: T;
        configureStateValue?: (original: string | string[]) => T;
        configureQueryValue?: (original: T) => string;
    } = {}
): [T, (update: T) => any] {
    configureStateValue = configureStateValue || ((a) => a as any);
    configureQueryValue = configureQueryValue || ((a) => a as any);
    const router = useRouter();
    const initRef = useRef<boolean>(false);

    useEffect(
        function () {
            if (!router || initRef.current) return;
            let initialQueryString =
                configureQueryValue(defaultValue) ||
                getClientQueryParams()[field];
            if (
                router &&
                initialQueryString &&
                router.query[field] !== initialQueryString
            )
                handleUpdateQuery(defaultValue);
            initRef.current = true;
        },
        [!!router]
    );

    function handleUpdateQuery(value: T) {
        router.replace(
            router.pathname,
            appendQueriesToUrl(router.asPath.split("?")[0], {
                ...getClientQueryParams(),
                [field]: value,
            }),
            { shallow: true }
        );
    }

    return [
        configureStateValue(
            router?.query[field] || getClientQueryParams()[field]
        ),
        handleUpdateQuery,
    ];
}

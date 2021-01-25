import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";

export default function useRouterQuery<T>(
    mappingFunction: (query: ParsedUrlQuery) => T,
    initialValue: T
) {
    const router = useRouter();
    const [value, setValue] = useState<T>(initialValue);
    useEffect(
        function () {
            setValue(mappingFunction(router.query));
        },
        [router.query]
    );
    return value;
}

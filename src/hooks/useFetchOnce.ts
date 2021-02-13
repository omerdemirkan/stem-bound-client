import useSWR, { keyInterface } from "swr";
import { ConfigInterface, fetcherFn, responseInterface } from "swr/dist/types";

export function useFetchOnce<T>(
    key: keyInterface,
    fetcher: fetcherFn<T>,
    config?: ConfigInterface<T, any, fetcherFn<T>>
): responseInterface<T, Error> {
    const storedResponse = useSWR(key);
    useSWR(!storedResponse.data && key, fetcher, config);
    return storedResponse;
}

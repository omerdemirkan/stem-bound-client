import { useEffect, useState } from "react";
import useSWR, { responseInterface } from "swr";

export type InfiniteFetcher<T> = (currentData: T) => Promise<T>;

interface IUserInfiniteFetchResponse<T> extends responseInterface<T, Error> {
    loadMore(): void;
    hasMore: boolean;
    isLoadingMore: boolean;
}

export default function useInfiniteFetch<T>(
    key: string,
    fetcher: InfiniteFetcher<T[]>
): IUserInfiniteFetchResponse<T[]> {
    const swrResponse = useSWR<T[]>(key);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
    useEffect(
        function () {
            if (!swrResponse.data && key) loadMore();
        },
        [key]
    );

    async function loadMore() {
        if (isLoadingMore || !hasMore) return;
        setIsLoadingMore(true);
        try {
            const newData = await fetcher(swrResponse.data || []);
            if (newData.length === 0) setHasMore(false);
            else swrResponse.mutate((swrResponse.data || []).concat(newData));
            setIsLoadingMore(false);
        } catch (e) {
            setIsLoadingMore(false);
            await loadMore();
        }
    }

    return {
        ...swrResponse,
        loadMore,
        hasMore,
        isLoadingMore,
    };
}

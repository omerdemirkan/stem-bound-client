import { useEffect, useState } from "react";
import useSWR, { responseInterface } from "swr";

export type InfiniteFetcher<T> = (
    currentData: T
) => Promise<{ data: T; hasMore: boolean }>;

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
            if (!swrResponse.data && key) {
                setIsLoadingMore(false);
                setHasMore(true);
                handleLoadMore();
            }
        },
        [key]
    );

    async function handleLoadMore() {
        setIsLoadingMore(true);
        for (let i = 0; i < 3; i++) {
            try {
                const { data, hasMore } = await fetcher(swrResponse.data || []);
                if (data.length > 0)
                    swrResponse.mutate((swrResponse.data || []).concat(data));
                setHasMore(hasMore);
                setIsLoadingMore(false);
                break;
            } catch (e) {}
        }
    }

    return {
        ...swrResponse,
        async loadMore() {
            if (!isLoadingMore && hasMore) handleLoadMore();
        },
        hasMore,
        isLoadingMore,
    };
}

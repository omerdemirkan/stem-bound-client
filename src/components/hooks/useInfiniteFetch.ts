import useSWR, { responseInterface } from "swr";

export type InfiniteFetcher<T> = (currentData: T) => Promise<T>;

interface IUserInfiniteFetchResponse<T> extends responseInterface<T, Error> {
    loadMore(): void;
}

export default function useInfiniteScroll<T>(
    key: string,
    fetcher: InfiniteFetcher<T[]>
): IUserInfiniteFetchResponse<T[]> {
    const swrResponse = useSWR<T[]>(key);

    async function handleLoadMore() {
        const newData = await fetcher(swrResponse.data);
        swrResponse.mutate(swrResponse.data.concat(newData));
    }

    return {
        ...swrResponse,
        loadMore: handleLoadMore,
    };
}

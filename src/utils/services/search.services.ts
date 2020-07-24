import { IFetchSearchDataOptions, ISearchData, IApiResponse } from "../types";
import { isSearchField, isUserSearchField } from "../helpers";
import { fetchUsers } from ".";

export async function fetchSearchData({
    field,
    ...options
}: IFetchSearchDataOptions): Promise<IApiResponse<ISearchData[]>> {
    try {
        if (!isSearchField(field)) {
            throw new Error(
                "Invalid search searchField passed to fetchSearchData"
            );
        } else if (isUserSearchField(field)) {
            return (await fetchUsers({
                role: field as any,
                ...(options as any),
            })) as any;
        }
    } catch (e) {
        return Promise.reject(e);
    }
}

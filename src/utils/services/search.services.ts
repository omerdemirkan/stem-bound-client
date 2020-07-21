import { IFetchSearchDataOptions, ISearchData } from "../types/search.types";
import { isSearchField, isUserSearchField } from "../helpers/search.helpers";
import { fetchUsers } from "./user.services";
import { IApiResponse } from "../types";

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

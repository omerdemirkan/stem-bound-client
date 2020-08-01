import {
    IFetchSearchDataOptions,
    ISearchData,
    IApiResponse,
    ESearchFieldTypes,
} from "../types";
import { getSearchFieldType } from "../helpers";
import { fetchUsers } from ".";

export async function fetchSearchData({
    field,
    ...options
}: IFetchSearchDataOptions): Promise<IApiResponse<ISearchData[]>> {
    try {
        switch (getSearchFieldType(field)) {
            case ESearchFieldTypes.USER:
                return (await fetchUsers({
                    role: field as any,
                    ...(options as any),
                })) as any;
            default:
                throw new Error(
                    "Invalid search searchField passed to fetchSearchData"
                );
        }
    } catch (e) {
        return Promise.reject(e);
    }
}

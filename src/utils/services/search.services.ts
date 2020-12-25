import {
    IFetchSearchDataOptions,
    ISearchData,
    IApiResponse,
    ESearchFields,
    EUserRoles,
    IFetchUserArrayOptions,
} from "../types";
import { fetchUsers } from ".";

export async function fetchSearchData(
    searchField: ESearchFields,
    options: IFetchSearchDataOptions
): Promise<IApiResponse<ISearchData[]>> {
    try {
        switch (searchField) {
            case ESearchFields.INSTRUCTOR:
            case ESearchFields.SCHOOL_OFFICIAL:
            case ESearchFields.STUDENT:
                return (await fetchUsers(
                    searchField as any,
                    options as IFetchUserArrayOptions
                )) as any;
            default:
                throw new Error(
                    "Invalid search searchField passed to fetchSearchData"
                );
        }
    } catch (e) {
        return Promise.reject(e);
    }
}

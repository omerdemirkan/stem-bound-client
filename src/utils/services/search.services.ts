import {
    IFetchSearchDataOptions,
    ISearchData,
    IApiResponse,
    ESearchFields,
    EUserRoles,
    IFetchUserArrayOptions,
} from "../types";
import { fetchUsers } from ".";
import { countUsers } from "./user.services";

export async function fetchSearchData(
    searchField: ESearchFields,
    options: IFetchSearchDataOptions
): Promise<{ data: ISearchData[]; count: number }> {
    try {
        switch (searchField) {
            case ESearchFields.INSTRUCTOR:
            case ESearchFields.SCHOOL_OFFICIAL:
            case ESearchFields.STUDENT: {
                const [userRes, countRes] = await Promise.all([
                    fetchUsers(
                        searchField as any,
                        options as IFetchUserArrayOptions
                    ),
                    countUsers(
                        searchField as any,
                        options as IFetchUserArrayOptions
                    ),
                ]);
                return { data: userRes.data, count: countRes.data };
            }
            default:
                throw new Error(
                    "Invalid search searchField passed to fetchSearchData"
                );
        }
    } catch (e) {
        return Promise.reject(e);
    }
}

import { IFetchSearchDataOptions, ISearchData } from "../types/search.types";
import { isSearchField } from "../helpers/search.helpers";
import { fetchUsers } from "./user.services";

export function fetchSearchData({
    field,
    ...options
}: IFetchSearchDataOptions): Promise<ISearchData[]> {
    return new Promise(function (resolve, reject) {
        if (!isSearchField(field))
            return reject(
                "Invalid search searchField passed to fetchSearchData"
            );
        fetchUsers({ role: field as any, ...(options as any) })
            .then(function (res) {
                resolve(res.data);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

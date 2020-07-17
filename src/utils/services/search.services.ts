import { ISchoolOriginal, IFetchSchoolsOptions, ICourse } from "../types";
import {
    EUserRoles,
    IUser,
    IFetchUsersOptions,
    IUserOriginal,
} from "../types/user.types";
import { appendQueriesToUrl, apiClient } from "../helpers/http.helpers";
import { IApiResponse } from "../types/api.types";
import {
    ESearchFields,
    IFetchSearchDataOptions,
    ISearchData,
} from "../types/search.types";
import { isSearchField } from "../helpers/search.helpers";
import { mapUserData } from "../helpers/user.helpers";

export async function fetchSchools(
    options: IFetchSchoolsOptions
): Promise<IApiResponse<ISchoolOriginal[]>> {
    let path = "/schools";
    let queries: any = {};

    if (options.coordinates) {
        const { latitude, longitude } = options.coordinates;
        queries.long = longitude;
        queries.lat = latitude;
    }

    if (options.skip) {
        queries.skip = options.skip;
    }
    if (options.limit) {
        queries.limit = options.limit;
        path += `&limit=${options.limit}`;
    }
    if (options.withSchoolOfficials) {
        queries.with_school_officials = 1;
    }
    if (options.text) {
        queries.text = options.text;
    }
    return apiClient.get(appendQueriesToUrl(path, queries));
}

export async function fetchUsers(
    options: IFetchUsersOptions
): Promise<IApiResponse<IUserOriginal[]>> {
    let path = `/users?role=${options.role}`;
    if (options.skip) {
        path += `&skip=${options.skip}`;
    }
    if (options.limit) {
        path += `&limit=${options.limit}`;
    }
    if (options.sortDirection && options.sortField) {
        path += `&sort_field=${options.sortField}&sort_direction=${options.sortDirection}`;
    }

    if (options.coordinates) {
        const { latitude, longitude } = options.coordinates;
        path += `&long=${longitude}&lat=${latitude}`;
    }

    return apiClient.get(path);
}

export async function fetchCourses(options: {}): Promise<
    IApiResponse<ICourse[]>
> {
    return await apiClient.get(`/courses`);
}

export async function fetchSearchData({
    field,
    ...options
}: IFetchSearchDataOptions): Promise<ISearchData[]> {
    return new Promise(async function (resolve, reject) {
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

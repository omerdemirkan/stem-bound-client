import { ISchoolOriginal, fetchSchoolsOptions, ICourse } from "../types";
import { EUserRoles, IUser, IFetchUsersOptions } from "../types/user.types";
import { appendQueriesToUrl, apiClient } from "../helpers/http.helpers";
import { IApiResponse } from "../types/api.types";
import { ESearchQueries } from "../types/search.types";
import { isSearchQuery } from "../helpers/search.helpers";

export async function fetchSchools(
    options: fetchSchoolsOptions
): Promise<IApiResponse<ISchoolOriginal[]>> {
    let path = "/schools";
    let queries: any = {};

    if (options.longitude && options.latitude) {
        queries.long = options.longitude;
        queries.lat = options.latitude;
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
): Promise<IApiResponse<IUser[]>> {
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

    return apiClient.get(path);
}

export async function fetchCourses(options: {}): Promise<
    IApiResponse<ICourse[]>
> {
    return await apiClient.get(`/courses`);
}

export async function fetchSearchData(query: ESearchQueries) {
    if (!isSearchQuery(query)) throw new Error();
    if (Object.values(EUserRoles).includes(query as any)) {
        return (await fetchUsers({ role: query as any })).data;
    }
}

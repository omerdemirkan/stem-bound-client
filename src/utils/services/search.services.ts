import { ISchoolOriginal, fetchSchoolsOptions } from "../types";
import { EUserRoles, IUser } from "../types/user.types";
import { appendQueriesToUrl, apiClient } from "../helpers/http.helpers";

export async function fetchSchools(
    options: fetchSchoolsOptions
): Promise<{ message: string; data: ISchoolOriginal[] }> {
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

export async function fetchUsers(options: {
    role: EUserRoles;
    limit?: number;
    skip?: number;
    sortField?: string;
    sortDirection?: number;
}): Promise<{ message: string; data: IUser[] }> {
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

export async function fetchCourses(options: {}) {
    const res = await apiClient.get(`/courses`);
}

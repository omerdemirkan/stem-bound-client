import { ISchoolOriginal, fetchSchoolsOptions } from "../types";
import { EUserRoles, IUser } from "../types/user.types";
import { apiClient } from "../http.utils";

export async function fetchSchools(
    options: fetchSchoolsOptions
): Promise<{ message: string; data: ISchoolOriginal[] }> {
    let path = `/school?long=${options.longitude}&lat=${options.latitude}`;

    if (options.skip) {
        path += `&skip=${options.skip}`;
    }
    if (options.limit) {
        path += `&limit=${options.limit}`;
    }
    if (options.withSchoolOfficials) {
        path += `&with_school_officials=1`;
    }
    return apiClient.get(path);
}

export async function fetchUsers(options: {
    role: EUserRoles;
    limit?: number;
    skip?: number;
    sortField?: string;
    sortDirection?: number;
}): Promise<{ message: string; data: IUser[] }> {
    let path = `/user?role=${options.role}`;
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
    const res = await apiClient.get(`/course`);
}

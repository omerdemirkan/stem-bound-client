import { ISchoolOriginal, fetchSchoolsOptions } from "../types";
import { EUserRoles, IUser } from "../types/user.types";
import { apiClient } from "./client.services";

export async function fetchSchools(
    options: fetchSchoolsOptions
): Promise<ISchoolOriginal[]> {
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
    const res = await apiClient.get(path);
    return (res as any).data;
}

export async function fetchUsers(options: {
    role: EUserRoles;
    limit?: number;
    skip?: number;
    sortField?: string;
    sortDirection?: number;
}): Promise<IUser[]> {
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
    const res = await apiClient.get(path);

    return (res as any).data;
}

export async function fetchCourses(options: {}) {
    const res = await apiClient.get(`/course`);
}

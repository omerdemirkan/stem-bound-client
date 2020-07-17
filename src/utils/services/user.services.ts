import {
    IUserOriginal,
    ISchoolOfficial,
    IStudentOriginal,
    IFetchUsersOptions,
} from "../types/user.types";
import { ISchoolOriginal } from "../types";
import { apiClient } from "../helpers";
import { IApiResponse } from "../types/api.types";

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

export function fetchUserById(
    id: string
): Promise<IApiResponse<IUserOriginal>> {
    return apiClient.get(`/users/${id}`);
}

export function fetchUserSchoolById(
    id: string
): Promise<IApiResponse<ISchoolOriginal>> {
    return apiClient.get(`/users/${id}/school`);
}

// Excuse the awkward naming. This is to avoid confusion with fetchSchoolOfficialsById
export function fetchSchoolOfficialsBySchoolId(
    id: string
): Promise<IApiResponse<ISchoolOfficial[]>> {
    return apiClient.get(`/schools/${id}/school-officials`);
}

export async function fetchStudentsBySchoolId(
    id: string
): Promise<IApiResponse<IStudentOriginal[]>> {
    return apiClient.get(`/schools/${id}/students`);
}

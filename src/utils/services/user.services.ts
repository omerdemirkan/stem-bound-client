import {
    IUserOriginal,
    ISchoolOfficial,
    IStudentOriginal,
    IFetchUsersOptions,
    IInstructorOriginal,
} from "../types/user.types";
import { ISchoolOriginal } from "../types";
import { apiClient, appendQueriesToUrl } from "../helpers";
import { IApiResponse } from "../types/api.types";

export function fetchUsers({
    coordinates,
    role,
    limit,
    skip,
    sortDirection,
    sortField,
}: IFetchUsersOptions): Promise<IApiResponse<IUserOriginal[]>> {
    const url = appendQueriesToUrl("/users", {
        role,
        skip,
        limit,
        sort_field: sortField,
        sort_direction: sortDirection,
        long: coordinates?.longitude,
        lat: coordinates?.latitude,
    });
    return apiClient.get(url);
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

export function fetchSchoolOfficialsBySchoolId(
    id: string
): Promise<IApiResponse<ISchoolOfficial[]>> {
    return apiClient.get(`/schools/${id}/school-officials`);
}

export function fetchStudentsBySchoolId(
    id: string
): Promise<IApiResponse<IStudentOriginal[]>> {
    return apiClient.get(`/schools/${id}/students`);
}

export function getInstructorsByCourseId(
    id: string
): Promise<IApiResponse<IInstructorOriginal[]>> {
    return apiClient.get(`/courses/${id}/instructors`);
}

export function getStudentsByCourseId(
    id: string
): Promise<IApiResponse<IStudentOriginal[]>> {
    return apiClient.get(`/courses/${id}/students`);
}

export function updateUserById(
    id: string,
    userData: Partial<IUserOriginal>
): Promise<IApiResponse<IUserOriginal>> {
    return apiClient.patch(`/users/${id}`, userData);
}

export function deleteUserById(id: string) {
    return apiClient.delete(`/users/${id}`);
}

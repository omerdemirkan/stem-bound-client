import {
    IUserOriginal,
    ISchoolOfficial,
    IStudentOriginal,
    IFetchUsersOptions,
    IInstructorOriginal,
    IUser,
    IStudent,
    IInstructor,
} from "../types/user.types";
import { ISchoolOriginal, ISchool } from "../types";
import {
    apiClient,
    appendQueriesToUrl,
    mapResponseData,
    mapUserData,
    mapSchoolData,
} from "../helpers";
import { IApiResponse } from "../types/api.types";

export function fetchUsers({
    coordinates,
    role,
    limit,
    skip,
    sortDirection,
    sortField,
}: IFetchUsersOptions): Promise<IApiResponse<IUser[]>> {
    const url = appendQueriesToUrl("/users", {
        role,
        skip,
        limit,
        sort_field: sortField,
        sort_direction: sortDirection,
        long: coordinates?.longitude,
        lat: coordinates?.latitude,
    });
    return mapResponseData(apiClient.get(url), mapUserData);
}

export function fetchUserById(id: string): Promise<IApiResponse<IUser>> {
    return mapResponseData(apiClient.get(`/users/${id}`), mapUserData);
}

export function fetchUserSchoolById(
    id: string
): Promise<IApiResponse<ISchool>> {
    return mapResponseData(apiClient.get(`/users/${id}/school`), mapSchoolData);
}

export function fetchSchoolOfficialsBySchoolId(
    id: string
): Promise<IApiResponse<ISchoolOfficial[]>> {
    return mapResponseData(
        apiClient.get(`/schools/${id}/school-officials`),
        mapUserData
    );
}

export function fetchStudentsBySchoolId(
    id: string
): Promise<IApiResponse<IStudent[]>> {
    return mapResponseData(
        apiClient.get(`/schools/${id}/students`),
        mapUserData
    );
}

export function getInstructorsByCourseId(
    id: string
): Promise<IApiResponse<IInstructor[]>> {
    return mapResponseData(
        apiClient.get(`/courses/${id}/instructors`),
        mapUserData
    );
}

export function getStudentsByCourseId(
    id: string
): Promise<IApiResponse<IStudent[]>> {
    return mapResponseData(
        apiClient.get(`/courses/${id}/students`),
        mapUserData
    );
}

export function updateUserById(
    id: string,
    userData: Partial<IUserOriginal>
): Promise<IApiResponse<IUser>> {
    return mapResponseData(
        apiClient.patch(`/users/${id}`, userData),
        mapUserData
    );
}

export function deleteUserById(id: string) {
    return apiClient.delete(`/users/${id}`);
}

export function createUserProfilePicture(userId: string, file: File | Blob) {
    return apiClient.post(`/users/${userId}/profile-picture`, { file });
}

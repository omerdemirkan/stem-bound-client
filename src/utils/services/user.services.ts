import {
    IUserOriginal,
    ISchoolOfficial,
    IFetchUsersOptions,
    IUser,
    IStudent,
    IInstructor,
} from "../types/user.types";
import { ISchool } from "../types";
import {
    apiClient,
    appendQueriesToUrl,
    mapResponseData,
    mapUserData,
    mapSchoolData,
} from "../helpers";
import { IApiResponse } from "../types/api.types";
import { API_BASE_URL } from "../../config";

export function fetchUsers({
    coordinates,
    role,
    limit,
    skip,
    sortDirection,
    sortField,
    exclude,
}: IFetchUsersOptions): Promise<IApiResponse<IUser[]>> {
    const url = appendQueriesToUrl("/users", {
        role,
        skip,
        limit,
        sort_field: sortField,
        sort_direction: sortDirection,
        long: coordinates?.longitude,
        lat: coordinates?.latitude,
        exclude: exclude?.join(",") || undefined,
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

export function fetchInstructorsByCourseId(
    id: string
): Promise<IApiResponse<IInstructor[]>> {
    return mapResponseData(
        apiClient.get(`/courses/${id}/instructors`),
        mapUserData
    );
}

export function fetchStudentsByCourseId(
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

export function updateUserProfilePicture(
    userId: string,
    file: File
): Promise<IApiResponse<IUser>> {
    const fd = new FormData();
    fd.append("file", file);
    return fetch(`${API_BASE_URL}/users/${userId}/profile-picture`, {
        method: "PUT",
        body: fd,
        headers: {
            authorization: apiClient.getAuthHeader(),
        },
    }).then((res) => res.json());
}

export function updateUserLocation(
    userId: string,
    { zip }: { zip: string }
): Promise<IApiResponse<IUser>> {
    return mapResponseData(
        apiClient.put(`/users/${userId}/location`, { zip }),
        mapUserData
    );
}

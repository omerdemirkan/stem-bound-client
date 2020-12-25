import {
    IUserOriginal,
    ISchoolOfficial,
    IFetchUserArrayOptions,
    IUser,
    IStudent,
    IInstructor,
    EUserRoles,
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

export function fetchUsers(
    options: IFetchUserArrayOptions
): Promise<IApiResponse<IUser[]>> {
    const url = appendQueriesToUrl("/users", {
        role: options.role,
        skip: options.skip,
        limit: options.limit,
        text: options.text,
        long: options.coordinates?.longitude,
        lat: options.coordinates?.latitude,
        exclude: options.exclude?.join(",") || undefined,
        userIds: options.userIds?.join(",") || undefined,
        geo_ip: options.geoIp,
        chat_id: options.chatId,
        course_id: options.courseId,
        school_id: options.schoolId,
    });
    return mapResponseData(apiClient.get(url), mapUserData);
}

export function fetchUserById(userId: string): Promise<IApiResponse<IUser>> {
    return mapResponseData(apiClient.get(`/users/${userId}`), mapUserData);
}

export function fetchUserSchoolById(
    userId: string
): Promise<IApiResponse<ISchool>> {
    return mapResponseData(
        apiClient.get(`/users/${userId}/school`),
        mapSchoolData
    );
}

export function fetchSchoolOfficialsBySchoolId(
    schoolId: string,
    options?: IFetchUserArrayOptions
): Promise<IApiResponse<ISchoolOfficial[]>> {
    return fetchUsers({
        role: EUserRoles.SCHOOL_OFFICIAL,
        schoolId,
        ...options,
    }) as Promise<IApiResponse<ISchoolOfficial[]>>;
}

export function fetchStudentsBySchoolId(
    schoolId: string,
    options?: IFetchUserArrayOptions
): Promise<IApiResponse<IStudent[]>> {
    return fetchUsers({
        role: EUserRoles.STUDENT,
        schoolId,
        ...options,
    }) as Promise<IApiResponse<IStudent[]>>;
}

export function fetchInstructorsByCourseId(
    courseId: string,
    options?: IFetchUserArrayOptions
): Promise<IApiResponse<IInstructor[]>> {
    return fetchUsers({
        role: EUserRoles.INSTRUCTOR,
        courseId,
        ...options,
    }) as Promise<IApiResponse<IInstructor[]>>;
}

export function fetchStudentsByCourseId(
    courseId: string,
    options?: IFetchUserArrayOptions
): Promise<IApiResponse<IStudent[]>> {
    return fetchUsers({
        role: EUserRoles.STUDENT,
        courseId,
        ...options,
    }) as Promise<IApiResponse<IStudent[]>>;
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

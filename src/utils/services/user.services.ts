import { IUserOriginal } from "../types/user.types";
import { ICourseOriginal, ISchoolOriginal } from "../types";
import { apiClient } from "../helpers";
import { IApiResponse } from "../types/api.types";

export function fetchUserById(
    id: string
): Promise<IApiResponse<IUserOriginal>> {
    return apiClient.get(`/users/${id}`);
}

export function fetchUserCoursesById(
    id: string
): Promise<IApiResponse<ICourseOriginal[]>> {
    return apiClient.get(`/users/${id}/courses`);
}

export function fetchUserSchoolById(
    id: string
): Promise<IApiResponse<ISchoolOriginal>> {
    return apiClient.get(`/users/${id}/school`);
}

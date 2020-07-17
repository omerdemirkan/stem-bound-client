import { apiClient } from "../helpers";
import { ICourseOriginal, IApiResponse, ISchoolOriginal } from "../types";

export function fetchCoursesByUserId(
    userId: string
): Promise<IApiResponse<ICourseOriginal[]>> {
    return apiClient.get(`/users/${userId}/courses`);
}

export function fetchCoursesBySchoolId(
    id: string
): Promise<IApiResponse<ISchoolOriginal[]>> {
    return apiClient.get(`/schools/${id}/courses`);
}

export function fetchCourseById(
    courseId: string
): Promise<IApiResponse<ICourseOriginal>> {
    return apiClient.get(`/courses/${courseId}`);
}

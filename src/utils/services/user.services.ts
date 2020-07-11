import { IUser } from "../types/user.types";
import { ICourseOriginal, ISchoolOriginal } from "../types";
import { apiClient } from "../helpers";

export function fetchUserById(
    id: string
): Promise<{ message: string; data: IUser }> {
    return apiClient.get(`/users/${id}`);
}

export function fetchUserCoursesById(
    id: string
): Promise<{ message: string; data: ICourseOriginal[] }> {
    return apiClient.get(`/users/${id}/courses`);
}

export function fetchUserSchoolById(
    id: string
): Promise<{ message: string; data: ISchoolOriginal }> {
    return apiClient.get(`/users/${id}/school`);
}

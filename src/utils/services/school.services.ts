import { ISchoolOriginal, ICourseOriginal } from "../types";
import { ISchoolOfficial, IStudent } from "../types/user.types";
import { apiClient } from "../helpers";
import { IApiResponse } from "../types/api.types";

export function fetchSchoolById(
    id: string
): Promise<IApiResponse<ISchoolOriginal>> {
    return apiClient.get(`/schools/${id}`);
}

export function fetchSchoolCoursesById(
    id: string
): Promise<IApiResponse<ISchoolOriginal[]>> {
    return apiClient.get(`/schools/${id}/courses`);
}

// Excuse the awkward naming. This is to avoid confusion with fetchSchoolOfficialsById
export function fetchSchoolSchoolOfficialsById(
    id: string
): Promise<IApiResponse<ISchoolOfficial[]>> {
    return apiClient.get(`/schools/${id}/school-officials`);
}

export async function fetchSchoolStudentsById(
    id: string
): Promise<IApiResponse<IStudent[]>> {
    return apiClient.get(`/schools/${id}/students`);
}

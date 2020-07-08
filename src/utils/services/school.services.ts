import { ISchoolOriginal, ICourseOriginal } from "../types";
import { ISchoolOfficial, IStudent } from "../types/user.types";
import { apiClient } from "../helpers";

export function fetchSchoolById(id: string): Promise<ISchoolOriginal> {
    return apiClient.get(`/schools/${id}`);
}

export function fetchSchoolCoursesById(id: string): Promise<ICourseOriginal> {
    return apiClient.get(`/schools/${id}/courses`);
}

// Excuse the awkward naming. This is to avoid confusion with fetchSchoolOfficialsById
export function fetchSchoolSchoolOfficialsById(
    id: string
): Promise<ISchoolOfficial> {
    return apiClient.get(`/schools/${id}/school-officials`);
}

export async function fetchSchoolStudentsById(id: string): Promise<IStudent[]> {
    return apiClient.get(`/schools/${id}/students`);
}

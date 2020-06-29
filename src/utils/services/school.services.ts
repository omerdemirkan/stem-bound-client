import { ISchoolOriginal, ICourseOriginal } from "../types";
import { ISchoolOfficial, IStudent } from "../types/user.types";
import { apiClient } from "./client.services";

export async function fetchSchoolById(id: string): Promise<ISchoolOriginal> {
    const res = await apiClient.get(`/school/${id}`);
    return (res as any).data;
}

export async function fetchSchoolCoursesById(
    id: string
): Promise<ICourseOriginal> {
    const res = await apiClient.get(`/school/${id}/courses`);
    return (res as any).data;
}

// Excuse the awkward naming. This is to avoid confusion with fetchSchoolOfficialsById
export async function fetchSchoolSchoolOfficialsById(
    id: string
): Promise<ISchoolOfficial> {
    const res = await apiClient.get(`/school/${id}/school-officials`);
    return (res as any).data;
}

export async function fetchSchoolStudentsById(id: string): Promise<IStudent[]> {
    const res = await apiClient.get(`/school/${id}/students`);
    return (res as any).data;
}

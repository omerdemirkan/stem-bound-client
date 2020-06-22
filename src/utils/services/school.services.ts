import { ISchoolOriginal, ICourseOriginal } from "../types";
import { ISchoolOfficial, IStudent } from "../types/user.types";
import { BASE_URL } from "../constants";

export async function fetchSchoolById(id: string): Promise<ISchoolOriginal> {
    const res = await fetch(`${BASE_URL}/school/${id}`).then((res) =>
        res.json()
    );
    return (res as any).data;
}

export async function fetchSchoolCoursesById(
    id: string
): Promise<ICourseOriginal> {
    const res = await fetch(`${BASE_URL}/school/${id}/courses`).then((res) =>
        res.json()
    );
    return (res as any).data;
}

// Excuse the awkward naming. This is to avoid confusion with fetchSchoolOfficialsById
export async function fetchSchoolSchoolOfficialsById(
    id: string
): Promise<ISchoolOfficial> {
    const res = await fetch(
        `${BASE_URL}/school/${id}/school-officials`
    ).then((res) => res.json());
    return (res as any).data;
}

export async function fetchSchoolStudentsById(id: string): Promise<IStudent[]> {
    const res = await fetch(`${BASE_URL}/school/${id}/students`).then((res) =>
        res.json()
    );
    return (res as any).data;
}

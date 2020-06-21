import { ISchoolOriginal } from "../types/school.types";
import { BASE_URL } from "../constants";

export async function fetchSchoolsByLocation({
    latitude,
    longitude,
}: {
    latitude: number;
    longitude: number;
}): Promise<ISchoolOriginal[]> {
    const res = await fetch(
        `${BASE_URL}/school?long=${longitude}&lat=${latitude}`
    );
    return (await res.json()).data;
}

export async function fetchSchoolById(id: string) {
    const res = await fetch(`${BASE_URL}/school/${id}`);
    return (await res.json()).data;
}

export async function fetchSchoolClassesById(id: string) {
    const res = await fetch(`${BASE_URL}/school/${id}/classes`);
    return (await res.json()).data;
}

// Excuse the awkward naming. This is to avoid a name collision with fetchSchoolOfficialsById
export async function fetchSchoolSchoolOfficialsById(id: string) {
    const res = await fetch(`${BASE_URL}/school/${id}/school-officials`);
    return (await res.json()).data;
}

export async function fetchSchoolStudentsById(id: string) {
    const res = await fetch(`${BASE_URL}/school/${id}/students`);
    return (await res.json()).data;
}

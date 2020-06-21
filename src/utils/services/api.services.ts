import { ISchoolOriginal } from "../types";
import { BASE_URL } from "../constants";
import axios from "axios";

export const fetch = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
    headers: { authorization: "Bearer <access_token>" },
});

export async function fetchSchoolsByLocation(options: {
    latitude: number;
    longitude: number;
}): Promise<ISchoolOriginal[]> {
    const { data } = await fetch.get(
        `${BASE_URL}/school?long=${options.longitude}&lat=${options.latitude}`
    );
    return data;
}

export async function fetchSchoolById(id: string) {
    const { data } = await fetch.get(`/school/${id}`);
    return data;
}

export async function fetchSchoolCoursesById(id: string) {
    const { data } = await fetch.get(`/school/${id}/courses`);
    return data;
}

// Excuse the awkward naming. This is to avoid a name collision with fetchSchoolOfficialsById
export async function fetchSchoolSchoolOfficialsById(id: string) {
    const { data } = await fetch.get(`/school/${id}/school-officials`);
    return data;
}

export async function fetchSchoolStudentsById(id: string) {
    const { data } = await fetch.get(`/school/${id}/students`);
    return data;
}

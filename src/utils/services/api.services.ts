import { ISchoolOriginal, ICourseOriginal } from "../types";
import { BASE_URL } from "../constants";
import axios from "axios";
import {
    EUserRoles,
    ISchoolOfficial,
    IStudent,
    IUser,
} from "../types/user.types";

export const fetch = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
    headers: { authorization: "Bearer <access_token>" },
});

export async function fetchSchoolsByLocation(options: {
    latitude: number;
    longitude: number;
    limit?: number;
    skip?: number;
}): Promise<ISchoolOriginal[]> {
    let url = `${BASE_URL}/school?long=${options.longitude}&lat=${options.latitude}`;

    if (options.skip) {
        url += `&skip=${options.skip}`;
    }
    if (options.limit) {
        url += `&limit=${options.limit}`;
    }
    const { data } = await fetch.get(url);
    return data;
}

export async function fetchSchoolById(id: string): Promise<ISchoolOriginal> {
    const { data } = await fetch.get(`/school/${id}`);
    return data;
}

export async function fetchSchoolCoursesById(
    id: string
): Promise<ICourseOriginal> {
    const { data } = await fetch.get(`/school/${id}/courses`);
    return data;
}

// Excuse the awkward naming. This is to avoid confusion with fetchSchoolOfficialsById
export async function fetchSchoolSchoolOfficialsById(
    id: string
): Promise<ISchoolOfficial> {
    const { data } = await fetch.get(`/school/${id}/school-officials`);
    return data;
}

export async function fetchSchoolStudentsById(id: string): Promise<IStudent[]> {
    const { data } = await fetch.get(`/school/${id}/students`);
    return data;
}

export async function fetchUsers(options: {
    role: EUserRoles;
    limit?: number;
    skip?: number;
    sortField?: string;
    sortDirection?: number;
}): Promise<IUser[]> {
    let url = `/user?role=${options.role}`;
    if (options.skip) {
        url += `&skip=${options.skip}`;
    }
    if (options.limit) {
        url += `&limit=${options.limit}`;
    }
    if (options.sortDirection && options.sortField) {
        url += `&sort_field=${options.sortField}&sort_direction=${options.sortDirection}`;
    }
    const { data } = await fetch.get(url);

    return data;
}

export async function fetchUserById(id: string) {
    const { data } = await fetch.get(`/user/${id}`);
    return data;
}

import { ISchoolOriginal, fetchSchoolsOptions } from "../types";
import { BASE_URL } from "../constants";
import { EUserRoles, IUser } from "../types/user.types";

export async function fetchSchools(
    options: fetchSchoolsOptions
): Promise<ISchoolOriginal[]> {
    let url = `${BASE_URL}/school?long=${options.longitude}&lat=${options.latitude}`;

    if (options.skip) {
        url += `&skip=${options.skip}`;
    }
    if (options.limit) {
        url += `&limit=${options.limit}`;
    }
    const res = await fetch(url).then((res) => res.json());
    return (res as any).data;
}

export async function fetchUsers(options: {
    role: EUserRoles;
    limit?: number;
    skip?: number;
    sortField?: string;
    sortDirection?: number;
}): Promise<IUser[]> {
    let url = `${BASE_URL}/user?role=${options.role}`;
    if (options.skip) {
        url += `&skip=${options.skip}`;
    }
    if (options.limit) {
        url += `&limit=${options.limit}`;
    }
    if (options.sortDirection && options.sortField) {
        url += `&sort_field=${options.sortField}&sort_direction=${options.sortDirection}`;
    }
    const res = await fetch(url).then((res) => res.json());

    return (res as any).data;
}

export async function fetchCourses(options: {}) {
    const res = await fetch(`${BASE_URL}/course`);
}

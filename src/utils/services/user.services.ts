import { IUser } from "../types/user.types";
import { ICourseOriginal, ISchoolOriginal } from "../types";

export async function fetchUserById(id: string): Promise<IUser> {
    const res = await fetch(`/users/${id}`).then((res) => res.json());
    return (res as any).data;
}

export async function fetchUserCoursesById(
    id: string
): Promise<ICourseOriginal[]> {
    const res = await fetch(`/users/${id}/courses`).then((res) => res.json());
    return (res as any).data;
}

export async function fetchUserSchoolById(
    id: string
): Promise<ISchoolOriginal> {
    const res = await fetch(`/users/${id}/school`).then((res) => res.json());
    return (res as any).data;
}

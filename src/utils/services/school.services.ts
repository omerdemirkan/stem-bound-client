import { ISchoolOriginal } from "../types/school.types";
import { BASE_URL } from "../config";

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

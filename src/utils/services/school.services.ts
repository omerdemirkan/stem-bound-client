import { ISchoolOriginal, IFetchSchoolsOptions } from "../types";
import { apiClient, appendQueriesToUrl } from "../helpers";
import { IApiResponse } from "../types/api.types";

export async function fetchSchools({
    coordinates,
    limit,
    skip,
    text,
    withSchoolOfficials,
}: IFetchSchoolsOptions): Promise<IApiResponse<ISchoolOriginal[]>> {
    const path = appendQueriesToUrl("/schools", {
        lat: coordinates?.latitude,
        long: coordinates?.longitude,
        limit,
        skip,
        text,
        with_school_officials: withSchoolOfficials,
    });
    return apiClient.get(path);
}

export function fetchSchoolById(
    id: string
): Promise<IApiResponse<ISchoolOriginal>> {
    return apiClient.get(`/schools/${id}`);
}

export function fetchSchoolByUserId(
    id: string
): Promise<IApiResponse<ISchoolOriginal>> {
    return apiClient.get(`/users/${id}/school`);
}

export function fetchSchoolByCourseId(
    id: string
): Promise<IApiResponse<ISchoolOriginal>> {
    return apiClient.get(`/courses/${id}/school`);
}

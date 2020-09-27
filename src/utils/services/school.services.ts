import { ISchool, IFetchSchoolsOptions } from "../types";
import {
    apiClient,
    appendQueriesToUrl,
    mapResponseData,
    mapSchoolData,
} from "../helpers";
import { IApiResponse } from "../types/api.types";

export function fetchSchools({
    coordinates,
    limit,
    skip,
    text,
    withSchoolOfficials,
}: IFetchSchoolsOptions): Promise<IApiResponse<ISchool[]>> {
    const path = appendQueriesToUrl("/schools", {
        lat: coordinates?.latitude,
        long: coordinates?.longitude,
        limit,
        skip,
        text,
        with_school_officials: withSchoolOfficials,
    });
    return mapResponseData(apiClient.get(path), mapSchoolData);
}

export function fetchSchoolById(id: string): Promise<IApiResponse<ISchool>> {
    return mapResponseData(apiClient.get(`/schools/${id}`), mapSchoolData);
}

export function fetchSchoolByUserId(
    id: string
): Promise<IApiResponse<ISchool>> {
    return mapResponseData(apiClient.get(`/users/${id}/school`), mapSchoolData);
}

export function fetchSchoolByCourseId(
    id: string
): Promise<IApiResponse<ISchool>> {
    return mapResponseData(
        apiClient.get(`/courses/${id}/school`),
        mapSchoolData
    );
}

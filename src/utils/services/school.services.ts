import { ISchool, IFetchSchoolsOptions } from "../types";
import {
    apiClient,
    appendQueriesToUrl,
    mapResponseData,
    mapSchoolData,
} from "../helpers";
import { IApiResponse } from "../types/api.types";

export function fetchSchools(
    options: IFetchSchoolsOptions = {}
): Promise<IApiResponse<ISchool[]>> {
    const path = appendQueriesToUrl("/schools", {
        lat: options.coordinates?.latitude,
        long: options.coordinates?.longitude,
        limit: options.limit,
        skip: options.skip,
        text: options.text,
        geo_ip: options.geoIp,
        filter: options.filterObj,
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

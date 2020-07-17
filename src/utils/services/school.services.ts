import { ISchoolOriginal, IFetchSchoolsOptions } from "../types";
import { apiClient, appendQueriesToUrl } from "../helpers";
import { IApiResponse } from "../types/api.types";

export async function fetchSchools(
    options: IFetchSchoolsOptions
): Promise<IApiResponse<ISchoolOriginal[]>> {
    let path = "/schools";
    let queries: any = {};

    if (options.coordinates) {
        const { latitude, longitude } = options.coordinates;
        queries.long = longitude;
        queries.lat = latitude;
    }

    if (options.skip) {
        queries.skip = options.skip;
    }
    if (options.limit) {
        queries.limit = options.limit;
        path += `&limit=${options.limit}`;
    }
    if (options.withSchoolOfficials) {
        queries.with_school_officials = 1;
    }
    if (options.text) {
        queries.text = options.text;
    }
    return apiClient.get(appendQueriesToUrl(path, queries));
}

export function fetchSchoolById(
    id: string
): Promise<IApiResponse<ISchoolOriginal>> {
    return apiClient.get(`/schools/${id}`);
}

import { apiClient } from "../helpers";
import { ILocationData, IFetchLocationOptions } from "../types/location.types";
import { IApiResponse } from "../types/api.types";

export function fetchLocations({
    text,
}: IFetchLocationOptions): Promise<IApiResponse<ILocationData[]>> {
    return apiClient.get(`/locations?text=${text}`);
}

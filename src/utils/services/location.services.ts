import { apiClient } from "../helpers";
import { ILocationData } from "../types/location.types";
import { IApiResponse } from "../types/api.types";

export function fetchLocations(options: {
    text: string;
}): Promise<IApiResponse<ILocationData[]>> {
    return apiClient.get(`/locations?text=${options.text}`);
}

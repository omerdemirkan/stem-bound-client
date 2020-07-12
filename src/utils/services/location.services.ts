import { apiClient } from "../helpers";
import { ILocationData } from "../types/location.types";

export function fetchLocations(options: {
    text: string;
}): Promise<{ message: string; data: ILocationData[] }> {
    return apiClient.get(`/locations?text=${options.text}`);
}

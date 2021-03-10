// promise is wrapped in function to avoid immediate execution and to allow for multiple calls.

import { fetchLocations } from "../services";
import { ICoordinates, ISelectInputOption } from "../types";

// promise exists because to avoid callback hell where ever this function is used.
export const getCurrentLocation = () => {
    return new Promise<ICoordinates>(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(
            function ({ coords }: { coords: ICoordinates }): void {
                const { latitude, longitude } = coords;
                resolve({
                    latitude,
                    longitude,
                });
            },
            function (error: any): void {
                reject(error);
            }
        );
    });
};

export async function fetchLocationZipcodeInputOptions(
    text: string
): Promise<ISelectInputOption[]> {
    try {
        const { data } = await fetchLocations({ text });
        const LocationZipcodeInputs = data.map((location) => ({
            display: `${location.city}, ${location.state}`,
            value: location.zip,
        }));
        return LocationZipcodeInputs;
    } catch (e) {
        return [];
    }
}

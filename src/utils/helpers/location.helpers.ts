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

// promise is wrapped in function to avoid immediate execution and to allow for multiple calls.
// promise exists because to avoid callback hell where ever this function is used.
export const getLocation = () => {
    return new Promise<{ latitude: number; longitude: number }>(function (
        resolve,
        reject
    ) {
        navigator.geolocation.getCurrentPosition(
            function ({
                coords,
            }: {
                coords: { latitude: number; longitude: number };
            }): void {
                const { latitude, longitude } = coords;
                console.log(latitude, longitude);
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

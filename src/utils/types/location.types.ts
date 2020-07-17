export interface IGeoJSON {
    type: "Point";
    coordinates: number[];
}

export interface ILocationData {
    zip: string;
    city: string;
    state: string;
    geoJSON: IGeoJSON;
}

export interface ICoordinates {
    latitude: number;
    longitude: number;
}

export interface IUserLocation {
    zip: string;
    city: string;
    state: string;
    geoJSON: IGeoJSON;
}

export interface ILocationData {
    zip: string;
    city: string;
    state: string;
    geoJSON: {
        type: "Point";
        coordinates: number[];
    };
}

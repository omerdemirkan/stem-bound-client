import { ICoordinates } from "./location.types";

export interface ISchoolOriginal {
    _id: string;
    name: string;
    distance?: {
        calculated: number;
    };
    demographics: {
        enrollment: number;
        numTeachers: number;
        url: string;
    };
    districtId: string;
    startGrade: number;
    endGrade: number;
    location: {
        country: string;
        state: string;
        city: string;
        zip: string;
        county: string;
        geoJSON: {
            type: "Point";
            coordinates: number[];
        };
        latitude: number;
        longitude: number;
    };
    meta: {
        schoolOfficials: string[];
        students: string[];
        courses: string[];
    };
    contact: {
        telephone: string;
        website: string;
    };
    status: number;
    type: number;
    ncesid: string;
}

export interface ISchool {
    // this is to decouple the client from
    // the db so that if the shape of the data
    // changes we can update one place.
    ncesid: string;
    name: string;
    distance?: {
        miles: number;
        kilometers: number;
    };
    contact: {
        website: string | null;
        telephone: string | null;
    };
    location: {
        country: string;
        state: string;
        city: string;
        county: string;
        zip: string;
        latitude: number;
        longitude: number;
        shortDisplay: string;
        longDisplay: string;
    };
    demographics: {
        enrollment: number;
        numTeachers: number;
        url: string;
    };
    status: {
        code: number;
        description: string;
    };
    type: {
        code: number;
        description: string;
    };
    startGrade: number;
    endGrade: number;
    meta: {
        schoolOfficials: string[];
        students: string[];
        courses: string[];
    };
}

export interface IFetchSchoolsOptions {
    coordinates?: ICoordinates;
    limit?: number;
    skip?: number;
    text?: string;
    geoIp?: string;
    filterObj?: any;
}

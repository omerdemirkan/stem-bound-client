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

export interface ISchoolMapped {
    // this is to decouple the client from
    // the db so that if the shape of the data
    // changes we can update one place.
}

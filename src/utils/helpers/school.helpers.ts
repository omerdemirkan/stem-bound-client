import { ISchoolOriginal, ISchoolMapped } from "../types";
import { schoolStatusCodes, schoolTypes } from "../constants";
import { capitalizeWords } from ".";

export function mapSchoolData(schoolData: ISchoolOriginal[]): ISchoolMapped[] {
    return schoolData.map((school: ISchoolOriginal) => ({
        _id: school._id,
        name: capitalizeWords(school.name),
        distance: {
            // conversion from meters
            miles: school.distance?.calculated * 0.000621371,
            kilometers: school.distance?.calculated * 0.001,
        },
        meta: school.meta,
        contact: {
            telephone:
                school.contact.telephone !== "NOT AVAILABLE"
                    ? school.contact.telephone
                    : null,
            website:
                school.contact.website !== "NOT AVAILABLE"
                    ? school.contact.website
                    : null,
        },
        location: {
            country: school.location.country,
            state: school.location.state,
            city: school.location.city,
            county: school.location.county,
            zip: school.location.zip,
            latitude: school.location.latitude,
            longitude: school.location.longitude,
        },
        type: {
            code: school.type,
            description: toSchoolTypeDescription(school.type),
        },
        status: {
            code: school.status,
            description: toSchoolStatusCodeDescription(school.status),
        },
        demographics: {
            enrollment: school.demographics.enrollment,
            numTeachers: school.demographics.numTeachers,
            url: school.demographics.url,
        },
        startGrade: school.startGrade,
        endGrade: school.endGrade,
    }));
}

function toSchoolStatusCodeDescription(statusCode: number): string {
    return schoolStatusCodes[statusCode.toString()];
}

function toSchoolTypeDescription(type: number): string {
    return schoolTypes[type.toString()];
}

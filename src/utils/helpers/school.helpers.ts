import { ISchoolOriginal, ISchool, ISelectInputOption } from "../types";
import { schoolStatusCodes, schoolTypes } from "../constants";
import { capitalizeWords } from ".";
import { fetchSchools } from "../services";

export async function fetchSchoolInputOptions(
    s: string
): Promise<ISelectInputOption[]> {
    const { data: schools } = await fetchSchools({ text: s });
    return schools.map((school) => ({
        display: capitalizeWords(school.name),
        value: school.ncesid,
    }));
}

export function mapSchoolData(school: ISchoolOriginal): ISchool {
    return {
        ncesid: school.ncesid,
        name: capitalizeWords(school.name),
        distance: {
            // conversion from meters
            miles: +(school.distance?.calculated * 0.000621371).toFixed(2),
            kilometers: +(school.distance?.calculated * 0.001).toFixed(2),
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
            shortDisplay: getSchoolLocationShortDisplay(school),
            longDisplay: getSchoolLocationLongDisplay(school),
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
    };
}

function toSchoolStatusCodeDescription(statusCode: number): string {
    return schoolStatusCodes[statusCode.toString()];
}

function toSchoolTypeDescription(type: number): string {
    return schoolTypes[type.toString()];
}

export function getSchoolLocationShortDisplay(school: ISchoolOriginal): string {
    if (!school) return "";
    return `${capitalizeWords(school.location.city)}, ${capitalizeWords(
        school.location.county
    )} ${school.location.state}`;
}

export function getSchoolLocationLongDisplay(school: ISchoolOriginal): string {
    return `${getSchoolLocationShortDisplay(school)} ${
        school.distance ? school.distance + " miles away" : ""
    }`;
}

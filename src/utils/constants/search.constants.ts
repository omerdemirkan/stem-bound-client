import { ISelectInputOption, EUserRoles } from "../types";
import { ESearchQueries } from "../types/search.types";

export const searchQueryInputOptions: ISelectInputOption[] = [
    {
        display: "Instructors",
        value: ESearchQueries.INSTRUCTOR,
    },
    {
        display: "School Officials",
        value: ESearchQueries.SCHOOL_OFFICIAL,
    },
    {
        display: "Students",
        value: ESearchQueries.STUDENT,
    },
];

export const defaultSearchQueries = {
    [EUserRoles.INSTRUCTOR]: ESearchQueries.SCHOOL_OFFICIAL,
    [EUserRoles.STUDENT]: ESearchQueries.INSTRUCTOR,
    [EUserRoles.SCHOOL_OFFICIAL]: ESearchQueries.INSTRUCTOR,
};

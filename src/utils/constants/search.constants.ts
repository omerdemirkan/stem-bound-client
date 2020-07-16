import { EUserRoles } from "../types";
import { ESearchQueries, ISearchOption } from "../types";

export const searchQueryInputOptions: ISearchOption[] = [
    {
        display: "Instructors",
        query: ESearchQueries.INSTRUCTOR,
    },
    {
        display: "School Officials",
        query: ESearchQueries.SCHOOL_OFFICIAL,
    },
    {
        display: "Students",
        query: ESearchQueries.STUDENT,
    },
];

export const defaultSearchQueries = {
    [EUserRoles.INSTRUCTOR]: ESearchQueries.SCHOOL_OFFICIAL,
    [EUserRoles.STUDENT]: ESearchQueries.INSTRUCTOR,
    [EUserRoles.SCHOOL_OFFICIAL]: ESearchQueries.INSTRUCTOR,
};

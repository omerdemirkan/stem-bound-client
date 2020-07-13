import { ISelectInputOption } from "../types";
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

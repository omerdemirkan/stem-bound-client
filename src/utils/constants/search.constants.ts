import { EUserRoles } from "../types";
import { ESearchFields, ISearchOption } from "../types";

export const searchFieldInputOptions: ISearchOption[] = [
    {
        display: "Instructors",
        searchField: ESearchFields.INSTRUCTOR,
    },
    {
        display: "School Officials",
        searchField: ESearchFields.SCHOOL_OFFICIAL,
    },
    {
        display: "Students",
        searchField: ESearchFields.STUDENT,
    },
];

export const defaultSearchFields = {
    [EUserRoles.INSTRUCTOR]: ESearchFields.SCHOOL_OFFICIAL,
    [EUserRoles.STUDENT]: ESearchFields.INSTRUCTOR,
    [EUserRoles.SCHOOL_OFFICIAL]: ESearchFields.INSTRUCTOR,
};
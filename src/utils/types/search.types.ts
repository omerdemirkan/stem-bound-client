import { EUserRoles, IUser, IFetchUsersOptions } from "./user.types";
import { ISchool, IFetchSchoolsOptions } from "./school.types";

export enum ESearchFields {
    "SCHOOL_OFFICIAL" = EUserRoles.SCHOOL_OFFICIAL,
    "STUDENT" = EUserRoles.STUDENT,
    "INSTRUCTOR" = EUserRoles.INSTRUCTOR,
}

export interface ISearchOption {
    display: string;
    searchField: ESearchFields;
}

export type ISearchData = IUser | ISchool;

export type IFetchSearchDataOptions = (
    | IFetchUsersOptions
    | IFetchSchoolsOptions
) & {
    field: ESearchFields;
};
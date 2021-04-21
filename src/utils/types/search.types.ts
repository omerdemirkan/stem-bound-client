import { EUserRoles, IUser, IFetchUserArrayOptions } from "./user.types";
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

export interface ISearchData {
    data: IUser[];
    count: number;
}

export type IFetchSearchDataOptions =
    | IFetchUserArrayOptions
    | IFetchSchoolsOptions;

export interface ISearchQuery extends IFetchUserArrayOptions {
    searchField: ESearchFields;
}

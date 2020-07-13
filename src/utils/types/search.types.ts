import { EUserRoles, IUser } from "./user.types";
import { ISchool } from "./school.types";

export enum ESearchQueries {
    "SCHOOL_OFFICIAL" = EUserRoles.SCHOOL_OFFICIAL,
    "STUDENT" = EUserRoles.STUDENT,
    "INSTRUCTOR" = EUserRoles.INSTRUCTOR,
}

export type ISearchData = IUser | ISchool;

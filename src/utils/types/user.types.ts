import { IUserLocation, ICoordinates } from "./location.types";

interface baseUserOriginal {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    hash?: string;
    password?: string;
    shortDescription: string;
    longDescription: string;
    profilePictureUrl: string;
    role: EUserRoles;
    location: IUserLocation;
}

export interface IStudentOriginal extends baseUserOriginal {
    interests: string[];
    meta: {
        school: string;
        courses: string;
        chats: string[];
    };
}

export interface IInstructorOriginal extends baseUserOriginal {
    specialties: string[];
    meta: {
        courses: string[];
        chats: string[];
    };
}

export interface ISchoolOfficialOriginal extends baseUserOriginal {
    position: string;
    meta: {
        school: string;
        chats: string[];
    };
}

export type IUserOriginal =
    | ISchoolOfficialOriginal
    | IInstructorOriginal
    | IStudentOriginal;

export enum EUserRoles {
    SCHOOL_OFFICIAL = "SCHOOL_OFFICIAL",
    STUDENT = "STUDENT",
    INSTRUCTOR = "INSTRUCTOR",
    ADMIN = "ADMIN",
    GUEST = "GUEST",
}

interface baseUser {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    shortDescription: string;
    longDescription: string;
    profilePictureUrl: string;
    role: EUserRoles;
    location: IUserLocation;
}

export interface IStudent extends baseUser {
    interests: string[];
    meta: {
        school: string;
        courses: string;
    };
}

export interface IInstructor extends baseUser {
    specialties: string[];
    meta: {
        courses: string[];
    };
}

export interface ISchoolOfficial extends baseUser {
    position: string;
    meta: {
        school: string;
    };
}

export type IUser = ISchoolOfficial | IInstructor | IStudent;

export interface IFetchUsersOptions {
    role: EUserRoles;
    coordinates: ICoordinates;
    limit?: number;
    skip?: number;
    sortField?: string;
    sortDirection?: number;
    exclude: string[];
}

export interface IValidateUserRoleOptions {
    allowedUserRoles: EUserRoles[];
    userRole: any;
}

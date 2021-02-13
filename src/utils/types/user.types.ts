import { IUserLocation, ICoordinates } from "./location.types";

interface IBaseUserOriginal {
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

export interface IStudentOriginal extends IBaseUserOriginal {
    interests: string[];
    meta: {
        school: string;
        courses: string;
        chats: string[];
    };
    initialGradeLevel: number;
    initialSchoolYear: string;
}

export interface IInstructorOriginal extends IBaseUserOriginal {
    specialties: string[];
    meta: {
        courses: string[];
        chats: string[];
    };
}

export interface ISchoolOfficialOriginal extends IBaseUserOriginal {
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

export enum EUserDisplayRoles {
    SCHOOL_OFFICIAL = "School Official",
    STUDENT = "Student",
    INSTRUCTOR = "Instructor",
    ADMIN = "Admin",
    GUEST = "Guest",
}

interface IBaseUser {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    shortDescription: string;
    longDescription: string;
    profilePictureUrl: string;
    location: IUserLocation;
    role: EUserRoles;
    displayRole: EUserDisplayRoles;
    fullName: string;
}

export interface IStudent extends IBaseUser {
    interests: string[];
    meta: {
        school: string;
        courses: string;
    };
    gradeLevel: number;
}

export interface IInstructor extends IBaseUser {
    specialties: string[];
    meta: {
        courses: string[];
    };
    position: string;
}

export interface ISchoolOfficial extends IBaseUser {
    position: string;
    meta: {
        school: string;
    };
}

export type IUser = ISchoolOfficial | IInstructor | IStudent;

export interface IFetchUserArrayOptions {
    limit?: number;
    skip?: number;
    geoIp?: boolean;
    coordinates?: ICoordinates;
    exclude?: string[];
    userIds?: string[];
    text?: string;
    schoolId?: string;
    courseId?: string;
    chatId?: string;
}

export interface IValidateUserRoleOptions {
    allowedUserRoles: EUserRoles[];
    userRole: any;
}

export enum EUserRoles {
    SCHOOL_OFFICIAL = "SCHOOL_OFFICIAL",
    STUDENT = "STUDENT",
    INSTRUCTOR = "INSTRUCTOR",
    ADMIN = "ADMIN",
}

interface baseUser {
    firstName: string;
    lastName: string;
    email: string;
    hash?: string;
    password?: string;
    shortDescription: string;
    longDescription: string;
    role: EUserRoles;
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

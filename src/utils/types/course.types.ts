import { ETimeFrameType } from "./date.types";

export enum ECourseTypes {
    IN_PERSON = "IN_PERSON",
    REMOTE = "REMOTE",
    HYBRID = "HYBRID",
}

export enum EMeetingTypes {
    IN_PERSON = "IN_PERSON",
    REMOTE = "REMOTE",
}

export interface IMeetingOriginal {
    type: EMeetingTypes;
    roomNum?: string;
    url?: string;
    start: Date | string;
    end: Date | string;
    message: string;
    _id?: string;
}

export interface IMeeting {
    type: EMeetingTypes;
    displayType: string;
    roomNum?: string;
    url?: string;
    start: Date;
    end: Date;
    message: string;
    dateString: string;
    startTimeString: string;
    endTimeString: string;
    durationString: string;
    _id?: string;
    dateKey?: string;
}

export interface IAnnouncementOriginal {
    text: string;
    meta: {
        from: string;
        readBy: string;
    };
    _id?: string;
    createdAt?: string;
}

export interface IAnnouncement {
    text: string;
    meta: {
        from: string;
        readBy: string;
    };
    _id?: string;
    createdAt?: string;
}

export enum ECourseVerificationStatus {
    UNPUBLISHED = "UNPUBLISHED",
    PENDING_VERIFICATION = "PENDING_VERIFICATION",
    DISMISSED = "DISMISSED",
    VERIFIED = "VERIFIED",
}

export interface ICourseVerificationStatusUpdate {
    meta: { from: string };
    status: ECourseVerificationStatus;
    createdAt?: string;
}

export interface ICourseOriginal {
    _id: string;
    createdAt: string;
    title: string;
    verificationStatus: ECourseVerificationStatus;
    verificationHistory: ICourseVerificationStatusUpdate[];
    shortDescription: string;
    longDescription: string;
    remoteSyllabusUrl?: string;
    start: string;
    end: string;
    type: ECourseTypes;
    meetings: IMeetingOriginal[];
    announcements: IAnnouncementOriginal[];
    meta: {
        instructors: string[];
        students: string[];
        school: string;
    };
}

export interface ICourse {
    _id: string;
    createdAt: Date;
    title: string;
    verificationStatus: ECourseVerificationStatus;
    displayVerificationStatus: string;
    verificationHistory: ICourseVerificationStatusUpdate[];
    shortDescription: string;
    longDescription: string;
    remoteSyllabusUrl?: string;
    start: Date;
    end: Date;
    type: ECourseTypes;
    displayType: string;
    meetings: IMeeting[];
    announcements: IAnnouncement[];
    meta: {
        instructors: string[];
        students: string[];
        school: string;
    };
    timeFrameType: ETimeFrameType;
    displayTimeFrameType: string;
}

export type IMeetingInput = IMeetingOriginal & { dateKey: string };

export interface IMeetingDateDisplayData {
    dateString: string;
    startTimeString: string;
    endTimeString: string;
    durationString: string;
}

export interface IDefaultMeetingData {
    start: Date;
    end: Date;
    url?: string;
    roomNum?: string;
}

// COURSE SERVICE TYPES

export interface IFetchCourseArrayOptions {
    skip?: number;
    limit?: number;
    unverified?: boolean;
    verificationStatus?: ECourseVerificationStatus;
    schoolId?: string;
    instructorId?: string;
    studentId?: string;
    before?: Date;
    after?: Date;
}

export interface IFetchMeetingArrayOptions {
    limit?: number;
    skip?: number;
    before?: Date;
    after?: Date;
    type?: EMeetingTypes;
    roomNum?: string;
}

export interface IFetchAnnouncementArrayOptions {
    limit?: number;
    skip?: number;
    before?: Date;
    after?: Date;
}

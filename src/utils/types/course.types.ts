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
    type: string;
    roomNum?: string;
    start: Date;
    end: Date;
    message: string;
    _id?: string;
}

export interface IMeeting {
    type: string;
    roomNum?: string;
    start: Date;
    end: Date;
    message: string;
    _id?: string;
}

export interface IAnnouncementOriginal {
    text: string;
    meta: {
        from: string;
        readBy: string;
    };
    _id?: string;
    createdAt?: Date;
}

export interface IAnnouncement {
    text: string;
    meta: {
        from: string;
        readBy: string;
    };
    _id?: string;
    createdAt?: Date;
}

export interface ICourseOriginal {
    _id: string;
    createdAt: Date;
    title: string;
    shortDescription: string;
    longDescription: string;
    type: string;
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
    shortDescription: string;
    longDescription: string;
    type: {
        display: string;
        original: string;
    };
    meetings: IMeeting[];
    announcements: IAnnouncement[];
    meta: {
        instructors: string[];
        students: string[];
        school: string;
    };
}

// COURSE SERVICE TYPES

export interface IFetchMeetingsOptions {
    courseId: string;
    limit?: number;
    skip?: number;
}

export interface IFetchMeetingOptions {
    courseId: string;
    meetingId: string;
}

export interface IUpdateMeetingOptions {
    courseId: string;
    meetingId: string;
    meetingData: Partial<IMeetingOriginal>;
}

export interface ICreateMeetingsOptions {
    courseId: string;
}

export interface IDeleteMeetingOptions {
    courseId: string;
    meetingId: string;
}

export type IMeetingInput = IMeetingOriginal & { dateKey: string };

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
    verified: boolean;
    shortDescription: string;
    longDescription: string;
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
    verified: boolean;
    shortDescription: string;
    longDescription: string;
    type: ECourseTypes;
    displayType: string;
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

export interface IFetchSchoolCoursesOptions {
    unverified: boolean;
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

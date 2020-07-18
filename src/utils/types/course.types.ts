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
    title: string;
    shortDescription: string;
    longDescription: string;
    type: {
        display: string;
        original: string;
    };
    meetings: IMeetingOriginal[];
    announcements: IAnnouncementOriginal[];
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
    meetingsData: Partial<IMeetingOriginal[]>;
}

export interface IDeleteMeetingOptions {
    courseId: string;
    meetingId: string;
}

import {
    ICourseOriginal,
    ICourse,
    IMeetingOriginal,
    IMeeting,
    IAnnouncement,
    IAnnouncementOriginal,
} from "../types";
import { meetingTypes, courseTypes } from "../constants";

export function mapMeetingData(meeting: IMeetingOriginal): IMeeting {
    return {
        start: new Date(meeting.start),
        end: new Date(meeting.end),
        message: meeting.message,
        type: meeting.type,
        _id: meeting._id,
        roomNum: meeting.roomNum,
        url: meeting.url,
    };
}

export function mapAnnouncementData(
    announcement: IAnnouncementOriginal
): IAnnouncement {
    return {
        meta: announcement.meta,
        text: announcement.text,
        _id: announcement._id,
        createdAt: announcement.createdAt,
    };
}

export function mapCourseData(course: ICourseOriginal): ICourse {
    return {
        _id: course._id,
        createdAt: course.createdAt,
        title: course.title,
        type: {
            original: course.type,
            display: getCourseTypeDisplay(course.type),
        },
        longDescription: course.longDescription,
        shortDescription: course.shortDescription,
        meta: {
            instructors: course.meta.instructors,
            school: course.meta.school,
            students: course.meta.students,
        },
        meetings: course.meetings.map(mapMeetingData),
        announcements: course.announcements.map(mapAnnouncementData),
    };
}

function getMeetingTypeDisplay(type: string) {
    return meetingTypes[type];
}

function getCourseTypeDisplay(type: string) {
    return courseTypes[type];
}

export const minimumMeetingDurationMiliseconds = 1000 * 60 * 20;

export function validateMeetingDates({
    start,
    end,
}: {
    start: Date | string;
    end: Date | string;
}) {
    start = typeof start === "string" ? new Date(start) : start;
    end = typeof end === "string" ? new Date(end) : end;
    return (
        start < end &&
        end.getTime() - start.getTime() >= minimumMeetingDurationMiliseconds
    );
}

import {
    ICourseOriginal,
    ICourse,
    IMeetingOriginal,
    IMeeting,
    IAnnouncement,
    IAnnouncementOriginal,
} from "../types";
import { meetingTypes, courseTypes } from "../constants";
import moment from "moment";

export function mapMeetingData(meeting: IMeetingOriginal): IMeeting {
    return {
        start: moment(meeting.start),
        end: moment(meeting.end),
        message: meeting.message,
        type: meeting.type,
        _id: meeting._id,
        roomNum: meeting.roomNum,
    };
}

export function mapAnnouncementData(
    announcement: IAnnouncementOriginal
): IAnnouncement {
    return {
        meta: announcement.meta,
        text: announcement.text,
        _id: announcement._id,
        createdAt: moment(announcement.createdAt),
    };
}

export function mapCourseData(course: ICourseOriginal): ICourse {
    return {
        _id: course._id,
        createdAt: moment(course.createdAt),
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
    start: Date;
    end: Date;
}) {
    return (
        start < end &&
        end.getTime() - start.getTime() >= minimumMeetingDurationMiliseconds
    );
}

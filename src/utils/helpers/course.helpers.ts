import {
    ICourseOriginal,
    ICourse,
    IMeetingOriginal,
    IMeeting,
    IAnnouncement,
    IAnnouncementOriginal,
    IMeetingDateDisplayData,
    IMeetingInput,
    ECourseVerificationStatus,
} from "../types";
import {
    meetingTypes,
    courseTypes,
    courseVerificationStatuses,
} from "../constants";
import differenceInMinutes from "date-fns/differenceInMinutes";
import format from "date-fns/format";

export function mapMeetingData(meeting: IMeetingOriginal): IMeeting {
    const startDate = new Date(meeting.start);
    const endDate = new Date(meeting.end);
    const durationInMinutes = differenceInMinutes(endDate, startDate);
    const durationMinutes = durationInMinutes % 60;
    const durationHours = Math.floor(durationInMinutes / 60);

    return {
        start: new Date(meeting.start),
        end: new Date(meeting.end),
        message: meeting.message,
        type: meeting.type,
        displayType: getMeetingTypeDisplay(meeting.type),
        _id: meeting._id,
        roomNum: meeting.roomNum,
        url: meeting.url,
        dateString: format(new Date(meeting.start), "EEEE, MMMM do yyyy"),
        startTimeString: format(startDate, "h:mm a"),
        endTimeString: format(endDate, "h:mm a"),
        durationString: `${
            durationHours
                ? durationHours + ` hour${durationHours > 1 ? "s" : ""}`
                : ""
        }${durationMinutes && durationHours ? " and" : ""}${
            durationMinutes ? " " + durationMinutes + " minutes" : ""
        }`,
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
        type: course.type,
        displayType: getCourseTypeDisplay(course.type),
        longDescription: course.longDescription,
        shortDescription: course.shortDescription,
        meta: {
            instructors: course.meta.instructors,
            school: course.meta.school,
            students: course.meta.students,
        },
        meetings: course.meetings.map(mapMeetingData),
        announcements: course.announcements.map(mapAnnouncementData),
        verificationHistory: course.verificationHistory,
        verificationStatus: course.verificationStatus,
    };
}

export function getMeetingTypeDisplay(type: string) {
    return meetingTypes[type];
}

export function getCourseTypeDisplay(type: string) {
    return courseTypes[type];
}

export function getCourseVerificationStatusDisplay(
    courseVerificationStatus: string
) {
    return courseVerificationStatuses[courseVerificationStatus];
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

export function getMeetingDateDisplayData(
    meeting: IMeeting | IMeetingInput
): IMeetingDateDisplayData {
    const startDate = new Date(meeting.start);
    const endDate = new Date(meeting.end);
    const durationInMinutes = differenceInMinutes(endDate, startDate);
    const durationMinutes = durationInMinutes % 60;
    const durationHours = Math.floor(durationInMinutes / 60);

    return {
        dateString: format(new Date(meeting.start), "EEEE, MMMM do yyyy"),
        startTimeString: format(startDate, "h:mm a"),
        endTimeString: format(endDate, "h:mm a"),
        durationString: `${
            durationHours
                ? durationHours + ` hour${durationHours > 1 ? "s" : ""}`
                : ""
        }${durationMinutes && durationHours ? " and" : ""}${
            durationMinutes ? " " + durationMinutes + " minutes" : ""
        }`,
    };
}

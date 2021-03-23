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
    ENotificationTypes,
    IAlertData,
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
        createdAt: new Date(course.createdAt),
        title: course.title,
        type: course.type,
        displayType: getCourseTypeDisplay(course.type),
        longDescription: course.longDescription,
        shortDescription: course.shortDescription,
        start: new Date(course.start),
        end: new Date(course.end),
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

export function configureCourseVerificationUpdateAlertDTO(
    courseVerificationStatus: ECourseVerificationStatus,
    { course, schoolName }: { course: ICourse; schoolName: string }
): IAlertData {
    // @ts-ignore
    let alert: IAlertData = { type: ENotificationTypes.INFO };
    switch (courseVerificationStatus) {
        case ECourseVerificationStatus.PENDING_VERIFICATION:
            alert.headerText = "Are you sure you want to publish this course?";
            alert.bodyText = `${schoolName} school officials will be notified to either verify or dismiss "${course.title}"; this cannot be undone.`;
            break;
        case ECourseVerificationStatus.VERIFIED:
            alert.headerText = `Are you sure you want to ${
                course.verificationStatus ===
                ECourseVerificationStatus.DISMISSED
                    ? "re-"
                    : ""
            }verify this course?`;
            alert.bodyText = `This will notify the instructor${
                course.meta.instructors.length > 1 ? "s" : ""
            } and ${schoolName} students with a STEM-bound account.`;
            break;
        case ECourseVerificationStatus.DISMISSED:
            alert.headerText = `Are you sure you want to ${
                course.verificationStatus ===
                ECourseVerificationStatus.PENDING_VERIFICATION
                    ? "dismiss this course"
                    : "revoke this course's verification"
            }?`;
            alert.bodyText = `${schoolName} students will not have access to "${course.title}"`;
            break;
    }
    return alert;
}

export function configureCourseEnrollmentUpdateAlertDTO(
    action: "enroll" | "drop",
    course: ICourse
): IAlertData {
    // @ts-ignore
    let alert: IAlertData = { type: ENotificationTypes.INFO };
    if (action === "enroll") {
        alert.headerText = "Are you sure you want to enroll in this course?";
        alert.bodyText = `You may choose to drop "${course.title}" in the future.`;
    } else {
        alert.headerText = "Are you sure you want to drop this course?";
        alert.bodyText = `You may choose to re-enroll in "${course.title}" in the future; however, some information may be lost.`;
    }
    return alert;
}

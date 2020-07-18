import { ICourseOriginal, ICourse } from "../types/course.types";
import { meetingTypes, courseTypes } from "../constants/course.constants";

export function mapCourseData(courseData: ICourseOriginal[]): ICourse[] {
    return courseData.map(
        (course: ICourseOriginal): ICourse => ({
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
            meetings: [...course.meetings],
            announcements: [...course.announcements],
        })
    );
}

function getMeetingTypeDisplay(type: string) {
    return meetingTypes[type];
}

function getCourseTypeDisplay(type: string) {
    return courseTypes[type];
}

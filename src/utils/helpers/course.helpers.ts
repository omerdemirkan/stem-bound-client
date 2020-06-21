import {
    ICourseOriginal,
    ICourse,
    IClass,
    IClassOriginal,
} from "../types/course.types";
import { classTypes, courseTypes } from "../constants/course.constants";

export function mapCourseData(courseData: ICourseOriginal[]): ICourse[] {
    return courseData.map(
        (course: ICourseOriginal): ICourse => ({
            topic: course.topic,
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
            schedule: {
                classes: course.schedule.classes,
                // classes: course.schedule.classes.map((class: IClassOriginal) => ({
                //     type: class.type,
                //     roomNum: class.roomNum,
                //     start: class.start,
                //     end: class.end,
                //     message: class.message
                // }))
            },
        })
    );
}

function getClassTypeDisplay(type: string) {
    return classTypes[type];
}

function getCourseTypeDisplay(type: string) {
    return courseTypes[type];
}

import {
    fetchCourseById,
    fetchMeetingsByCourseId,
    fetchCoursesByUserId,
} from "./course.services";
import { IFetchMeetingsOptions } from "../types";

export function courseFetcher(id: string) {
    return async () => (await fetchCourseById(id))?.data;
}

export function courseMeetingsFetcher(options: IFetchMeetingsOptions) {
    return async () => (await fetchMeetingsByCourseId(options))?.data;
}

export function userCoursesFetcher(userId: string) {
    return async () => (await fetchCoursesByUserId(userId)).data;
}

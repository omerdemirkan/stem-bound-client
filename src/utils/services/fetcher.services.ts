import {
    fetchCourseById,
    fetchMeetingsByCourseId,
    fetchCoursesByUserId,
} from "./course.services";
import { IFetchMeetingsOptions, IFetchSearchDataOptions } from "../types";
import { fetchSearchData } from "./search.services";

export function courseFetcher(id: string) {
    return async () => (await fetchCourseById(id))?.data;
}

export function courseMeetingsFetcher(options: IFetchMeetingsOptions) {
    return async () => (await fetchMeetingsByCourseId(options))?.data;
}

export function userCoursesFetcher(userId: string) {
    return async () => (await fetchCoursesByUserId(userId)).data;
}

export function searchDataFetcher(options: IFetchSearchDataOptions) {
    return async () => (await fetchSearchData(options)).data;
}

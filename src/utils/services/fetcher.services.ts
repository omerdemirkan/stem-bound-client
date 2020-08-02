import {
    fetchCourseById,
    fetchMeetingsByCourseId,
    fetchCoursesByUserId,
} from "./course.services";
import {
    IFetchMeetingsOptions,
    IFetchSearchDataOptions,
    IFetchChatsOptions,
} from "../types";
import { fetchSearchData } from "./search.services";
import { fetchChatsByUserId, fetchChatById } from "./chat.services";

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

export function userChatsFetcher(id: string, options?: IFetchChatsOptions) {
    return async () => (await fetchChatsByUserId(id, options)).data;
}

export function chatFetcher(id: string) {
    return async () => (await fetchChatById(id)).data;
}
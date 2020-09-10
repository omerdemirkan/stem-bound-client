import {
    fetchCourseById,
    fetchMeetingsByCourseId,
    fetchCoursesByUserId,
    fetchAnnouncementsByCourseId,
    fetchCourseByIdUnmapped,
    fetchCoursesBySchoolId,
} from "./course.services";
import {
    IFetchMeetingsOptions,
    IFetchSearchDataOptions,
    IFetchChatsOptions,
    ICourseOriginal,
} from "../types";
import { fetchSearchData } from "./search.services";
import {
    fetchChatsByUserId,
    fetchChatById,
    fetchMessagesByChatId,
} from "./chat.services";
import { fetchUserById, fetchUserSchoolById } from "./user.services";

export function courseFetcher(id: string) {
    return async () => (await fetchCourseById(id))?.data;
}

export function courseFetcherUnmapped(id: string) {
    return async () => (await fetchCourseByIdUnmapped(id))?.data;
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

export function messagesFetcher(chatId: string) {
    return async () => (await fetchMessagesByChatId({ chatId })).data;
}

export function announcementsFetcher(courseId: string) {
    return async () => (await fetchAnnouncementsByCourseId(courseId)).data;
}

export function userFetcher(userId: string) {
    return async () => (await fetchUserById(userId)).data;
}

export function userSchoolFetcher(userId: string) {
    return async () => (await fetchUserSchoolById(userId)).data;
}

export function schoolCoursesFetcher(courseId: string) {
    return async () => (await fetchCoursesBySchoolId(courseId)).data;
}

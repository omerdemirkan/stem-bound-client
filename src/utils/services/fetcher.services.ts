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
    IFetchChatArrayOptions,
    IFetchSchoolCoursesOptions,
    IFetchUserCoursesOptions,
    IFetchMessageArrayOptions,
} from "../types";
import { fetchSearchData } from "./search.services";
import {
    fetchChats,
    fetchChatById,
    fetchMessagesByChatId,
} from "./chat.services";
import {
    fetchUserById,
    fetchUserSchoolById,
    fetchInstructorsByCourseId,
    fetchStudentsByCourseId,
    fetchSchoolOfficialsBySchoolId,
    fetchStudentsBySchoolId,
} from "./user.services";
import { fetchSchoolById } from "./school.services";

export function courseFetcher(id: string) {
    return async () => (await fetchCourseById(id))?.data;
}

export function courseFetcherUnmapped(id: string) {
    return async () => (await fetchCourseByIdUnmapped(id))?.data;
}

export function courseMeetingsFetcher(
    courseId: string,
    options?: IFetchMeetingsOptions
) {
    return async () => (await fetchMeetingsByCourseId(courseId, options))?.data;
}

export function userCoursesFetcher(
    userId: string,
    options?: IFetchUserCoursesOptions
) {
    return async () => (await fetchCoursesByUserId(userId, options)).data;
}

export function searchDataFetcher(options: IFetchSearchDataOptions) {
    return async () => (await fetchSearchData(options)).data;
}

export function chatsFetcher(options?: IFetchChatArrayOptions) {
    return async () => (await fetchChats(options)).data;
}

export function chatFetcher(chatId: string) {
    return async () => (await fetchChatById(chatId)).data;
}

export function messagesFetcher(
    chatId: string,
    options?: IFetchMessageArrayOptions
) {
    return async () => (await fetchMessagesByChatId(chatId, options)).data;
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

export function schoolCoursesFetcher(
    schoolId: string,
    options?: IFetchSchoolCoursesOptions
) {
    return async () => (await fetchCoursesBySchoolId(schoolId, options)).data;
}

export function schoolSchoolOfficialsFetcher(schoolId: string) {
    return async () => (await fetchSchoolOfficialsBySchoolId(schoolId)).data;
}

export function schoolStudentsFetcher(schoolId: string) {
    return async () => (await fetchStudentsBySchoolId(schoolId)).data;
}

export function schoolFetcher(schoolId: string) {
    return async () => (await fetchSchoolById(schoolId)).data;
}

export function courseInstructorsFetcher(courseId: string) {
    return async () => (await fetchInstructorsByCourseId(courseId)).data;
}

export function courseStudentsFetcher(courseId: string) {
    return async () => (await fetchStudentsByCourseId(courseId)).data;
}

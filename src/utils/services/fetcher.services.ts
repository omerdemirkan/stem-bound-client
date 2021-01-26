import {
    fetchCourseById,
    fetchMeetingsByCourseId,
    fetchCourses,
    fetchAnnouncementsByCourseId,
    fetchCoursesBySchoolId,
    fetchCoursesByUserId,
} from "./course.services";
import {
    IFetchMeetingArrayOptions,
    IFetchSearchDataOptions,
    IFetchChatArrayOptions,
    IFetchCourseArrayOptions,
    IFetchMessageArrayOptions,
    EUserRoles,
    IFetchUserArrayOptions,
    ESearchFields,
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
    fetchUsers,
} from "./user.services";
import { fetchSchoolByNcesId } from "./school.services";

export function coursesFetcher(options?: IFetchCourseArrayOptions) {
    return async () => (await fetchCourses(options)).data;
}

export function courseFetcher(id: string) {
    return async () => (await fetchCourseById(id))?.data;
}

export function courseMeetingsFetcher(
    courseId: string,
    options?: IFetchMeetingArrayOptions
) {
    return async () => (await fetchMeetingsByCourseId(courseId, options))?.data;
}

export function userCoursesFetcher(
    userId: string,
    role: EUserRoles,
    options?: IFetchCourseArrayOptions
) {
    return async () => (await fetchCoursesByUserId(userId, role, options)).data;
}

export function searchDataFetcher(
    searchField: ESearchFields,
    options: IFetchSearchDataOptions
) {
    return async () => (await fetchSearchData(searchField, options)).data;
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

export function usersFetcher(
    userRole: EUserRoles,
    options?: IFetchUserArrayOptions
) {
    return async () => (await fetchUsers(userRole, options)).data;
}

export function userFetcher(userId: string) {
    return async () => (await fetchUserById(userId)).data;
}

export function userSchoolFetcher(userId: string) {
    return async () => (await fetchUserSchoolById(userId)).data;
}

export function schoolCoursesFetcher(
    schoolId: string,
    options?: IFetchCourseArrayOptions
) {
    return async () => (await fetchCoursesBySchoolId(schoolId, options)).data;
}

export function schoolSchoolOfficialsFetcher(schoolId: string) {
    return usersFetcher(EUserRoles.SCHOOL_OFFICIAL, { schoolId });
}

export function schoolStudentsFetcher(schoolId: string) {
    return usersFetcher(EUserRoles.STUDENT, { schoolId });
}

export function schoolFetcher(ncesid: string) {
    return async () => (await fetchSchoolByNcesId(ncesid)).data;
}

export function courseInstructorsFetcher(courseId: string) {
    return usersFetcher(EUserRoles.INSTRUCTOR, { courseId });
}

export function courseStudentsFetcher(courseId: string) {
    return usersFetcher(EUserRoles.STUDENT, { courseId });
}

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
    IChat,
    IChatMessage,
    IFetchAnnouncementArrayOptions,
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
import { apiClient, mapResponseData } from "../helpers";
import { InfiniteFetcher } from "../../hooks/useInfiniteFetch";

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
    return async () => await fetchSearchData(searchField, options);
}

export function chatsFetcher(options?: IFetchChatArrayOptions) {
    return async () => (await fetchChats(options)).data;
}

export function chatsFetcherInfinite(
    options: IFetchChatArrayOptions = {}
): InfiniteFetcher<IChat[]> {
    return async function (prevChats) {
        if (prevChats?.length)
            options.before = new Date(
                prevChats[prevChats.length - 1].lastMessageSentAt
            );
        const { data, hasMore } = await fetchChats(options);
        return { data, hasMore };
    };
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

export function messagesFetcherInfinite(
    chatId: string,
    options?: IFetchMessageArrayOptions
): InfiniteFetcher<IChatMessage[]> {
    return async function (prevMessages) {
        const { data, hasMore } = await fetchMessagesByChatId(chatId, {
            ...options,
            before: prevMessages?.length
                ? new Date(prevMessages[prevMessages.length - 1].createdAt)
                : null,
        });
        return { data, hasMore };
    };
}

export function announcementsFetcher(
    courseId: string,
    options?: IFetchAnnouncementArrayOptions
) {
    return async () =>
        (await fetchAnnouncementsByCourseId(courseId, options)).data;
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

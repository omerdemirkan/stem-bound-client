import {
    ICourseOriginal,
    IApiResponse,
    ISchoolOriginal,
    IFetchMeetingsOptions,
    IFetchMeetingOptions,
    IMeetingOriginal,
    ICreateMeetingsOptions,
    IDeleteMeetingOptions,
} from "../types";
import { apiClient, appendQueriesToUrl } from "../helpers";

export function fetchCoursesByUserId(
    userId: string
): Promise<IApiResponse<ICourseOriginal[]>> {
    return apiClient.get(`/users/${userId}/courses`);
}

export function fetchCoursesBySchoolId(
    id: string
): Promise<IApiResponse<ISchoolOriginal[]>> {
    return apiClient.get(`/schools/${id}/courses`);
}

export function fetchCourseById(
    courseId: string
): Promise<IApiResponse<ICourseOriginal>> {
    return apiClient.get(`/courses/${courseId}`);
}

export function enrollByCourseId(id: string): Promise<any> {
    return apiClient.post(`/courses/${id}/enroll`, {});
}

export function dropByCourseId(id: string): Promise<any> {
    return apiClient.post(`/courses/${id}/drop`, {});
}

export function createCourse(
    courseData: Partial<ICourseOriginal>
): Promise<IApiResponse<ICourseOriginal>> {
    return apiClient.post("/courses", courseData);
}

export function updateCourseById(
    id: string,
    courseData: Partial<ICourseOriginal>
): Promise<IApiResponse<ICourseOriginal>> {
    return apiClient.patch(`/courses/${id}`, courseData);
}

export function deleteCourseById(id: string): Promise<any> {
    return apiClient.delete(`/courses/${id}`);
}

// MEETINGS

export function fetchMeetingsByCourseId({
    courseId,
    limit,
    skip,
}: IFetchMeetingsOptions): Promise<IApiResponse<IMeetingOriginal[]>> {
    const path = appendQueriesToUrl(`/courses/${courseId}/meetings`, {
        limit,
        skip,
    });
    return apiClient.get(path);
}

export function fetchMeetingById({
    meetingId,
    courseId,
}: IFetchMeetingOptions): Promise<IApiResponse<IMeetingOriginal>> {
    return apiClient.get(`/courses/${courseId}/meetings/${meetingId}`);
}

export function createMeetings({
    meetingsData,
    courseId,
}: ICreateMeetingsOptions): Promise<IApiResponse<IMeetingOriginal[]>> {
    return apiClient.post(`/courses/${courseId}/meetings/`, {
        meetings: meetingsData,
    });
}

export function updateMeetingById({
    courseId,
    meetingId,
    meetingData,
}): Promise<IApiResponse<IMeetingOriginal>> {
    return apiClient.patch(
        `/courses/${courseId}/meetings/${meetingId}`,
        meetingData
    );
}

export function deleteMeetingById({
    courseId,
    meetingId,
}: IDeleteMeetingOptions): Promise<any> {
    return apiClient.delete(`/courses/${courseId}/meetings/${meetingId}`);
}

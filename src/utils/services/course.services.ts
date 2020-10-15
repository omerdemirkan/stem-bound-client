import {
    ICourse,
    IApiResponse,
    ISchool,
    IFetchMeetingsOptions,
    IFetchMeetingOptions,
    IMeeting,
    ICreateMeetingsOptions,
    IDeleteMeetingOptions,
    ICourseOriginal,
    IAnnouncement,
    IAnnouncementOriginal,
} from "../types";
import {
    apiClient,
    appendQueriesToUrl,
    mapCourseData,
    mapResponseData,
    mapAnnouncementData,
    mapMeetingData,
} from "../helpers";

export function fetchCoursesByUserId(
    userId: string
): Promise<IApiResponse<ICourse[]>> {
    return mapResponseData(
        apiClient.get(`/users/${userId}/courses`),
        mapCourseData
    );
}

export function fetchCoursesBySchoolId(
    id: string
): Promise<IApiResponse<ICourse[]>> {
    return mapResponseData(
        apiClient.get(`/schools/${id}/courses`),
        mapCourseData
    );
}

export function fetchCourseById(
    courseId: string
): Promise<IApiResponse<ICourse>> {
    return mapResponseData(
        apiClient.get(`/courses/${courseId}`),
        mapCourseData
    );
}

export function fetchCourseByIdUnmapped(
    courseId: string
): Promise<IApiResponse<ICourseOriginal>> {
    return apiClient.get(`/courses/${courseId}`);
}

export function enrollByCourseId(id: string): Promise<IApiResponse<any>> {
    return apiClient.post(`/courses/${id}/enroll`, {});
}

export function dropByCourseId(id: string): Promise<IApiResponse<any>> {
    return apiClient.post(`/courses/${id}/drop`, {});
}

export function createCourse(
    courseData: Partial<ICourseOriginal>
): Promise<IApiResponse<ICourse>> {
    return mapResponseData(
        apiClient.post("/courses", courseData),
        mapCourseData
    );
}

export function updateCourseById(
    id: string,
    courseData: Partial<ICourseOriginal>
): Promise<IApiResponse<ICourse>> {
    return mapResponseData(
        apiClient.patch(`/courses/${id}`, courseData),
        mapCourseData
    );
}

export function deleteCourseById(id: string): Promise<IApiResponse<any>> {
    return apiClient.delete(`/courses/${id}`);
}

// MEETINGS

export function fetchMeetingsByCourseId({
    courseId,
    limit,
    skip,
}: IFetchMeetingsOptions): Promise<IApiResponse<IMeeting[]>> {
    const path = appendQueriesToUrl(`/courses/${courseId}/meetings`, {
        limit,
        skip,
    });
    return mapResponseData(apiClient.get(path), mapMeetingData);
}

export function fetchMeetingById({
    meetingId,
    courseId,
}: IFetchMeetingOptions): Promise<IApiResponse<IMeeting>> {
    return mapResponseData(
        apiClient.get(`/courses/${courseId}/meetings/${meetingId}`),
        mapMeetingData
    );
}

export function createMeetings(
    meetingsData,
    { courseId }: ICreateMeetingsOptions
): Promise<IApiResponse<IMeeting[]>> {
    return mapResponseData(
        apiClient.post(`/courses/${courseId}/meetings/`, {
            meetings: meetingsData,
        }),
        mapMeetingData
    );
}

export function updateMeetingById({
    courseId,
    meetingId,
    meetingData,
}): Promise<IApiResponse<IMeeting>> {
    return mapResponseData(
        apiClient.patch(
            `/courses/${courseId}/meetings/${meetingId}`,
            meetingData
        ),
        mapMeetingData
    );
}

export function deleteMeetingById({
    courseId,
    meetingId,
}: IDeleteMeetingOptions): Promise<IApiResponse<any>> {
    return mapResponseData(
        apiClient.delete(`/courses/${courseId}/meetings/${meetingId}`),
        mapMeetingData
    );
}

export function fetchAnnouncementsByCourseId(
    courseId: string,
    options?: { skip?: number; limit?: number }
): Promise<IApiResponse<IAnnouncement[]>> {
    return mapResponseData(
        apiClient.get(
            appendQueriesToUrl(`/courses/${courseId}/announcements`, options)
        ),
        mapAnnouncementData
    );
}

export function fetchAnnouncementById(
    { courseId, announcementId }: { courseId: string; announcementId: string },
    options?: { skip?: number; limit?: number }
): Promise<IApiResponse<IAnnouncement[]>> {
    return mapResponseData(
        apiClient.get(
            appendQueriesToUrl(
                `/courses/${courseId}/announcements/${announcementId}`,
                options
            )
        ),
        mapAnnouncementData
    );
}

export function createAnnouncement(
    announcementData: Partial<IAnnouncementOriginal>,
    { courseId }: { courseId: string }
): Promise<IApiResponse<IAnnouncement>> {
    return mapResponseData(
        apiClient.post(`/courses/${courseId}/announcements`, announcementData),
        mapAnnouncementData
    );
}

export function deleteAnnouncementById({
    courseId,
    announcementId,
}: {
    courseId: string;
    announcementId: string;
}): Promise<IApiResponse<IAnnouncement>> {
    return mapResponseData(
        apiClient.delete(
            `/courses/${courseId}/announcements/${announcementId}`
        ),
        mapAnnouncementData
    );
}

export function updateAnnouncementById(
    updatedAnnouncement: Partial<IAnnouncementOriginal>,
    {
        courseId,
        announcementId,
    }: {
        courseId: string;
        announcementId: string;
    }
): Promise<IApiResponse<IAnnouncement>> {
    return mapResponseData(
        apiClient.patch(
            `/courses/${courseId}/announcements/${announcementId}`,
            updatedAnnouncement
        ),
        mapAnnouncementData
    );
}

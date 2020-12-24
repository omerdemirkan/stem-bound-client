import {
    ICourse,
    IApiResponse,
    IFetchMeetingArrayOptions,
    IMeeting,
    ICourseOriginal,
    IAnnouncement,
    IAnnouncementOriginal,
    IFetchCourseArrayOptions,
    IFetchUserCoursesOptions,
    EUserRoles,
    IMeetingOriginal,
    IFetchAnnouncementArrayOptions,
} from "../types";
import {
    apiClient,
    appendQueriesToUrl,
    mapCourseData,
    mapResponseData,
    mapAnnouncementData,
    mapMeetingData,
} from "../helpers";

export function fetchCourses(
    options: IFetchUserCoursesOptions = {}
): Promise<IApiResponse<ICourse[]>> {
    return mapResponseData(
        apiClient.get(
            appendQueriesToUrl(`/courses`, {
                skip: options.skip,
                limit: options.limit,
                unverified: options.unverified,
                school_id: options.schoolId,
                instructor_id: options.instructorId,
                student_id: options.studentId,
            })
        ),
        mapCourseData
    );
}

export function fetchCoursesBySchoolId(
    schoolId: string,
    options: IFetchCourseArrayOptions = {}
): Promise<IApiResponse<ICourse[]>> {
    return fetchCourses({ schoolId, ...options });
}

export function fetchCoursesByUserId(
    userId: string,
    role: EUserRoles,
    options: IFetchCourseArrayOptions = {}
) {
    return fetchCourses({
        instructorId: role === EUserRoles.INSTRUCTOR && userId,
        studentId: role === EUserRoles.STUDENT && userId,
        ...options,
    });
}

export function fetchCourseById(
    courseId: string
): Promise<IApiResponse<ICourse>> {
    return mapResponseData(
        apiClient.get(`/courses/${courseId}`),
        mapCourseData
    );
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

export function udpateCourseVerification(
    courseId: string,
    verified: boolean
): Promise<IApiResponse<ICourse>> {
    return apiClient.put(`/courses/${courseId}/verified`, { verified });
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

export function fetchMeetingsByCourseId(
    courseId: string,
    options: IFetchMeetingArrayOptions = {}
): Promise<IApiResponse<IMeeting[]>> {
    const path = appendQueriesToUrl(`/courses/${courseId}/meetings`, {
        limit: options.limit,
        skip: options.skip,
        before: options.before?.toString(),
        after: options.after?.toString(),
        type: options.type,
        roomNum: options.type,
    });
    return mapResponseData(apiClient.get(path), mapMeetingData);
}

export function fetchMeetingById({
    meetingId,
    courseId,
}: {
    meetingId: string;
    courseId: string;
}): Promise<IApiResponse<IMeeting>> {
    return mapResponseData(
        apiClient.get(`/courses/${courseId}/meetings/${meetingId}`),
        mapMeetingData
    );
}

export function createMeetings(
    meetingsData,
    { courseId }: { courseId: string }
): Promise<IApiResponse<IMeeting[]>> {
    return mapResponseData(
        apiClient.post(`/courses/${courseId}/meetings/`, {
            meetings: meetingsData,
        }),
        mapMeetingData
    );
}

export function updateMeetingById(
    meetingData: Partial<IMeetingOriginal>,
    { courseId, meetingId }: { courseId: string; meetingId: string }
): Promise<IApiResponse<IMeeting>> {
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
}: {
    courseId: string;
    meetingId: string;
}): Promise<IApiResponse<any>> {
    return mapResponseData(
        apiClient.delete(`/courses/${courseId}/meetings/${meetingId}`),
        mapMeetingData
    );
}

export function fetchAnnouncementsByCourseId(
    courseId: string,
    options: IFetchAnnouncementArrayOptions = {}
): Promise<IApiResponse<IAnnouncement[]>> {
    return mapResponseData(
        apiClient.get(
            appendQueriesToUrl(`/courses/${courseId}/announcements`, {
                skip: options.skip,
                limit: options.limit,
                before: options.before?.toString(),
                after: options.after?.toString(),
            })
        ),
        mapAnnouncementData
    );
}

export function fetchAnnouncementById(
    { courseId, announcementId }: { courseId: string; announcementId: string },
    options: { skip?: number; limit?: number } = {}
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

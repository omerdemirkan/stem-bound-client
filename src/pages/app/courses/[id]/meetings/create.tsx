import AppLayout from "../../../../../components/layouts/AppLayout";
import useSWR from "swr";
import MeetingsForm from "../../../../../components/containers/MeetingsForm";
import withAuth from "../../../../../components/hoc/withAuth";
import { useRouter } from "next/router";
import {
    createMeetings,
    courseMeetingsFetcher,
    courseFetcher,
} from "../../../../../utils/services";
import {
    IMeetingOriginal,
    ECourseTypes,
    EMeetingTypes,
    EUserRoles,
} from "../../../../../utils/types";
import {
    clone,
    mapMeetingData,
    removeEmptyStrings,
} from "../../../../../utils/helpers";
import startOfDay from "date-fns/startOfDay";
import Head from "next/head";
import { useMediaQuery } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Section from "../../../../../components/ui/Section";
import { useContext, useMemo } from "react";
import NotificationContext from "../../../../../components/contexts/NotificationContext";
import useCalculateOnce from "../../../../../hooks/useCalculateOnce";
import useSchool from "../../../../../hooks/useSchool";

const CreateMeetingAppPage: React.FC = () => {
    const router = useRouter();
    const smallScreen = useMediaQuery("(max-width: 900px)");
    const queryCourseId = router.query.id;

    const { createSnackbar } = useContext(NotificationContext);

    const { data: course, error, mutate: mutateCourse } = useSWR(
        queryCourseId ? `/courses/${queryCourseId}` : null,
        courseFetcher(queryCourseId as any)
    );
    const { data: meetings, mutate: mutateMeetings } = useSWR(
        queryCourseId && `/courses/${queryCourseId}/meetings`,
        courseMeetingsFetcher(queryCourseId as any)
    );
    const { school } = useSchool(course?.meta.school);

    const previousMeetingsDatesHashTable = useMemo(
        function () {
            const datesHashTable = {};
            meetings?.forEach(function (meeting) {
                datesHashTable[startOfDay(meeting.start).toString()] = true;
            });
            return datesHashTable;
        },
        [meetings]
    );

    function handleFilterDates(dates: Date[]): Date[] {
        return dates.filter((date) => {
            // ensuring no date conflict with existing meetings
            const day = startOfDay(date);
            if (previousMeetingsDatesHashTable[day.toString()]) return false;
            // ensuring no meeting date is out of bounds of the course
            if (date < course.start || date > course.end) return false;
            return true;
        });
    }

    function handleSubmit(meetings: IMeetingOriginal[]) {
        createMeetings(removeEmptyStrings(meetings), {
            courseId: course._id,
        }).then(function ({ data }) {
            const newCourse = clone(course);
            Object.assign(newCourse, {
                meetings: data.map(mapMeetingData as any),
            });
            mutateCourse(newCourse);
            router.push(`/app/courses/${course._id}/meetings`);
        });
    }

    return (
        <AppLayout
            breadCrumbs={[
                { label: "Courses", href: "/app/courses" },
                {
                    label: course?.title,
                    href: "/app/courses/[id]",
                    as: `/app/courses/${course?._id}`,
                },
                {
                    label: "Meetings",
                    href: "/app/courses/[id]/meetings",
                    as: `/app/courses/${course?._id}/meetings`,
                },
                { label: "Create" },
            ]}
        >
            <Head>
                <title>Create Meetings - STEM-bound</title>
            </Head>

            {smallScreen && (
                <Section noDivider>
                    <Alert severity="warning">
                        <AlertTitle>Mobile Accessibility Issue</AlertTitle>
                        Users creating meetings on devices with small screens
                        may have difficulties; we are working on resolving the
                        issue. If problems arise, we recommend creating meetings
                        on a desktop.
                    </Alert>
                </Section>
            )}

            {course ? (
                <MeetingsForm
                    defaultMeetingType={
                        course.type === ECourseTypes.REMOTE
                            ? EMeetingTypes.REMOTE
                            : EMeetingTypes.IN_PERSON
                    }
                    courseTitle={course?.title}
                    schoolName={school?.name}
                    courseType={course.type}
                    onSubmit={handleSubmit}
                    filterDates={handleFilterDates}
                />
            ) : null}
        </AppLayout>
    );
};

export default withAuth(CreateMeetingAppPage, {
    allowedUserRoles: [EUserRoles.INSTRUCTOR],
});

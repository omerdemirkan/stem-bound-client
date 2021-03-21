import AppLayout from "../../../../../components/containers/AppLayout";
import useSWR from "swr";
import MeetingsForm from "../../../../../components/containers/MeetingsForm";
import withAuth from "../../../../../components/hoc/withAuth";
import { useRouter } from "next/router";
import {
    createMeetings,
    schoolFetcher,
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

const CreateMeetingAppPage: React.FC = () => {
    const router = useRouter();
    const smallScreen = useMediaQuery("(max-width: 900px)");
    const queryCourseId = router.query.id;

    const { data: course, error, mutate: mutateCourse } = useSWR(
        queryCourseId ? `/courses/${queryCourseId}` : null,
        courseFetcher(queryCourseId as any)
    );
    const { data: meetings, mutate: mutateMeetings } = useSWR(
        queryCourseId && `/courses/${queryCourseId}/meetings`,
        courseMeetingsFetcher(queryCourseId as any)
    );
    const { data: school } = useSWR(
        course?.meta.school && `/schools/${course?.meta.school}`,
        schoolFetcher(course?.meta.school)
    );

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

    const previousMeetingsDatesHashTable = {};
    meetings?.forEach(function (meeting) {
        previousMeetingsDatesHashTable[
            startOfDay(meeting.start).toString()
        ] = true;
    });

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
                        <AlertTitle>Mobile issue</AlertTitle>
                        Users creating meetings on devices with small screens
                        may have difficulties; if issues arise, we recommend
                        creating meetings on a desktop
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
                    validateDate={function (date: Date) {
                        return !previousMeetingsDatesHashTable[
                            startOfDay(date).toString()
                        ];
                    }}
                />
            ) : null}
        </AppLayout>
    );
};

export default withAuth(CreateMeetingAppPage, {
    allowedUserRoles: [EUserRoles.INSTRUCTOR],
});

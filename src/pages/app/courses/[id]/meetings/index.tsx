import AppLayout from "../../../../../components/containers/AppLayout";
import Head from "next/head";
import withAuth from "../../../../../components/hoc/withAuth";
import useSWR from "swr";
import AuthContext from "../../../../../components/contexts/AuthContext";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import { useContext, useRef } from "react";
import {
    courseFetcher,
    courseMeetingsFetcher,
    schoolFetcher,
} from "../../../../../utils/services";
import MeetingCard from "../../../../../components/ui/MeetingCard";
import Section from "../../../../../components/ui/Section";
import PictureMessage from "../../../../../components/ui/PictureMessage";
import NoResultsSVG from "../../../../../components/svg/illustrations/no-results";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import useQueryState from "../../../../../components/hooks/useQueryState";
import { capitalizeWords } from "../../../../../utils/helpers";

const MeetingsAppPage: React.FC = () => {
    const router = useRouter();
    const nowRef = useRef<Date>();
    nowRef.current = nowRef.current || new Date();

    const queryCourseId = router.query.id as string;
    const [queryType, setQueryType] = useQueryState<"upcoming" | "past">(
        "type",
        "upcoming"
    );
    const { data: course, error: fetchCourseError } = useSWR(
        queryCourseId && `/courses/${queryCourseId}`,
        courseFetcher(queryCourseId as any)
    );
    const {
        data: meetings,
        error: fetchCourseMeetingsError,
        isValidating: meetingsLoading,
    } = useSWR(
        queryCourseId && `/courses/${queryCourseId}/meetings?type=${queryType}`,
        courseMeetingsFetcher(queryCourseId, {
            after: queryType === "upcoming" ? nowRef.current : undefined,
            before: queryType === "past" ? nowRef.current : undefined,
        })
    );
    const { data: school } = useSWR(
        course?.meta.school && `/schools/${course?.meta.school}`,
        schoolFetcher(course?.meta.school)
    );
    const { user } = useContext(AuthContext);

    return (
        <AppLayout
            breadCrumbs={[
                { label: "Courses", href: "/app/courses" },
                {
                    label: course?.title,
                    href: "/app/courses/[id]",
                    as: `/app/courses/${course?._id}`,
                },
                { label: "Meetings" },
            ]}
            actionEl={
                course?.meta.instructors.includes(user._id) ? (
                    <>
                        {meetings?.length > 1 && (
                            <Link
                                href="/app/courses/[id]/meetings/update"
                                as={`/app/courses/${course?._id}/meetings/update`}
                                shallow
                            >
                                <a>
                                    <Button
                                        color="primary"
                                        className="spaced-horizontal"
                                    >
                                        UPDATE MEETINGS
                                    </Button>
                                </a>
                            </Link>
                        )}
                        <Link
                            href="/app/courses/[id]/meetings/create"
                            as={`/app/courses/${course?._id}/meetings/create`}
                        >
                            <a>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    className="spaced-horizontal"
                                >
                                    CREATE MEETINGS
                                </Button>
                            </a>
                        </Link>
                    </>
                ) : null
            }
        >
            <Paper>
                <Tabs
                    value={queryType === "past" ? 1 : 0}
                    onChange={(e, index) =>
                        setQueryType(!!index ? "past" : "upcoming")
                    }
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Upcoming Meetings" key="upcoming" />
                    <Tab label="Past Meetings" key="past" />
                </Tabs>
            </Paper>
            <Head>
                <title>STEM-bound - {course?.title || "Course"}</title>
            </Head>

            <Section noDivider title={`${capitalizeWords(queryType)} Meetings`}>
                {!meetingsLoading && !meetings?.length && (
                    <PictureMessage
                        Svg={NoResultsSVG}
                        message="No meetings found"
                    />
                )}
                {meetings?.map((meeting) => (
                    <MeetingCard
                        meeting={meeting}
                        key={meeting._id}
                        courseTitle={course?.title}
                        schoolName={school?.name}
                    />
                ))}
            </Section>
        </AppLayout>
    );
};

export default withAuth(MeetingsAppPage);

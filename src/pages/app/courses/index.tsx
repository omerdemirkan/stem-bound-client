import AppLayout from "../../../components/containers/AppLayout";
import Head from "next/head";
import withAuth from "../../../components/hoc/withAuth";
import Link from "next/link";
import CourseCard from "../../../components/ui/CourseCard";
import useSWR from "swr";
import { userCoursesFetcher } from "../../../utils/services";
import { EUserRoles } from "../../../utils/types";
import { useContext } from "react";
import AuthContext from "../../../components/contexts/AuthContext";
import Button from "@material-ui/core/Button";
import Section from "../../../components/ui/Section";
import FlexBox from "../../../components/ui/FlexBox";
import RelativeGrid from "../../../components/ui/RelativeGrid";

const CoursesAppPage: React.FC = () => {
    const { user } = useContext(AuthContext);
    const {
        data: courses,
        isValidating: coursesLoading,
        error: coursesError,
    } = useSWR(`/courses`, userCoursesFetcher(user._id, user.role));
    const {
        data: unverifiedCourses,
        isValidating: unverifiedCoursesLoading,
    } = useSWR(
        user.role === EUserRoles.INSTRUCTOR ||
            user.role === EUserRoles.SCHOOL_OFFICIAL
            ? `/courses?unverified=true`
            : null,
        userCoursesFetcher(user._id, user.role, { unverified: true })
    );

    let courseInfoMessage: string;
    switch (!!courses && courses.length === 0 && !coursesError && user.role) {
        case EUserRoles.INSTRUCTOR:
            courseInfoMessage = unverifiedCourses?.length
                ? `Looks like your ${
                      unverifiedCourses.length > 1
                          ? "courses haven't"
                          : "course hasn't"
                  } been verified. You may contact a school official regarding your course's verification.`
                : "Looks like you haven't created a course yet. You may create a course and submit it for verification by a school official.";
            break;
        case EUserRoles.STUDENT:
            courseInfoMessage =
                "Looks like you haven't enrolled in any courses. You may find courses in the My School page.";
    }

    return (
        <AppLayout
            header="My Courses"
            actionEl={
                user.role === EUserRoles.INSTRUCTOR ? (
                    <Link href="/app/courses/create">
                        <a>
                            <Button color="primary">CREATE COURSE</Button>
                        </a>
                    </Link>
                ) : null
            }
        >
            <Head>
                <title>STEM-bound - My Courses</title>
            </Head>

            <Section
                loading={coursesLoading}
                infoMessage={courseInfoMessage}
                errorMessage={
                    coursesError && "Couldn't load courses, an error occured"
                }
                noDivider
            >
                <RelativeGrid minWidthInPixels={450}>
                    {courses?.map((course) => (
                        <CourseCard
                            course={course}
                            key={course._id}
                            fullWidth
                            noMargin
                        />
                    ))}
                </RelativeGrid>
            </Section>

            {unverifiedCourses?.length ? (
                <Section
                    loading={unverifiedCoursesLoading}
                    title="Unverified Courses"
                >
                    <RelativeGrid minWidthInPixels={450}>
                        {unverifiedCourses?.map((course) => (
                            <CourseCard
                                key={course._id}
                                course={course}
                                fullWidth
                                noMargin
                            />
                        ))}
                    </RelativeGrid>
                </Section>
            ) : null}

            <style jsx>{``}</style>
        </AppLayout>
    );
};

export default withAuth(CoursesAppPage);

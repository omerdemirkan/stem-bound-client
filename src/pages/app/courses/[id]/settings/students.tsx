import { useRouter } from "next/router";
import useSWR from "swr";
import { CourseSettingsLayout } from ".";
import withAuth from "../../../../../components/hoc/withAuth";
import RelativeGrid from "../../../../../components/ui/RelativeGrid";
import Section from "../../../../../components/ui/Section";
import UserCard from "../../../../../components/ui/UserCard";
import { courseFetcher, usersFetcher } from "../../../../../utils/services";
import { EUserRoles } from "../../../../../utils/types";

const CourseStudentsAppPage: React.FC = () => {
    const router = useRouter();
    const courseId = router.query.id as string;

    const {
        data: course,
        isValidating: courseLoading,
        revalidate: refetchCourse,
    } = useSWR(
        courseId ? `/courses/${courseId}` : null,
        courseFetcher(courseId)
    );

    const {
        data: students,
        error: studentsError,
        isValidating: studentsLoading,
    } = useSWR(
        courseId ? `/courses/${courseId}/students` : null,
        usersFetcher(EUserRoles.STUDENT, { courseId })
    );

    return (
        <CourseSettingsLayout
            activeLabel="Students"
            courseId={course?._id}
            courseTitle={course?.title}
        >
            <Section
                title="Students"
                errorMessage={
                    studentsError && "Couldn't load students, an error occured"
                }
                infoMessage={
                    !studentsError &&
                    students?.length === 0 &&
                    "No students enrolled"
                }
                loading={studentsLoading && !students}
                noDivider
            >
                <RelativeGrid minWidth="400px">
                    {students?.map((student) => (
                        <UserCard
                            key={student._id}
                            user={student}
                            fullWidth
                            noMargin
                        />
                    ))}
                </RelativeGrid>
            </Section>
        </CourseSettingsLayout>
    );
};

export default withAuth(CourseStudentsAppPage, {
    allowedUserRoles: [EUserRoles.INSTRUCTOR],
});

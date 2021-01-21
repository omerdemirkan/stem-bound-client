import Card, { CardProps } from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import CardActions from "@material-ui/core/CardActions";
import { makeStyles } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Link from "next/link";
import useSWR from "swr";
import { courseInstructorsFetcher, schoolFetcher } from "../../utils/services";
import { ECourseVerificationStatus, ICourse } from "../../utils/types";
import Section from "./Section";
import { getCourseVerificationStatusDisplay } from "../../utils/helpers";
import { useFetchOnce } from "../hooks/useFetchOnce";

const useStyles = makeStyles({
    card: {
        margin: "10px 0",
        width: "100%",
        maxWidth: "500px",
        minWidth: "400px",
    },
    cardContent: {
        paddingTop: "20px",
    },
    divider: {
        margin: "5px 0",
    },
});

interface Props {
    course: ICourse;
    CardProps?: CardProps;
    fullWidth?: boolean;
    noMargin?: boolean;
    footerEl?: any;
}

const CourseCard: React.FC<Props> = ({
    course,
    CardProps,
    fullWidth,
    noMargin,
    footerEl,
}) => {
    const {
        data: instructors,
        isValidating: instructorsLoading,
        error: instructorsError,
    } = useFetchOnce(
        course?._id ? `/users/${course?._id}` : null,
        courseInstructorsFetcher(course?._id)
    );
    const { data: school } = useSWR(
        course?.meta.school ? `/schools/${course?.meta.school}` : null,
        schoolFetcher(course?.meta.school)
    );

    const classes = useStyles();

    return (
        <Card
            className={classes.card}
            style={{
                maxWidth: fullWidth ? undefined : "500px",
                margin: noMargin ? "0" : undefined,
            }}
            {...CardProps}
        >
            <Link href="/app/courses/[id]" as={`/app/courses/${course._id}`}>
                <a>
                    <CardHeader
                        title={course.title}
                        subheader={`${school?.name}, ${
                            course?.meta.students.length
                        } currently enrolled${
                            course.verificationStatus ===
                            ECourseVerificationStatus.VERIFIED
                                ? ""
                                : ` - ${getCourseVerificationStatusDisplay(
                                      course.verificationStatus
                                  )}`
                        }`}
                    />
                </a>
            </Link>
            <Divider />

            <CardContent style={{ paddingTop: "0", paddingBottom: "0" }}>
                <Section spacing="xs" title="Description" noDivider>
                    <Typography variant="h6" gutterBottom>
                        {course?.shortDescription}
                    </Typography>
                    {course?.longDescription && (
                        <Typography paragraph>
                            {course.longDescription}
                        </Typography>
                    )}
                </Section>

                <Section
                    spacing="xs"
                    title="Taught by"
                    loading={instructorsLoading}
                    errorMessage={
                        instructorsError &&
                        "Couldn't load instructor, an error occured"
                    }
                >
                    {instructors?.map((instructor) => (
                        <Chip
                            avatar={
                                <Avatar
                                    alt={
                                        instructor.firstName +
                                        " " +
                                        instructor.lastName
                                    }
                                    src={instructor.profilePictureUrl}
                                />
                            }
                            label={
                                instructor.firstName + " " + instructor.lastName
                            }
                            key={instructor._id}
                            color="primary"
                        />
                    ))}
                </Section>
            </CardContent>
            <CardActions>{footerEl}</CardActions>
        </Card>
    );
};

export default CourseCard;

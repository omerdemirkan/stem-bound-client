import {
    Card,
    CardHeader,
    CardProps,
    Divider,
    CardContent,
    Typography,
    Avatar,
    CardActions,
    Button,
    makeStyles,
    Chip,
} from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";
import Link from "next/link";
import { useContext } from "react";
import useSWR from "swr";
import { courseInstructorsFetcher, schoolFetcher } from "../../utils/services";
import { ICourse, EUserRoles } from "../../utils/types";
import AuthContext from "../contexts/AuthContext";

const useStyles = makeStyles({
    card: {
        margin: "20px 0",
    },
    cardContent: {
        paddingTop: "20px",
    },
});

interface Props {
    course: ICourse;
    CardProps: CardProps;
    fullWidth?: boolean;
}

const CourseCard: React.FC<Props> = ({ course, CardProps, fullWidth }) => {
    const { data: courseInstructors } = useSWR(
        course?._id ? `/courses/${course?._id}/instructors` : null,
        courseInstructorsFetcher(course?._id)
    );
    const { data: school } = useSWR(
        course?.meta.school ? `/schools/${course?.meta.school}` : null,
        schoolFetcher(course?.meta.school)
    );

    const { user } = useContext(AuthContext);
    const userRole = user?.role;

    const classes = useStyles();

    const instructorsString = courseInstructors
        ?.map((instructor) => `${instructor.firstName} ${instructor.lastName}`)
        .join(", ");

    return (
        <Card
            className={classes.card}
            style={fullWidth ? undefined : { maxWidth: "500px" }}
            {...CardProps}
        >
            <Link href="/app/courses/[id]" as={`/app/courses/${course._id}`}>
                <a>
                    <CardHeader title={course.title} subheader={school?.name} />
                </a>
            </Link>

            <Divider />

            <CardContent>
                <div className="card-content-section">
                    <Typography variant="h6" gutterBottom>
                        Taught by
                    </Typography>

                    {courseInstructors?.map((instructor) => (
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
                </div>

                <div className="card-content-section">
                    <Typography variant="h6">Course Description</Typography>
                    <Typography paragraph color="textSecondary">
                        <strong>{course?.shortDescription}</strong> -{" "}
                        {course?.longDescription}
                    </Typography>
                </div>
            </CardContent>
            <CardActions></CardActions>

            <style jsx>{`
                .card-content-section {
                    margin-bottom: 10px;
                }
            `}</style>
        </Card>
    );
};

export default CourseCard;

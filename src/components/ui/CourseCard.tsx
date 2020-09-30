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
} from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";
import Link from "next/link";
import useSWR from "swr";
import { courseInstructorsFetcher } from "../../utils/services";
import { ICourse } from "../../utils/types";

const useStyles = makeStyles({
    card: {
        margin: "20px 0",
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

    const classes = useStyles();

    return (
        <Card
            className={classes.card}
            style={fullWidth ? undefined : { maxWidth: "500px" }}
            {...CardProps}
        >
            <Link href="/app/courses/[id]" as={`/app/courses/${course._id}`}>
                <a>
                    <CardHeader
                        title={course.title}
                        subheader={courseInstructors
                            ?.map(
                                (instructor) =>
                                    `${instructor.firstName} ${instructor.lastName}`
                            )
                            .join(", ")}
                        avatar={
                            <AvatarGroup max={3}>
                                {courseInstructors?.map((instructor) => (
                                    <Avatar
                                        alt={
                                            instructor.firstName +
                                            " " +
                                            instructor.lastName
                                        }
                                        src={instructor.profilePictureUrl}
                                        key={instructor._id}
                                    />
                                ))}
                            </AvatarGroup>
                        }
                    />
                </a>
            </Link>

            <Divider />
            <CardContent>
                <Typography variant="h6">
                    {course.meta.students.length || "No"} Students
                </Typography>
            </CardContent>
            <CardActions></CardActions>
        </Card>
    );
};

export default CourseCard;

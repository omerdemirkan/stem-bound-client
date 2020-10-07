import Card, { CardProps } from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import CardActions from "@material-ui/core/CardActions";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Chip from "@material-ui/core/Chip";
import Link from "next/link";
import { useContext } from "react";
import useSWR from "swr";
import { courseInstructorsFetcher, schoolFetcher } from "../../utils/services";
import { EUserRoles, ICourse } from "../../utils/types";
import AuthContext from "../contexts/AuthContext";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
    card: {
        margin: "20px 0",
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
}

const CourseCard: React.FC<Props> = ({
    course,
    CardProps,
    fullWidth,
    noMargin,
}) => {
    const { data: courseInstructors } = useSWR(
        course?._id ? `/courses/${course?._id}/instructors` : null,
        courseInstructorsFetcher(course?._id)
    );
    const { data: school } = useSWR(
        course?.meta.school ? `/schools/${course?.meta.school}` : null,
        schoolFetcher(course?.meta.school)
    );

    const { user } = useContext(AuthContext);

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

                <Divider className={classes.divider} />

                <div className="card-content-section">
                    <Typography variant="h6" gutterBottom>
                        Course Description
                    </Typography>
                    <Typography paragraph>
                        <strong>{course?.shortDescription}</strong>
                        <br />
                        {course?.longDescription}
                    </Typography>
                </div>
            </CardContent>
            <CardActions>
                {user?.role === EUserRoles.SCHOOL_OFFICIAL ? (
                    <Button variant="contained" color="primary">
                        Contact Instructor
                    </Button>
                ) : null}
            </CardActions>

            <style jsx>{`
                .card-content-section {
                    margin-bottom: 10px;
                }
            `}</style>
        </Card>
    );
};

export default CourseCard;

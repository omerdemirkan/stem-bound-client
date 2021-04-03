import Card, { CardProps } from "@material-ui/core/Card";
import CardHeader, { CardHeaderProps } from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import CardContent, { CardContentProps } from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import CardActions, { CardActionsProps } from "@material-ui/core/CardActions";
import Chip from "@material-ui/core/Chip";
import Link from "next/link";
import { courseInstructorsFetcher } from "../../utils/services";
import {
    ECourseVerificationStatus,
    EUserRoles,
    ICourse,
} from "../../utils/types";
import Section from "./Section";
import { getDisplayCourseVerificationStatus } from "../../utils/helpers";
import { useFetchOnce } from "../../hooks/useFetchOnce";
import MenuWrapper, { IMenuItemDTO } from "../util/MenuWrapper";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";
import { makeStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ContactUserButton from "../util/ContactUserButton";
import Box from "@material-ui/core/Box";
import useSchool from "../../hooks/useSchool";

const useStyles = makeStyles({
    card: {
        margin: "10px 0",
        width: "100%",
        maxWidth: "450px",
    },
    cardContent: {
        paddingTop: "20px",
    },
    divider: {
        margin: "5px 0",
    },
});

export interface ICourseCardProps {
    course: ICourse;
    fullWidth?: boolean;
    noMargin?: boolean;
    footerEl?: any;
    actionEl?: any;
    menuItems?: IMenuItemDTO[];
    CardProps?: CardProps;
    CardHeaderProps?: CardHeaderProps;
    CardContentProps?: CardContentProps;
    CardActionsProps?: CardActionsProps;
    onDropClicked?(): any;
    onEnrollClicked?(): any;
    onDismissCourseClicked?(): any;
    onVerifyCourseClicked?(): any;
}

const CourseCard: React.FC<ICourseCardProps> = ({
    course,
    CardProps,
    fullWidth,
    noMargin,
    footerEl,
    actionEl,
    menuItems,
    CardHeaderProps,
    CardContentProps,
    CardActionsProps,
    onDismissCourseClicked,
    onDropClicked,
    onEnrollClicked,
    onVerifyCourseClicked,
}) => {
    const { user } = useContext(AuthContext);
    const {
        data: instructors,
        isValidating: instructorsLoading,
        error: instructorsError,
    } = useFetchOnce(
        course?._id ? `/users/${course?._id}` : null,
        courseInstructorsFetcher(course?._id)
    );
    const { school } = useSchool(course?.meta.school);

    const classes = useStyles();

    menuItems = menuItems || [];
    if (
        onDismissCourseClicked &&
        user.role === EUserRoles.SCHOOL_OFFICIAL &&
        course.verificationStatus === ECourseVerificationStatus.VERIFIED
    )
        menuItems.push({
            display: "Revoke Verification",
            onClick: onDismissCourseClicked,
        });
    if (
        onVerifyCourseClicked &&
        user.role === EUserRoles.SCHOOL_OFFICIAL &&
        course.verificationStatus === ECourseVerificationStatus.DISMISSED
    )
        menuItems.push({
            display: "Reinstate Verification",
            onClick: onVerifyCourseClicked,
        });

    let subheader = school?.name;
    if (course.verificationStatus === ECourseVerificationStatus.VERIFIED)
        subheader += ` | ${course?.meta.students.length} enrolled`;
    else subheader += ` | ${course.displayVerificationStatus}`;
    subheader += ` | ${course.displayTimeFrameType}`;

    return (
        <Card
            className={classes.card}
            style={{
                maxWidth: !fullWidth ? "500px" : "none",
                margin: noMargin ? "0" : undefined,
            }}
            {...CardProps}
        >
            <CardHeader
                title={
                    <Link
                        href="/app/courses/[id]"
                        as={`/app/courses/${course._id}`}
                    >
                        <a>{course.title}</a>
                    </Link>
                }
                subheader={subheader}
                action={
                    actionEl ||
                    (!!menuItems?.length && (
                        <MenuWrapper menuItems={menuItems}>
                            <IconButton>
                                <MoreHorizIcon />
                            </IconButton>
                        </MenuWrapper>
                    ))
                }
                {...CardHeaderProps}
            />
            <Divider />

            <CardContent
                style={{ paddingTop: "0", paddingBottom: "0" }}
                {...CardContentProps}
            >
                <Section spacing="xs" title="Description" noDivider>
                    <Typography style={{ margin: "0 0 3px" }} paragraph>
                        <Box component="span" fontWeight="500">
                            {course?.shortDescription}
                        </Box>
                    </Typography>
                    {course?.longDescription && (
                        <Typography
                            paragraph
                            style={{ margin: "0 0 3px" }}
                            noWrap
                        >
                            {course?.longDescription}
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
            <CardActions {...CardActionsProps}>
                {onVerifyCourseClicked &&
                    onDismissCourseClicked &&
                    user?.role === EUserRoles.SCHOOL_OFFICIAL &&
                    course.verificationStatus ===
                        ECourseVerificationStatus.PENDING_VERIFICATION && (
                        <>
                            <Button
                                color="secondary"
                                onClick={onDismissCourseClicked}
                            >
                                Dismiss Course
                            </Button>
                            <Button
                                color="primary"
                                onClick={onVerifyCourseClicked}
                            >
                                Verify Course
                            </Button>
                        </>
                    )}
                {onDropClicked &&
                    onEnrollClicked &&
                    user?.role === EUserRoles.STUDENT &&
                    (course?.meta.students.includes(user?._id) ? (
                        <Button color="secondary" onClick={onDropClicked}>
                            Drop Course
                        </Button>
                    ) : (
                        <Button color="primary" onClick={onEnrollClicked}>
                            Enroll
                        </Button>
                    ))}
                {user?.role !== EUserRoles.INSTRUCTOR && (
                    <ContactUserButton
                        userId={course.meta.instructors[0]}
                        color="primary"
                    >
                        Contact Instructor
                    </ContactUserButton>
                )}
                {footerEl}
            </CardActions>
        </Card>
    );
};

export default CourseCard;

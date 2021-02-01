import Button from "@material-ui/core/Button";
import {
    ECourseVerificationStatus,
    EUserRoles,
    ICourse,
    IUser,
} from "../../utils/types";
import CourseCard, { ICourseCardProps } from "../ui/CourseCard";
import ContactUserButton from "./ContactUserButton";
import { IMenuItemDTO } from "./MenuWrapper";

export default function paginateCourseWithVerificationActions(
    course: ICourse,
    {
        user,
        onDropClicked,
        onEnrollClicked,
        onDismissCourseClicked,
        onVerifyCourseClicked,
    }: {
        user: IUser;
        onDropClicked(): any;
        onEnrollClicked(): any;
        onDismissCourseClicked(): any;
        onVerifyCourseClicked(): any;
    },
    CourseCardProps?: ICourseCardProps
) {
    let menuItems: IMenuItemDTO[] = [];
    if (
        user.role === EUserRoles.SCHOOL_OFFICIAL &&
        course.verificationStatus === ECourseVerificationStatus.VERIFIED
    )
        menuItems.push({
            display: "Revoke Verification",
            onClick: onDismissCourseClicked,
        });
    if (
        user.role === EUserRoles.SCHOOL_OFFICIAL &&
        course.verificationStatus === ECourseVerificationStatus.DISMISSED
    )
        menuItems.push({
            display: "Reinstate Verification",
            onClick: onVerifyCourseClicked,
        });

    return (
        <CourseCard
            course={course}
            key={course._id}
            menuItems={
                CourseCardProps?.menuItems
                    ? menuItems.concat(CourseCardProps.menuItems)
                    : menuItems
            }
            footerEl={
                <>
                    {user?.role === EUserRoles.SCHOOL_OFFICIAL &&
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
                    {user?.role === EUserRoles.STUDENT &&
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
                    {CourseCardProps?.footerEl}
                </>
            }
            {...CourseCardProps}
        />
    );
}

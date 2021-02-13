import {
    IUserOriginal,
    IUser,
    IValidateUserRoleOptions,
    EUserRoles,
    EUserDisplayRoles,
    ISchoolOfficialOriginal,
    IStudentOriginal,
    IInstructor,
    IInstructorOriginal,
    IStudent,
} from "../types";

export function mapUserData(user: IUserOriginal): IUser {
    let mappedUser: IUser = {
        _id: user._id,
        role: user.role,
        displayRole: getUserDisplayRole(user.role),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: `${user.firstName} ${user.lastName}`,
        profilePictureUrl: user.profilePictureUrl,
        location: {
            city: user.location.city,
            geoJSON: user.location.geoJSON,
            state: user.location.state,
            zip: user.location.zip,
            longitude: user.location.geoJSON.coordinates[0],
            latitude: user.location.geoJSON.coordinates[1],
        },
        longDescription: user.longDescription,
        shortDescription: user.shortDescription,
        meta: user.meta as any,
        position: (user as any).position || undefined,
        interests: (user as any).interests || undefined,
        specialties: (user as any).specialties || undefined,
    };
    switch (user.role) {
        case EUserRoles.STUDENT:
            (mappedUser as IStudent).interests = (user as IStudentOriginal).interests;
            const initialSchoolYear = (user as IStudentOriginal)
                .initialSchoolYear;
            const currentSchoolYear = getCurrentSchoolYear();
            const schoolYearsSinceAccountCreated =
                +currentSchoolYear.split("-")[0] -
                +initialSchoolYear.split("-")[0];
            let initialGradeLevel = (user as IStudentOriginal)
                .initialGradeLevel;
            (mappedUser as IStudent).gradeLevel =
                initialGradeLevel + schoolYearsSinceAccountCreated;
            break;
        case EUserRoles.INSTRUCTOR:
            (mappedUser as IInstructor).specialties = (user as IInstructorOriginal).specialties;
            break;
        case EUserRoles.SCHOOL_OFFICIAL:
            (mappedUser as IInstructor).position = (user as ISchoolOfficialOriginal).position;
            break;
    }
    return mappedUser;
}

export function validateUserRole({
    userRole,
    allowedUserRoles,
}: IValidateUserRoleOptions) {
    return allowedUserRoles.includes(userRole);
}

const userRoleDisplayTable = {
    [EUserRoles.INSTRUCTOR]: EUserDisplayRoles.INSTRUCTOR,
    [EUserRoles.SCHOOL_OFFICIAL]: EUserDisplayRoles.SCHOOL_OFFICIAL,
    [EUserRoles.STUDENT]: EUserDisplayRoles.STUDENT,
};

export function getUserDisplayRole(userRole: EUserRoles): EUserDisplayRoles {
    return userRoleDisplayTable[userRole];
}

export function getCurrentSchoolYear() {
    const now = new Date(),
        currentMonth = now.getMonth();
    let startYear = now.getFullYear();
    if (currentMonth <= 6) startYear -= 1;
    return `${startYear}-${startYear + 1}`;
}

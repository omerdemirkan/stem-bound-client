import {
    IUserOriginal,
    IUser,
    IValidateUserRoleOptions,
    EUserRoles,
    EUserDisplayRoles,
} from "../types";

export function mapUserData(user: IUserOriginal): IUser {
    return {
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

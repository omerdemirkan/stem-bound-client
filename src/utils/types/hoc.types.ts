import { IUser, ICoordinates } from ".";
import { EUserRoles } from "./user.types";

export interface IWithAuthProps {
    accessToken: string;
    authAttempted: boolean;
    user: IUser;
}

export interface IWithAuthOptions {
    allowedUserRoles?: EUserRoles[];
}

export interface IWithUserCoordinatesProps {
    coordinates: ICoordinates;
}

export interface IWithForcedRerenderProps {
    rerender(): void;
}

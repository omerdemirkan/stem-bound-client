import { IUser, ICoordinates } from ".";

export interface IWithAuthProps {
    accessToken: string;
    authAttempted: boolean;
    user: IUser;
}

export interface IWithUserCoordinates {
    coordinates: ICoordinates;
}

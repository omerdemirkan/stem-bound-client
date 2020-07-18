import { IApiResponse } from "./api.types";
import { EUserRoles } from "./user.types";

export type IApiAuthResponse = IApiResponse<{ user: any; accessToken: string }>;

export interface IWithAuthOptions {
    allowedUserRoles?: EUserRoles[];
}

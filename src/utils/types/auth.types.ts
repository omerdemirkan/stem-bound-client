import { IApiResponse } from "./api.types";

export type IApiAuthResponse = IApiResponse<{ user: any; accessToken: string }>;

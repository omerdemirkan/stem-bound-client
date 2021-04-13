import { EUserRoles, INavigationData } from "../types";
import navigationData from "../constants/navigation.constants";
import { ServerResponse } from "http";

export function getNavigationDataByUserRole(
    userRole: EUserRoles
): INavigationData {
    return navigationData[userRole];
}

export function serverRedirect(res: ServerResponse, redirect: string) {
    res.setHeader("location", redirect);
    res.statusCode = 302;
    res.end();
}

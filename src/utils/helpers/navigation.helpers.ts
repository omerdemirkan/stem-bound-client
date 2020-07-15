import { EUserRoles, INavigationData } from "../types";
import navigationData from "../constants/navigation.constants";
import { NextPageContext } from "next";

export function getNavigationDataByUserRole(
    userRole: EUserRoles
): INavigationData {
    return navigationData[userRole];
}

export function serverRedirect({ res }: NextPageContext, redirect: string) {
    res.writeHead(302, { Location: redirect });
    res.end();
    return { props: {} };
}

import { EUserRoles, INavigationData } from "../types";
import navigationData from "../constants/navigation.constants";

export function getNavigationDataByUserRole(
    userRole: EUserRoles
): INavigationData {
    return navigationData[userRole];
}

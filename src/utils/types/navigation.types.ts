import { EUserRoles } from "./user.types";

export interface INavigationData {
    userRole: EUserRoles;
    buttons: INavigationDataButton[];
}

export interface INavigationDataButton {
    text: string;
    Icon?: React.FC;
    iconPath?: string;
    path: string;
}

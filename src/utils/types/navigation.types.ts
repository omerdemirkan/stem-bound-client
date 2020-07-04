import { EUserRoles } from "./user.types";

export interface INavigationData {
    userRole: EUserRoles;
    buttons: INavigationDataButton[];
}

export interface INavigationDataButton {
    text: string;
    Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
    iconPath?: string;
    path: string;
}

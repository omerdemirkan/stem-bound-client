import { EUserRoles } from "./user.types";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core/SvgIcon";

export interface INavigationData {
    userRole: EUserRoles;
    buttons: INavigationDataButton[];
}

export interface INavigationDataButton {
    text: string;
    Icon?:
        | React.FC<React.SVGProps<SVGSVGElement>>
        | OverridableComponent<SvgIconTypeMap<{}, "svg">>;
    iconPath?: string;
    path: string;
    completion: EPageCompletion;
}

export interface IBreadCrumb {
    label: string;
    href?: string;
    as?: string;
    shallow?: boolean;
}

export enum EPageCompletion {
    UNDER_CONSTRUCTION = "UNDER_CONSTRUCTION",
    COMPLETE = "COMPLETE",
}

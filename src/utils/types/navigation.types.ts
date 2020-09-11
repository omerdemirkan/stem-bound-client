import { EUserRoles } from "./user.types";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core";

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
}

export interface IBreadCrumb {
    label: string;
    href?: string;
    shallow?: boolean;
}

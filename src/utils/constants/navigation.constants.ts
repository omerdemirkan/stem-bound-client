import { INavigationData, EUserRoles } from "../types";

// SVG components
import HomeSVG from "../../../public/svg/home";
import MagnifierSVG from "../../../public/svg/magnifier";
import CalendarSVG from "../../../public/svg/calendar";
import MailSVG from "../../../public/svg/mail";
import InfoSVG from "../../../public/svg/info";

export const instructorNavigationData: INavigationData = {
    userRole: EUserRoles.INSTRUCTOR,
    buttons: [
        {
            text: "DASHBOARD",
            Icon: HomeSVG,
            path: "/app/dashboard",
        },
        {
            text: "SEARCH",
            Icon: MagnifierSVG,
            path: "/app/search",
        },
        {
            text: "SCHEDULE",
            Icon: CalendarSVG,
            path: "/app/schedule",
        },
        {
            text: "MESSAGING",
            Icon: MailSVG,
            path: "/app/messaging",
        },
        {
            text: "MY COURSES",
            Icon: MagnifierSVG,
            path: "/app/courses",
        },
        {
            text: "NOTIFICATIONS",
            Icon: InfoSVG,
            path: "/app/notifications",
        },
    ],
};

export const studentNavigationData: INavigationData = {
    userRole: EUserRoles.INSTRUCTOR,
    buttons: [
        {
            text: "DASHBOARD",
            Icon: HomeSVG,
            path: "/app/dashboard",
        },
        {
            text: "SEARCH",
            Icon: MagnifierSVG,
            path: "/app/search",
        },
        {
            text: "SCHEDULE",
            Icon: CalendarSVG,
            path: "/app/schedule",
        },
        {
            text: "MESSAGING",
            Icon: MailSVG,
            path: "/app/messaging",
        },
        {
            text: "MY COURSES",
            Icon: MagnifierSVG,
            path: "/app/courses",
        },
        {
            text: "NOTIFICATIONS",
            Icon: InfoSVG,
            path: "/app/notifications",
        },
    ],
};

export const schoolOfficialNavigationData: INavigationData = {
    userRole: EUserRoles.INSTRUCTOR,
    buttons: [
        {
            text: "DASHBOARD",
            Icon: HomeSVG,
            path: "/app/dashboard",
        },
        {
            text: "SEARCH",
            Icon: MagnifierSVG,
            path: "/app/search",
        },
        {
            text: "MESSAGING",
            Icon: MailSVG,
            path: "/app/messaging",
        },
        {
            text: "NOTIFICATIONS",
            Icon: InfoSVG,
            path: "/app/notifications",
        },
    ],
};

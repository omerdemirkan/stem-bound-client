import { INavigationData, EUserRoles } from "../types";

// SVG components
import HomeSVG from "../../components/svg/home";
import MagnifierSVG from "../../components/svg/magnifier";
import CalendarSVG from "../../components/svg/calendar";
import MailSVG from "../../components/svg/mail";
import InfoSVG from "../../components/svg/info";

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

const navigationData = Object.freeze({
    [EUserRoles.INSTRUCTOR]: instructorNavigationData,
    [EUserRoles.SCHOOL_OFFICIAL]: schoolOfficialNavigationData,
    [EUserRoles.STUDENT]: studentNavigationData,
});

export default navigationData;

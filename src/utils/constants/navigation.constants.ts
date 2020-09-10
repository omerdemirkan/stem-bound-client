import { INavigationData, EUserRoles } from "../types";

// SVG components
import HomeSVG from "../../components/svg/icons/home";
import MagnifierSVG from "../../components/svg/icons/magnifier";
import CalendarSVG from "../../components/svg/icons/calendar";
import MailSVG from "../../components/svg/icons/mail";
import InfoSVG from "../../components/svg/icons/info";
import { ESearchFields } from "../types/search.types";

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
            path: `/app/search?q=${ESearchFields.SCHOOL_OFFICIAL}`,
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
        {
            text: "MY ACCOUNT",
            Icon: InfoSVG,
            path: "/app/my-account",
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
            path: `/app/search?q=${ESearchFields.INSTRUCTOR}`,
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
        {
            text: "MY SCHOOL",
            Icon: InfoSVG,
            path: "/app/my-school",
        },
        {
            text: "MY ACCOUNT",
            Icon: InfoSVG,
            path: "/app/my-account",
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
            path: `/app/search?q=${ESearchFields.INSTRUCTOR}`,
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
        {
            text: "MY SCHOOL",
            Icon: InfoSVG,
            path: "/app/my-school",
        },
        {
            text: "MY ACCOUNT",
            Icon: InfoSVG,
            path: "/app/my-account",
        },
    ],
};

const navigationData = Object.freeze({
    [EUserRoles.INSTRUCTOR]: instructorNavigationData,
    [EUserRoles.SCHOOL_OFFICIAL]: schoolOfficialNavigationData,
    [EUserRoles.STUDENT]: studentNavigationData,
});

export default navigationData;

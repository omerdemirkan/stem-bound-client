import { INavigationData, EUserRoles } from "../types";

import { ESearchFields } from "../types/search.types";

// Icon components
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import MailIcon from "@material-ui/icons/Mail";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import InfoIcon from "@material-ui/icons/Info";
import SchoolIcon from "@material-ui/icons/School";

export const instructorNavigationData: INavigationData = {
    userRole: EUserRoles.INSTRUCTOR,
    buttons: [
        {
            text: "DASHBOARD",
            Icon: HomeIcon,
            path: "/app/dashboard",
        },
        {
            text: "SEARCH",
            Icon: SearchIcon,
            path: `/app/search?q=${ESearchFields.SCHOOL_OFFICIAL}`,
        },
        {
            text: "SCHEDULE",
            Icon: CalendarTodayIcon,
            path: "/app/schedule",
        },
        {
            text: "MESSAGING",
            Icon: MailIcon,
            path: "/app/messaging",
        },
        {
            text: "MY COURSES",
            Icon: LibraryBooksIcon,
            path: "/app/courses",
        },
        {
            text: "NOTIFICATIONS",
            Icon: InfoIcon,
            path: "/app/notifications",
        },
    ],
};

export const studentNavigationData: INavigationData = {
    userRole: EUserRoles.INSTRUCTOR,
    buttons: [
        {
            text: "DASHBOARD",
            Icon: HomeIcon,
            path: "/app/dashboard",
        },
        {
            text: "SEARCH",
            Icon: SearchIcon,
            path: `/app/search?q=${ESearchFields.INSTRUCTOR}`,
        },
        {
            text: "SCHEDULE",
            Icon: CalendarTodayIcon,
            path: "/app/schedule",
        },
        {
            text: "MESSAGING",
            Icon: MailIcon,
            path: "/app/messaging",
        },
        {
            text: "MY COURSES",
            Icon: LibraryBooksIcon,
            path: "/app/courses",
        },
        {
            text: "NOTIFICATIONS",
            Icon: InfoIcon,
            path: "/app/notifications",
        },
        {
            text: "MY SCHOOL",
            Icon: SchoolIcon,
            path: "/app/my-school",
        },
    ],
};

export const schoolOfficialNavigationData: INavigationData = {
    userRole: EUserRoles.INSTRUCTOR,
    buttons: [
        {
            text: "DASHBOARD",
            Icon: HomeIcon,
            path: "/app/dashboard",
        },
        {
            text: "SEARCH",
            Icon: SearchIcon,
            path: `/app/search?q=${ESearchFields.INSTRUCTOR}`,
        },
        {
            text: "MESSAGING",
            Icon: MailIcon,
            path: "/app/messaging",
        },
        {
            text: "NOTIFICATIONS",
            Icon: InfoIcon,
            path: "/app/notifications",
        },
        {
            text: "MY SCHOOL",
            Icon: SchoolIcon,
            path: "/app/my-school",
        },
    ],
};

const navigationData = Object.freeze({
    [EUserRoles.INSTRUCTOR]: instructorNavigationData,
    [EUserRoles.SCHOOL_OFFICIAL]: schoolOfficialNavigationData,
    [EUserRoles.STUDENT]: studentNavigationData,
});

export default navigationData;

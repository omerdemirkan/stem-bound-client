import { INavigationData, EUserRoles, EPageCompletion } from "../types";

import { ESearchFields } from "../types/search.types";

// Icon components
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import MailIcon from "@material-ui/icons/Mail";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import SchoolIcon from "@material-ui/icons/School";
import NotificationsIcon from "@material-ui/icons/Notifications";

export const instructorNavigationData: INavigationData = {
    userRole: EUserRoles.INSTRUCTOR,
    buttons: [
        {
            text: "DASHBOARD",
            Icon: HomeIcon,
            path: "/app/dashboard",
            completion: EPageCompletion.UNDER_CONSTRUCTION,
        },
        {
            text: "SEARCH",
            Icon: SearchIcon,
            path: `/app/search`,
            completion: EPageCompletion.COMPLETE,
        },
        {
            text: "SCHEDULE",
            Icon: CalendarTodayIcon,
            path: "/app/schedule",
            completion: EPageCompletion.UNDER_CONSTRUCTION,
        },
        {
            text: "MESSAGING",
            Icon: MailIcon,
            path: "/app/messaging",
            completion: EPageCompletion.COMPLETE,
        },
        {
            text: "MY COURSES",
            Icon: LibraryBooksIcon,
            path: "/app/courses",
            completion: EPageCompletion.COMPLETE,
        },
        {
            text: "NOTIFICATIONS",
            Icon: NotificationsIcon,
            path: "/app/notifications",
            completion: EPageCompletion.UNDER_CONSTRUCTION,
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
            completion: EPageCompletion.UNDER_CONSTRUCTION,
        },
        {
            text: "SEARCH",
            Icon: SearchIcon,
            path: `/app/search`,
            completion: EPageCompletion.COMPLETE,
        },
        {
            text: "SCHEDULE",
            Icon: CalendarTodayIcon,
            path: "/app/schedule",
            completion: EPageCompletion.UNDER_CONSTRUCTION,
        },
        {
            text: "MESSAGING",
            Icon: MailIcon,
            path: "/app/messaging",
            completion: EPageCompletion.COMPLETE,
        },
        {
            text: "MY COURSES",
            Icon: LibraryBooksIcon,
            path: "/app/courses",
            completion: EPageCompletion.COMPLETE,
        },
        {
            text: "NOTIFICATIONS",
            Icon: NotificationsIcon,
            path: "/app/notifications",
            completion: EPageCompletion.UNDER_CONSTRUCTION,
        },
        {
            text: "MY SCHOOL",
            Icon: SchoolIcon,
            path: "/app/my-school",
            completion: EPageCompletion.COMPLETE,
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
            completion: EPageCompletion.UNDER_CONSTRUCTION,
        },
        {
            text: "SEARCH",
            Icon: SearchIcon,
            path: `/app/search`,
            completion: EPageCompletion.COMPLETE,
        },
        {
            text: "MESSAGING",
            Icon: MailIcon,
            path: "/app/messaging",
            completion: EPageCompletion.COMPLETE,
        },
        {
            text: "NOTIFICATIONS",
            Icon: NotificationsIcon,
            path: "/app/notifications",
            completion: EPageCompletion.UNDER_CONSTRUCTION,
        },
        {
            text: "MY SCHOOL",
            Icon: SchoolIcon,
            path: "/app/my-school",
            completion: EPageCompletion.COMPLETE,
        },
    ],
};

const navigationData = Object.freeze({
    [EUserRoles.INSTRUCTOR]: instructorNavigationData,
    [EUserRoles.SCHOOL_OFFICIAL]: schoolOfficialNavigationData,
    [EUserRoles.STUDENT]: studentNavigationData,
});

export const staticNavigationData = {
    links: [
        { title: "home", path: "/" },
        { title: "our team", path: "/our-team" },
        {
            title: "search",
            path: "/search",
            as: `/search?q=${EUserRoles.INSTRUCTOR}`,
        },
        { title: "volunteer", path: "/volunteer" },
        { title: "contact us", path: "/contact-us" },
    ],
    buttons: [
        { title: "log in", path: "/log-in", variant: "outlined" },
        { title: "sign up", path: "/sign-up", variant: "contained" },
    ],
};

export default navigationData;

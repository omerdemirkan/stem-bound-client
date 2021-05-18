import { makeStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import useNavigationData from "../../hooks/useNavigationData";
import { useRouter } from "next/router";
import {
    ENotificationTypes,
    INavigationDataButton,
    EPageCompletion,
} from "../../utils/types";
import Link from "next/link";
import { useContext, useRef, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import AuthContext from "../contexts/AuthContext";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import NotificationContext from "../contexts/NotificationContext";
import Divider from "@material-ui/core/Divider";
import BuildIcon from "@material-ui/icons/Build";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import NavigationButton from "../ui/NavigationButton";

const useStyles = makeStyles({
    listItem: {
        paddingLeft: "22px",
    },
    userMenuButton: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "5px 10px",
        marginBottom: "12px",
        borderRadius: "2px",
    },
    userMenu: {
        justifyContent: "flex-end",
    },
});

const AppNavigation: React.FC = () => {
    const classes = useStyles();
    const navigationData = useNavigationData();
    const router = useRouter();
    const { user, logout } = useContext(AuthContext);
    const { createAlert } = useContext(NotificationContext);

    const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);

    const toggleUserMenu = () => setUserMenuOpen((prev) => !prev);

    const userMenuButtonRef = useRef();

    function logoutHandler() {
        logout();
        router.push("/");
    }

    function handleOpenLogoutModal() {
        setUserMenuOpen(false);
        createAlert({
            headerText: "Are you sure you want to log out?",
            bodyText: "This will not log you out of other devices.",
            type: ENotificationTypes.DANGER,
            onOk: logoutHandler,
            onCancel: () => {},
        });
    }

    return (
        <>
            <ListItem
                button
                onClick={toggleUserMenu}
                color="inherit"
                className={classes.userMenuButton}
            >
                <Avatar
                    src={user.profilePictureUrl}
                    alt="me"
                    style={{ marginRight: "20px" }}
                />
                <Typography component="span" color="textPrimary">
                    <Box fontSize="0.88rem" fontWeight="500">
                        {(user.fullName?.length > 14
                            ? user.firstName
                            : user.fullName
                        ).toUpperCase()}
                    </Box>
                </Typography>
                <ArrowDropDownIcon
                    style={{ marginLeft: "10px" }}
                    color="primary"
                    ref={userMenuButtonRef}
                />
            </ListItem>
            <Menu
                open={userMenuOpen}
                onClose={toggleUserMenu}
                anchorEl={userMenuButtonRef.current}
                className={classes.userMenu}
            >
                <MenuItem onClick={toggleUserMenu}>
                    <Link href="/app/settings">
                        <a>My Account</a>
                    </Link>
                </MenuItem>
                <MenuItem onClick={toggleUserMenu}>
                    <Link href="/app/settings/preferences">
                        <a>Preferences</a>
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleOpenLogoutModal} color="primary">
                    Logout
                </MenuItem>
            </Menu>

            <Divider />
            <List component="nav">
                {navigationData?.buttons.map(function ({
                    path,
                    Icon,
                    text,
                    completion,
                }: INavigationDataButton) {
                    const linkPath = path.split("?")[0],
                        currentPath = router.pathname.split("?")[0];
                    const selected = currentPath.includes(linkPath);
                    return (
                        <Link href={path} key={path}>
                            <a>
                                <NavigationButton
                                    Icon={Icon}
                                    active={selected}
                                    rightEl={
                                        completion ===
                                        EPageCompletion.UNDER_CONSTRUCTION ? (
                                            <BuildIcon
                                                style={{
                                                    width: "12px",
                                                }}
                                                color="disabled"
                                            />
                                        ) : null
                                    }
                                >
                                    {text}
                                </NavigationButton>
                            </a>
                        </Link>
                    );
                })}
            </List>
        </>
    );
};

export default AppNavigation;

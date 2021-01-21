import { makeStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import useNavigationData from "../hooks/useNavigationData";
import { useRouter } from "next/router";
import {
    ENotificationTypes,
    INavigationDataButton,
    EPageCompletion,
} from "../../utils/types";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import { useContext, useRef, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import AuthContext from "../contexts/AuthContext";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import NotificationContext from "../contexts/NotificationContext";
import Divider from "@material-ui/core/Divider";
import BuildIcon from "@material-ui/icons/Build";

const useStyles = makeStyles({
    listItem: {
        paddingLeft: "40px",
    },
    userMenuButton: {
        marginBottom: "20px",
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
            bodyText: "",
            type: ENotificationTypes.DANGER,
            onOk: logoutHandler,
            onCancel: () => {},
        });
    }

    return (
        <>
            <Button
                onClick={toggleUserMenu}
                variant="text"
                color="inherit"
                className={classes.userMenuButton}
                fullWidth
            >
                <Avatar
                    src={user.profilePictureUrl}
                    alt="me"
                    style={{ marginRight: "20px" }}
                />
                {`${user.firstName} ${user.lastName}`}
                <ArrowDropDownIcon
                    style={{ marginLeft: "10px" }}
                    color="primary"
                    ref={userMenuButtonRef}
                />
            </Button>
            <Menu
                open={userMenuOpen}
                onClose={toggleUserMenu}
                anchorEl={userMenuButtonRef.current}
                className={classes.userMenu}
            >
                <MenuItem onClick={toggleUserMenu}>
                    <Link href="/app/my-account">
                        <a>My Account</a>
                    </Link>
                </MenuItem>
                <MenuItem onClick={toggleUserMenu}>Settings</MenuItem>
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
                    const selected = path.includes(router.pathname);
                    return (
                        <Link href={path} key={path}>
                            <a>
                                <ListItem
                                    button
                                    className={classes.listItem}
                                    selected={selected}
                                >
                                    <ListItemIcon>
                                        <Icon
                                            color={
                                                selected ? "primary" : undefined
                                            }
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={text}
                                        color={
                                            selected ? "primary" : "secondary"
                                        }
                                    />
                                    {completion ===
                                    EPageCompletion.UNDER_CONSTRUCTION ? (
                                        <BuildIcon
                                            style={{
                                                width: "12px",
                                            }}
                                            color="disabled"
                                        />
                                    ) : null}
                                </ListItem>
                            </a>
                        </Link>
                    );
                })}
            </List>
        </>
    );
};

export default AppNavigation;

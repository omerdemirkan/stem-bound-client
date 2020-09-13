import AuthContext from "../contexts/AuthContext";
import NotificationContext from "../contexts/NotificationContext";
import { useRouter } from "next/router";
import { ENotificationTypes, ETheme } from "../../utils/types";
import { useContext, useState, useRef } from "react";
import {
    makeStyles,
    Button,
    Avatar,
    Divider,
    Typography,
    Menu,
    MenuItem,
    Breadcrumbs,
} from "@material-ui/core";
import Link from "next/link";
import WordLogoSVG from "../svg/icons/word-logo";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import AppNavigation from "./AppNavigation";
import { IAppLayoutProps } from "./AppLayout";
import ThemeContext from "../contexts/ThemeContext";

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
    finePrint: {
        position: "absolute",
        bottom: "0",
        left: "0",
        textAlign: "center",
        width: "280px",
    },
});

const DesktopAppLayout: React.FC<IAppLayoutProps> = ({
    children,
    header,
    breadCrumbs,
    footerEl,
}) => {
    const router = useRouter();
    const { user, logout } = useContext(AuthContext);
    const { createAlert, createSnackbar } = useContext(NotificationContext);
    const { theme } = useContext(ThemeContext);

    const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);

    const userMenuButtonRef = useRef();

    const toggleUserMenu = () => setUserMenuOpen((prev) => !prev);

    const classes = useStyles();

    function logoutHandler() {
        logout();
        router.push("/");
    }

    function handleOpenLogoutModal() {
        setUserMenuOpen(false);
        createAlert({
            headerText: "Are you sure you want to log out?",
            bodyText: "This is a body text",
            type: ENotificationTypes.DANGER,
            onOk: logoutHandler,
            onCancel: () => {},
        });
    }

    if (header && !breadCrumbs) {
        breadCrumbs = [
            {
                label: header,
            },
        ];
    }

    return (
        <div className={`root ${theme === ETheme.DARK ? "dark-theme" : null}`}>
            <aside className="sidebar">
                <div className="logo-box">
                    <WordLogoSVG width="60px" />
                </div>
                <Button
                    onClick={toggleUserMenu}
                    variant="text"
                    color="inherit"
                    className={classes.userMenuButton}
                    fullWidth
                >
                    <Avatar
                        src={user.profilePictureUrl}
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

                <AppNavigation />
                <Typography
                    paragraph
                    gutterBottom
                    color="textSecondary"
                    className={classes.finePrint}
                >
                    STEM-BOUND EDUCATION™
                </Typography>
            </aside>

            <span className="main">
                <div className="main-header">
                    <Breadcrumbs>
                        {breadCrumbs?.map(function (
                            { label, href, shallow, as },
                            index
                        ) {
                            const isLast = index === breadCrumbs.length - 1;
                            let bc = (
                                <Typography
                                    key={label + href}
                                    variant="h5"
                                    color={
                                        isLast ? "textPrimary" : "textSecondary"
                                    }
                                    gutterBottom
                                >
                                    {label}
                                </Typography>
                            );
                            if (href) {
                                bc = (
                                    <Link href={href} as={as} shallow={shallow}>
                                        <a>{bc}</a>
                                    </Link>
                                );
                            }
                            return bc;
                        })}
                    </Breadcrumbs>
                    <Divider />
                </div>
                <div className="main-body">{children}</div>
                <div
                    className="main-footer"
                    style={footerEl ? undefined : { display: "none" }}
                >
                    {footerEl}
                </div>
            </span>
            <style jsx>{`
                @media (min-width: 900px) {
                    .root {
                        display: grid;
                        height: 100vh;
                        grid-template-columns: 280px auto;
                        position: relative;
                        overflow: hidden;
                        background-color: var(--background-light);
                    }

                    .sidebar {
                        padding: 0 15px;
                    }

                    .logo-box {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 120px;
                        padding: 0 40px;
                    }

                    .user-box {
                        padding: 30px 50px;
                        padding-right: 0;
                    }

                    .main {
                        margin: 20px 0;
                        background-color: var(--background-dark);
                        border-top-left-radius: 20px;
                        border-bottom-left-radius: 20px;

                        display: flex;
                        flex-direction: column;
                        overflow: hidden;
                    }

                    .main-header {
                        padding: 40px 60px 0;
                        z-index: 8;
                    }

                    .main-body {
                        overflow-y: auto;
                        padding: 20px 60px 60px;
                    }

                    .main-footer {
                        padding: 20px 60px;
                        z-index: 8;
                        margin-top: auto;
                    }
                }

                @media (max-width: 900px) {
                    .root {
                    }
                    .sidebar {
                        display: none;
                    }
                    .main {
                    }
                }
            `}</style>
        </div>
    );
};

export default DesktopAppLayout;

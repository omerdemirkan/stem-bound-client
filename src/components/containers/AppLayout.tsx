import useNavigationData from "../hooks/useNavigationData";
import AuthContext from "../contexts/AuthContext";
import NotificationContext from "../contexts/NotificationContext";
import { useRouter } from "next/router";
import { INavigationDataButton, ENotificationTypes } from "../../utils/types";
import { useContext, useState, useRef } from "react";
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Button,
    Avatar,
    Divider,
    Typography,
    Menu,
    MenuItem,
} from "@material-ui/core";
import Link from "next/link";
import WordLogoSVG from "../svg/icons/word-logo";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

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

const AppLayout: React.FC = ({ children }) => {
    const router = useRouter();
    const navigationData = useNavigationData();
    const { user, logout } = useContext(AuthContext);
    const { createAlert } = useContext(NotificationContext);

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

    return (
        <>
            <div className="root">
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
                            <Link href="/app/my-account">My Account</Link>
                        </MenuItem>
                        <MenuItem onClick={toggleUserMenu}>Settings</MenuItem>
                        <MenuItem onClick={handleOpenLogoutModal}>
                            Logout
                        </MenuItem>
                    </Menu>

                    <Divider />

                    <List component="nav">
                        {navigationData?.buttons.map(function ({
                            path,
                            Icon,
                            text,
                        }: INavigationDataButton) {
                            const selected = path.includes(router.pathname);
                            return (
                                <Link href={path} key={path}>
                                    <ListItem
                                        button
                                        className={classes.listItem}
                                        selected={selected}
                                    >
                                        <ListItemIcon>
                                            <Icon
                                                color={
                                                    selected
                                                        ? "primary"
                                                        : undefined
                                                }
                                            />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={text}
                                            color={
                                                selected ? "primary" : undefined
                                            }
                                        />
                                    </ListItem>
                                </Link>
                            );
                        })}
                    </List>

                    <Button
                        onClick={handleOpenLogoutModal}
                        color="primary"
                        variant="text"
                        fullWidth
                    >
                        LOGOUT
                    </Button>
                    <Typography
                        paragraph
                        gutterBottom
                        color="textSecondary"
                        className={classes.finePrint}
                    >
                        STEM-BOUND EDUCATION™
                    </Typography>
                </aside>

                <span className="main">{children}</span>
            </div>
            <style jsx>{`
                .root {
                    display: grid;
                    height: 100vh;
                    grid-template-columns: 280px auto;
                    position: relative;
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
                    padding: 40px;
                    overflow-y: scroll;
                    overflow-x: hidden;
                }
            `}</style>
        </>
    );
};

export default AppLayout;

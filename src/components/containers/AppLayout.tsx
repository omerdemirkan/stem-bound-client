import useNavigationData from "../hooks/useNavigationData";
import AuthContext from "../contexts/AuthContext";
import NotificationContext from "../contexts/NotificationContext";
import { useRouter } from "next/router";
import { INavigationDataButton, ENotificationTypes } from "../../utils/types";
import { useContext } from "react";
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
} from "@material-ui/core";
import Link from "next/link";
import WordLogoSVG from "../svg/icons/word-logo";

const useStyles = makeStyles({
    listItem: {
        paddingLeft: "40px",
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

    const classes = useStyles();

    function logoutHandler() {
        logout();
        router.push("/");
    }

    return (
        <>
            <div className="root">
                <aside className="sidebar">
                    <div className="logo-box">
                        <WordLogoSVG width="60px" />
                    </div>
                    <div className="user-box">
                        <Avatar src={user.profilePictureUrl} />
                    </div>
                    <Divider />
                    <List component="nav">
                        {navigationData?.buttons.map(
                            ({ path, Icon, text }: INavigationDataButton) => (
                                <Link href={path} key={path}>
                                    <ListItem
                                        button
                                        className={classes.listItem}
                                        selected={path.includes(
                                            router.pathname
                                        )}
                                    >
                                        <ListItemIcon>
                                            <Icon />
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItem>
                                </Link>
                            )
                        )}
                    </List>

                    <Button
                        onClick={() =>
                            createAlert({
                                headerText: "Are you sure you want to log out?",
                                bodyText: "This is a body text",
                                type: ENotificationTypes.DANGER,
                                onOk: logoutHandler,
                                onCancel: () => {},
                            })
                        }
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
                    height: 100px;
                    padding: 20px 40px 0;
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

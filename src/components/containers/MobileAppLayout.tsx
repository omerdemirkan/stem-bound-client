import { IAppLayoutProps } from "./AppLayout";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useRef, useState } from "react";
import AppNavigation from "./AppNavigation";
import Drawer from "@material-ui/core/Drawer";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import WordLogoSVG from "../svg/icons/word-logo";

const useStyles = makeStyles({
    appBar: {
        top: "auto",
        bottom: "0",
    },
    toolBar: {},
    drawer: {},
});

const MobileAppLayout: React.FC<IAppLayoutProps> = ({ children }) => {
    const classes = useStyles();
    const rootRef = useRef<HTMLDivElement>();
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const smallScreen = useMediaQuery("(max-width: 900px)");
    const toggleSidebar = () => setSidebarOpen((prev) => !prev);

    return (
        <div className="root" ref={rootRef}>
            <div
                className="mobile-navigation-wrapper"
                aria-hidden={!smallScreen}
                style={{ display: smallScreen ? "block" : "none" }}
            >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton color="inherit" onClick={toggleSidebar}>
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer
                    anchor="left"
                    open={sidebarOpen}
                    onClose={toggleSidebar}
                    className={classes.drawer}
                >
                    <div className="logo-box">
                        <WordLogoSVG width="60px" />
                    </div>
                    <AppNavigation />
                </Drawer>
            </div>
            {children}
            <style jsx>{`
                .logo-box {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 90px;
                    padding: 0 40px;
                    max-width: 250px;
                }
            `}</style>
        </div>
    );
};

export default MobileAppLayout;

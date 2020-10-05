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

const useStyles = makeStyles({
    appBar: {
        top: "auto",
        bottom: "0",
    },
    toolBar: {},
    drawer: {
        padding: "300px",
    },
});

const MobileAppLayout: React.FC<IAppLayoutProps> = ({ children }) => {
    const classes = useStyles();
    const rootRef = useRef<HTMLDivElement>();
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const toggleSidebar = () => setSidebarOpen((prev) => !prev);
    return (
        <div className="root" ref={rootRef}>
            <div className="mobile-navigation-wrapper">
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
                    <AppNavigation />
                </Drawer>
            </div>
            {children}
            <style jsx>{`
                @media (min-width: 901px) {
                    .mobile-navigation-wrapper {
                        display: none;
                    }
                }
            `}</style>
        </div>
    );
};

export default MobileAppLayout;

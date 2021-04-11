import StaticDesktopNavbar from "./StaticDesktopNavbar";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import StaticMobileNavbar from "./StaticMobileNavbar";

const Navbar = () => {
    const mobileSize = useMediaQuery("(max-width: 900px)");
    return !mobileSize ? <StaticDesktopNavbar /> : <StaticMobileNavbar />;
};

export default Navbar;

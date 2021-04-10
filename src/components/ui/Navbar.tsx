import Link from "next/link";
import DesktopNavbar from "./DestopNavbar";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
    const mobileSize = useMediaQuery("(max-width: 900px)");
    return !mobileSize ? <DesktopNavbar /> : <MobileNavbar />;
};

export default Navbar;

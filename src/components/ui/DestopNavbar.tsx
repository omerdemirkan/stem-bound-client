import Link from "next/link";
import { EUserRoles } from "../../utils/types";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import WordLogoSVG from "../svg/icons/word-logo";

const DesktopNavbar = () => {
    return (
        <div className="desktop-wrapper">
            <Link href="/">
                <a>
                    <WordLogoSVG height="80px" width="180px" />
                </a>
            </Link>
            <div className="page-nav-container">
                <Link href="/about">
                    <a>
                        <Typography>about us</Typography>
                    </a>
                </Link>
                <Link href="/our-team">
                    <a>
                        <Typography>our team</Typography>
                    </a>
                </Link>
                <Link href={`/search?q=${EUserRoles.INSTRUCTOR}`}>
                    <a>
                        <Typography>search</Typography>
                    </a>
                </Link>
                <Link href="/log-in">
                    <a>
                        <Typography>log in</Typography>
                    </a>
                </Link>
                <Link href="/sign-up">
                    <a>
                        <Typography>sign up</Typography>
                    </a>
                </Link>
                <Link href="/sign-up">
                    <Button variant="outlined" color="primary">
                        Donate
                    </Button>
                </Link>
                <Link href="/volunteer-page">
                    <Button variant="contained" color="primary">
                        Volunteer
                    </Button>
                </Link>
            </div>

            <style jsx>
                {`
                    .desktop-wrapper {
                        display: flex;
                        justify-content: space-between;
                        padding: 0 40px;
                    }
                    .page-nav-container {
                        width: 800px;
                        max-width: 70%;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                `}
            </style>
        </div>
    );
};

export default DesktopNavbar;

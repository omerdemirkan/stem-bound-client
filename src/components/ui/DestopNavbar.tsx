import Link from "next/link";
import Button from "@material-ui/core/Button";
import WordLogoSVG from "../svg/icons/word-logo";
import { staticNavigationData } from "../../utils/constants";
import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";

const DesktopNavbar = () => {
    const router = useRouter();
    function handleLinkColor(path) {
        try {
            // checking based on path before queries
            return path.split("?")[0] === router.pathname.split("?")[0]
                ? "primary"
                : "inherit";
        } catch {
            return "inherit";
        }
    }

    const handleScrollToAboutUs = () => {
        window.scrollBy({
            top: window.innerHeight * 1.5,
            behavior: "smooth",
        });
    };

    return (
        <div className="desktop-wrapper">
            <Link href="/">
                <a>
                    <WordLogoSVG height="80px" width="180px" />
                </a>
            </Link>

            <div className="page-nav-container">
                {staticNavigationData.links.map(({ title, path, as }) => (
                    <Link href={path} as={as} key={title + path}>
                        <a
                            onClick={
                                path === "/" && router?.pathname === "/"
                                    ? handleScrollToAboutUs
                                    : null
                            }
                        >
                            <Typography
                                color={handleLinkColor(path)}
                                component="span"
                            >
                                {title}
                            </Typography>
                        </a>
                    </Link>
                ))}
                {staticNavigationData.buttons.map(
                    ({ title, path, variant }) => (
                        <Link href={path} key={title + path}>
                            <a>
                                <Button
                                    variant={(variant || "text") as any}
                                    color="primary"
                                >
                                    {title}
                                </Button>
                            </a>
                        </Link>
                    )
                )}
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
                        z-index: 10;
                    }
                `}
            </style>
        </div>
    );
};

export default DesktopNavbar;

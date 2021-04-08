import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Link from "next/link";

const HomePageHeroSection: React.FC = () => {
    const scrollToRef = () => {
        window.scrollBy({
            top: window.innerHeight,
            behavior: "smooth",
        });
    };

    return (
        <>
            <div className="hero">
                <div className="hero-text-section">
                    <div className="hero-text-box">
                        <div>
                            <Typography
                                variant="h3"
                                color="textSecondary"
                                gutterBottom
                            >
                                Help Connect Students to{" "}
                                <span className="emphasise-content">
                                    Opportunites
                                </span>
                            </Typography>
                        </div>

                        <div>
                            <Typography paragraph gutterBottom>
                                <Box fontSize={18} marginBottom="30px">
                                    Lorem ipsum, dolor sit amet consectetur
                                    adipisicing elit. Saepe nam vero nisi aut
                                    rem doloremque temporibus adipisci omnis
                                    quae eaque animi ipsam hic voluptatum autem
                                    rerum fugit, quidem, voluptatem minima.
                                </Box>
                            </Typography>
                        </div>

                        <div className="btn-container">
                            <Button
                                variant="outlined"
                                color="primary"
                                size="large"
                                onClick={scrollToRef}
                            >
                                Learn More
                            </Button>

                            <Link href="/sign-up">
                                <a>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        className="spaced-horizontal"
                                    >
                                        SIGN UP
                                    </Button>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
                <img
                    id="section-img"
                    src="section-img.svg"
                    alt="section-img"
                    className="hero-section-image"
                />
            </div>
            <style jsx>{`
                .hero {
                    display: flex;
                    justify-content: flex-end;
                    align-items: stretch;
                    flex-wrap: wrap;
                    min-height: calc(100vh - 90px);
                }
                .hero-text-section {
                    flex-grow: 1;
                    padding: 18vh 5vw 10vw;
                }
                .hero-text-box {
                    margin: auto;
                    max-width: 700px;
                }
                .hero-section-image {
                    margin-top: -10%;
                }
                .emphasise-content {
                    color: var(--accent-light);
                }
            `}</style>
        </>
    );
};

export default HomePageHeroSection;

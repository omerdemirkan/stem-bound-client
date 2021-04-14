import Head from "next/head";
import StaticLayout from "../components/layouts/StaticLayout";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import FadeIn from "../components/ui/FadeIn";

const HomePage: React.FC = () => {
    const scrollToRef = () => {
        window.scrollBy({
            top: window.innerHeight * 1.5,
            behavior: "smooth",
        });
    };
    return (
        <StaticLayout>
            <Head>
                <title>Home - STEM-bound</title>
            </Head>

            {/* Decorative Shapes (in the background) */}
            <img
                src="circleRight.svg"
                id="circle-right"
                className="shape"
                alt=""
                role="presentation"
            />
            <img
                src="triangle.svg"
                id="triangle"
                className="shape"
                alt=""
                role="presentation"
            />
            <img
                src="circleLeft.svg"
                id="circle-left"
                className="shape"
                alt=""
            />
            <img
                src="square.svg"
                id="square"
                className="shape"
                alt=""
                role="presentation"
            />

            <div className="hero">
                <div className="hero-text-section">
                    <FadeIn durationMs={300}>
                        <div className="hero-text-box">
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

                            <Typography paragraph gutterBottom>
                                <Box fontSize={18} marginBottom="30px">
                                    Lorem ipsum, dolor sit amet consectetur
                                    adipisicing elit. Saepe nam vero nisi aut
                                    rem doloremque temporibus adipisci omnis
                                    quae eaque animi ipsam hic voluptatum autem
                                    rerum fugit, quidem, voluptatem minima.
                                </Box>
                            </Typography>

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
                    </FadeIn>
                </div>
                <img
                    id="section-img"
                    src="section-img.svg"
                    alt="section-img"
                    className="hero-section-image"
                />
            </div>

            <div className="app-detail">
                <div className="image-section">
                    <img src="stem-bound-demo.png" alt="" />
                </div>

                <div className="text-section">
                    <div>
                        <Typography variant="h3" color="primary" gutterBottom>
                            One Title Here
                        </Typography>

                        <Typography paragraph>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Saepe nam vero nisi aut rem doloremque
                            temporibus adipisci omnis quae eaque animi ipsam hic
                            voluptatum autem rerum fugit, quidem, voluptatem
                            minima.
                        </Typography>
                        <Typography paragraph>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Saepe nam vero nisi aut rem doloremque
                            temporibus adipisci omnis quae eaque animi ipsam hic
                            voluptatum autem rerum fugit, quidem, voluptatem
                            minima.
                        </Typography>

                        <Link href="/sign-up">
                            <a>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    className="spaced-verticle"
                                >
                                    SIGN UP
                                </Button>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="info-section">
                <div className="info-section-wrapper">
                    <div className="info-container">
                        <img className="icons" src="guide-icon.svg" alt="" />
                        <Typography variant="h5" color="primary" gutterBottom>
                            Guiding Youth
                        </Typography>
                        <Typography variant="body1" component="p">
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Saepe nam vero nisi aut rem doloremque
                            temporibus adipisci omnis quae eaque animi ipsam hic
                            voluptatum autem rerum fugit, quidem, voluptatem
                            minima.
                        </Typography>
                    </div>
                    <div className="info-container">
                        <img
                            className="icons"
                            src="instructor-icon.svg"
                            alt=""
                        />
                        <Typography variant="h5" color="primary" gutterBottom>
                            Top Instructors
                        </Typography>
                        <Typography variant="body1" component="p">
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Saepe nam vero nisi aut rem doloremque
                            temporibus adipisci omnis quae eaque animi ipsam hic
                            voluptatum autem rerum fugit, quidem, voluptatem
                            minima.
                        </Typography>
                    </div>
                    <div className="info-container">
                        <img className="icons" src="progress-icon.svg" alt="" />
                        <Typography variant="h5" color="primary" gutterBottom>
                            Teaching New Skills
                        </Typography>
                        <Typography variant="body1" component="p">
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Saepe nam vero nisi aut rem doloremque
                            temporibus adipisci omnis quae eaque animi ipsam hic
                            voluptatum autem rerum fugit, quidem, voluptatem
                            minima.
                        </Typography>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .shape {
                    position: absolute;
                    z-index: -1;
                }

                #triangle {
                    top: 0;
                    left: 20%;
                }
                #circle-left {
                    top: 150px;
                }
                #square {
                    top: 100vh;
                }
                #circle-right {
                    right: 0;
                }

                @media (max-width: 900px) {
                    .shape {
                        display: none;
                    }
                    .info-section {
                        margin: 50px 0;
                    }
                }
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
                    max-width: 650px;
                }
                .hero-section-image {
                    margin-top: -10%;
                }
                .emphasise-content {
                    color: var(--accent-light);
                }
                .app-detail {
                    display: flex;
                    justify-content: space-evenly;
                    padding: 0 5vw 25vh;
                    align-items: center;
                    flex-wrap: wrap-reverse;
                }
                .image-section {
                    max-width: 650px;
                }
                .image-section > img {
                    filter: drop-shadow(-5px 5px 0.75rem #bbbbbb);
                }
                .text-section {
                    max-width: 600px;
                    padding: 100px 0;
                }
                .info-section {
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    padding-bottom: calc(50vh - 200px);
                }
                .info-section-wrapper {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    margin: 0 auto;
                    width: 90%;
                }
                .info-container {
                    max-width: 350px;
                    margin: 20px auto;
                }
                .icons {
                    margin: 20px 0;
                }
            `}</style>
        </StaticLayout>
    );
};

export default HomePage;

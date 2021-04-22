import Head from "next/head";
import StaticLayout from "../components/layouts/StaticLayout";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import FadeIn from "../components/ui/FadeIn";
import { useRef } from "react";

const HomePage: React.FC = () => {
    const infoRef = useRef<HTMLDivElement>();
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
                    <div className="hero-text-box">
                        <FadeIn delayMs={100}>
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
                        </FadeIn>

                        <FadeIn delayMs={150}>
                            <Typography paragraph gutterBottom>
                                <Box fontSize={18} marginBottom="30px">
                                    We connect college students and
                                    professionals in STEM fields to high schools
                                    to teach extracurricular coursework on
                                    in-demand skills.
                                </Box>
                            </Typography>
                        </FadeIn>

                        <FadeIn delayMs={200}>
                            <Button
                                variant="outlined"
                                color="primary"
                                size="large"
                                onClick={() =>
                                    infoRef.current.scrollIntoView({
                                        behavior: "smooth",
                                    })
                                }
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
                                        SIGN UP FOR FREE
                                    </Button>
                                </a>
                            </Link>
                        </FadeIn>
                    </div>
                </div>
                <img
                    id="section-img"
                    src="hero-section-illustration.svg"
                    alt="section-img"
                    className="hero-section-image"
                />
            </div>

            <div className="info-section" ref={infoRef}>
                <div className="info-section-wrapper">
                    <div className="info-container">
                        <FadeIn delayMs={300}>
                            <img
                                className="icons"
                                src="guide-icon.svg"
                                alt=""
                                role="presentation"
                            />
                            <Typography
                                variant="h5"
                                color="primary"
                                gutterBottom
                            >
                                Volunteer By Teaching
                            </Typography>
                            <Typography variant="body1" component="p">
                                Whether it's afterschool or on weekends, in
                                person or virtual, every day or once a month,
                                STEM-bound helps college students and STEM
                                professionals find flexible teaching
                                opportunities.
                            </Typography>
                        </FadeIn>
                    </div>
                    <div className="info-container">
                        <FadeIn delayMs={400}>
                            <img
                                className="icons"
                                src="instructor-icon.svg"
                                alt=""
                                role="presentation"
                            />
                            <Typography
                                variant="h5"
                                color="primary"
                                gutterBottom
                            >
                                Find Instructors
                            </Typography>
                            <Typography variant="body1" component="p">
                                School officials can search for instructors
                                nearby or by area of expertise and get in touch
                                to set up coursework on anything from an
                                programming and technology to marine biology and
                                research.
                            </Typography>
                        </FadeIn>
                    </div>
                    <div className="info-container">
                        <FadeIn delayMs={500}>
                            <img
                                className="icons"
                                src="progress-icon.svg"
                                alt=""
                                role="presentation"
                            />
                            <Typography
                                variant="h5"
                                color="primary"
                                gutterBottom
                            >
                                Enroll in Extracurricular Courses
                            </Typography>
                            <Typography variant="body1" component="p">
                                Any high school student can browse STEM-bound
                                courses offered at their school and enroll
                                instantly. Further, students can contact their
                                school officials to express interest in
                                coursework in a certain field if none exists.
                            </Typography>
                        </FadeIn>
                    </div>
                </div>
            </div>
            <div className="app-detail">
                <div className="image-section">
                    <img src="stem-bound-demo.png" alt="" />
                </div>

                <div className="text-section">
                    <FadeIn delayMs={300}>
                        <Typography variant="h3" color="primary" gutterBottom>
                            One Online Platform
                        </Typography>
                    </FadeIn>

                    <FadeIn delayMs={300}>
                        <Typography paragraph>
                            Whether you are a college student looking to
                            volunteer on the weekends, a school official looking
                            for after school opportunities for your students, or
                            a high schooler looking for extracurricular
                            opportunities, STEM-bound is the platform for you.
                        </Typography>
                        <Typography paragraph>
                            Get started today! Signing up is free and not
                            binding.
                        </Typography>
                    </FadeIn>

                    <FadeIn delayMs={300}>
                        <Link href="/sign-up">
                            <a>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    className="spaced-verticle"
                                >
                                    SIGN UP FOR FREE
                                </Button>
                            </a>
                        </Link>
                    </FadeIn>
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
                    padding: 18vh 20px 10vw;
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
                    padding: 20px 20px calc(50vh - 300px);
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
                    padding-bottom: 25vh;
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

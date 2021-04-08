import Head from "next/head";
import StaticLayout from "../components/ui/StaticLayout";
import HomePageIntro from "../components/ui/HomePageIntro";
import HomePageInfo from "../components/ui/HomePageInfo";
import HomePageAppDetail from "../components/ui/HomePageAppDetail";

const HomePage: React.FC = () => {
    return (
        <StaticLayout>
            <Head>
                <title>STEM-bound - Home</title>
            </Head>
            <img src="triangle.svg" id="triangle" className="shape" alt="" />
            <img
                src="circleLeft.svg"
                id="circle-left"
                className="shape"
                alt=""
            />
            <HomePageIntro />
            <img src="square.svg" alt="" id="square" className="shape" />
            <HomePageInfo />
            <img
                src="circleRight.svg"
                alt=""
                id="circle-right"
                className="shape"
            />
            <HomePageAppDetail />

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
                }
            `}</style>
        </StaticLayout>
    );
};

export default HomePage;

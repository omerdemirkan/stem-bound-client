import StaticLayout from "../components/ui/StaticLayout";
import Head from "next/head";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import VolunteerOption from "../components/ui/VolunteerOption";

const Volunteer: React.FC = () => {
    const options = [
        {
            id: 0,
            imgUrl: "volunteer-stem-bound-img.svg",
            title: "A Developer at STEM-bound",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente accusamus aut cum, eligendi dignissimos sequi natus consequuntur quae error pariatur dolorum, accusantium repellendus nulla! Sit explicabo at itaque? Nesciunt, beatae.",
            pathToNextPage: "/",
        },
        {
            id: 1,
            imgUrl: "volunteer-inst-img.svg",
            title: "A Instructor at a High School",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente accusamus aut cum, eligendi dignissimos sequi natus consequuntur quae error pariatur dolorum, accusantium repellendus nulla! Sit explicabo at itaque? Nesciunt, beatae.",
            pathToNextPage: "/sign-up?role=INSTRUCTOR",
        },
    ];
    return (
        <StaticLayout>
            <Head>
                <title>STEM-bound - Volunteer</title>
            </Head>

            <div className="volunteer-page-wrapper">
                <div className="page-title-container">
                    <Typography variant="h2" component="h1" color="primary">
                        <Box fontWeight="fontWeightLight">Volunteer </Box>
                    </Typography>
                </div>

                <div className="page-content-wrapper">
                    {options.map((el) => {
                        console.log(el.title);
                        return (
                            <VolunteerOption
                                key={el.id}
                                id={el.id}
                                imgUrl={el.imgUrl}
                                title={el.title}
                                description={el.description}
                                pathToNextPage={el.pathToNextPage}
                            />
                        );
                    })}
                </div>
            </div>
            <style jsx>{`
                .volunteer-page-wrapper {
                    align-items: center;
                    text-align: center;
                    height: fit-content;
                    min-height: 100vh;
                    min-width: 100%;
                }

                .page-title-container {
                    margin: 0 auto;
                }
                .page-content-wrapper {
                    display: flex;
                    flex-wrap: wrap;
                    margin: 0 auto;
                    width: 90%;
                    height: fit-content;
                    justify-content: space-between;
                }
            `}</style>
        </StaticLayout>
    );
};

export default Volunteer;

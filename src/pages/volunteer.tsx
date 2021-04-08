import StaticLayout from "../components/ui/StaticLayout";
import Head from "next/head";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import VolunteerOption, {
    IVolunteerOptionProps,
} from "../components/ui/VolunteerOption";

const options: IVolunteerOptionProps[] = [
    {
        imgUrl: "volunteer-stem-bound-img.svg",
        title: "A Developer at STEM-bound",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente accusamus aut cum, eligendi dignissimos sequi natus consequuntur quae error pariatur dolorum, accusantium repellendus nulla! Sit explicabo at itaque? Nesciunt, beatae.",
        path: "/developer-submission",
    },
    {
        imgUrl: "volunteer-inst-img.svg",
        title: "A Instructor at a High School",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente accusamus aut cum, eligendi dignissimos sequi natus consequuntur quae error pariatur dolorum, accusantium repellendus nulla! Sit explicabo at itaque? Nesciunt, beatae.",
        path: "/sign-up?role=INSTRUCTOR",
    },
];

const Volunteer: React.FC = () => {
    return (
        <StaticLayout header="Volunteer">
            <Head>
                <title>STEM-bound - Volunteer</title>
            </Head>

            <div className="volunteer-options-container">
                {options.map((props) => (
                    <VolunteerOption key={props.title} {...props} />
                ))}
            </div>
            <style jsx>{`
                .volunteer-options-container {
                    display: flex;
                    justify-content: space-evenly;
                    flex-wrap: wrap;
                    padding-bottom: 20vh;
                }
            `}</style>
        </StaticLayout>
    );
};

export default Volunteer;

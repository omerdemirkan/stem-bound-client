import StaticLayout from "../components/layouts/StaticLayout";
import StaffInfoCard from "../components/ui/StaffInfoCard";
import { stemboundTeamMembers } from "../utils/constants";
import Grid from "@material-ui/core/Grid";
import FadeIn from "../components/ui/FadeIn";
import Head from "next/head";

const OurTeamPage = () => {
    return (
        <StaticLayout header="Meet Our Team">
            <Head>
                <title>Our Team - STEM-bound</title>
            </Head>
            <Grid container justify="center">
                {stemboundTeamMembers.map((member, i) => {
                    return (
                        <Grid item xs={12} md={6} lg={4} key={member.id}>
                            <FadeIn delayMs={100 + i * 50}>
                                <StaffInfoCard
                                    name={member.name}
                                    position={member.position}
                                    bio={member.bio}
                                    imgUrl={member.imgUrl}
                                    email={member.email}
                                    github={member.gitHub}
                                    linkedin={member.linkIn}
                                />
                            </FadeIn>
                        </Grid>
                    );
                })}
            </Grid>
        </StaticLayout>
    );
};

export default OurTeamPage;

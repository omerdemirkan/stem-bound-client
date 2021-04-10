import StaticLayout from "../components/layouts/StaticLayout";
import StaffInfoCard from "../components/ui/StaffInfoCard";
import { stemboundTeamMembers } from "../utils/constants";
import Grid from "@material-ui/core/Grid";

const OurTeamPage = () => {
    return (
        <StaticLayout header="Meet Our Team">
            <Grid container justify="center">
                {stemboundTeamMembers.map((member) => {
                    return (
                        <Grid item xs={12} md={6} lg={4} key={member.id}>
                            <StaffInfoCard
                                name={member.name}
                                position={member.position}
                                bio={member.bio}
                                imgUrl={member.imgUrl}
                                email={member.email}
                                github={member.gitHub}
                                linkedin={member.linkIn}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </StaticLayout>
    );
};

export default OurTeamPage;

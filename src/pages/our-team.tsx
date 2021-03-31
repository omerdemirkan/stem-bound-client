import StaticLayout from "../components/ui/StaticLayout";
import StaffInfoCard from "../components/ui/StaffInfoCard";
import { stemboundTeamMembers } from "../utils/constants";

const OurTeamPage = () => {
    return (
        <StaticLayout>
            <div className="our-team-page-wrapper">
                <div className="page-title-container">
                    <h1 className="page-title">Meet Our Team</h1>
                </div>

                <div className="team-section-wrapper">
                    {stemboundTeamMembers.map((member) => {
                        return (
                            <StaffInfoCard
                                key={member.id}
                                name={member.name}
                                position={member.position}
                                bio={member.bio}
                                imgUrl={member.imgUrl}
                                email={member.email}
                                gitHub={member.gitHub}
                                linkIn={member.linkIn}
                            />
                        );
                    })}
                </div>
            </div>

            <style jsx>{`
                .our-team-page-wrapper {
                    min-height: 100vh;
                    width: 100%;
                }

                .page-title-container {
                    max-width: 400px;
                    margin: 30px auto;
                }
                .page-title {
                    font-style: normal;
                    font-weight: 300;
                    font-size: 50px;
                    margin: 0;
                    text-align: center;
                    color: #826efd;
                }

                .team-section-wrapper {
                    display: flex;
                    flex-wrap: wrap;
                    margin: 0 auto;
                    max-width: 90%;
                    justify-content: space-between;
                }
            `}</style>
        </StaticLayout>
    );
};

export default OurTeamPage;

import StaticLayout from "../components/ui/StaticLayout";
import StaffInfoCard from "../components/ui/StaffInfoCard";

const OurTeamPage = () => {
    const teamMember = [
        {
            id: 0,
            name: "Omer Demirkan",
            position: "CEO & Founder",
            bio:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            imgUrl: "Omer-pp.png",
            email: "omerfarukpiano@gmail.com",
            gitHub: "https://github.com/omerdemirkan",
            linkIn: "https://www.linkedin.com/in/omer-demirkan",
        },
        {
            id: 1,
            name: "Mehmet Nadi",
            position: "Unknown positon",
            bio:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            imgUrl: "Mehmet-pp.png",
            email: "mhmtalperennadi@gmail.com",
            gitHub: "https://github.com/mehmetalperen",
            linkIn: "https://www.linkedin.com/in/mehmet-nadi-03372a1b1",
        },
        {
            id: 2,
            name: "Emmad Usmani",
            position: "Unknown positon",
            bio:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            imgUrl: "Emmad-pp.png",
            email: "emmadusmani@berkeley.edu",
            gitHub: "https://github.com/EmmadUsmani",
            linkIn: "https://www.linkedin.com/in/emmadusmani/",
        },
    ];
    return (
        <StaticLayout>
            <div className="our-team-page-wrapper">
                <div className="page-title-container">
                    <h1 className="page-title">Meet Our Team</h1>
                </div>

                <div className="team-section-wrapper">
                    {teamMember.map((member) => {
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

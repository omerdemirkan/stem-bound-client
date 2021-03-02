import Link from "next/link";
import { EUserRoles } from "../../utils/types";
import Button from '@material-ui/core/Button';


const StaticLayout: React.FC = ({ children }) => {
    return (
        <>
            <div className="main">
                <nav>

                    <div className="logo-container">
       
                        <Link href="/">
                        <img className='logo' src="stem-logo.svg" alt="logo"/>
                        </Link> 
                                                              
                    </div>


                    <div className="page-nav-container">
                        <Link href="/about">
                            <a>about us</a>
                        </Link>
                        <Link href="/ourTeam">
                            <a>our team</a>
                        </Link>
                        <Link href={`/search?q=${EUserRoles.INSTRUCTOR}`}>
                            <a>Search</a>
                        </Link>
                        <Link href="/log-in">
                            <a>Log In</a>
                        </Link>
                        <Link href="/sign-up">
                            <a>Sign Up</a>
                        </Link>
                        <Link href="/sign-up">
                            <Button variant="contained"><p className="button-text">Donate</p></Button>
                        </Link>
                        <Link href="/sign-up">
                            <Button variant="contained"><p className="button-text">Volunteer</p></Button>
                        </Link>                        
                    </div>

                </nav>
                {children}
            </div>
            <footer>
                <div className="footer-info">
                    <div className="footer-info-container">
                        <img id="footer-logo" src="footer-logo.svg" alt=""/>
                        <div className="footer-text-container">
                            <p className="footer-text">
                            © Stem-bound
                            </p>
                            <p className="footer-text">
                            {`${new Date().getFullYear()} ALL RIGHTS RESEVERED`}
                            </p>                        
                        </div>                        
                    </div>


                </div>

                <div className="footer-contact">
                    <img src="email-icon.svg" alt="email-icon" className="footer-icon"/>
                    <img src="github-icon.svg" alt="github-icon" className="footer-icon"/>
                    <img src="linkedin-icon.svg" alt="linkedn-icon" className="footer-icon"/>

                </div>
            </footer>

            <style jsx>{`
                
                .main {
                    min-height: 100vh;
                    font-family: Roboto;
                    font-style: normal;
                    font-weight: normal;
                    line-height: 31px;
                    flex-wrap: wrap;
                }
                a {
                    color: #5242B0;
                }
                div {
                    text-align: center;
                    align-items: center;
                    flex-wrap: wrap;
                }
                nav {
                    display: flex;
                    justify-content: space-between;
                    padding: 19px 5%;
                    background-color: white;
                
                }
                .logo-container {
                    max-width: 30%;
                    display:flex;
                    text-align: center;
                    

                }
                .logo {
                    margin: 0;
                    padding:0;
                }
                .logo:hover {
                    cursor: pointer;
                }
                .page-nav-container {
                    width: 800px;
                    max-width:70%;
                    border-width: 2px;
                    display: flex;
                    justify-content: space-between;
                }
                .button-text {
                    margin: 0;
                    color: #5242B0;
                }

                footer {
                    margin: 0;
                    padding: 0 41px 0 83px;
                    height: 127px;
                    background-color:#F8F8F8;
                    display: flex;
                    flex-wrap:wrap-reverse;
                    justify-content: space-between;
                    text-align: center;
                    align-items: center;
                }
                .footer-info {
                    width: 50%;
                    display: flex;
                }
                .footer-info-container{
                    display:flex;
                }
                .footer-text-container {

                    text-align: left;
                    font-family: Lato;
                    font-style: normal;
                    font-weight: bold;
                    font-size: 14px;
                    line-height: 5px;
                }
                #footer-logo {
                    padding-right: 35px;
                }
                .footer-contact {
                    width: 50%;
                    display:flex;
                    justify-content: space-evenly;
                }
                {/* SMALLER SCREEN SIZE. BREAKING POINT 900px */}
                @media only screen and (max-width: 900px) {
                    




                    footer {
                        min-height: 100vh;
                        height:fit-content;
                        align-items: center;
                        flex-wrap:wrap-reverse;
                        
                    }
                    .footer-contact {
                        display:block;
                        height: fit-content;
                        width: 100%;
                        padding:5% 0;
                        

                    }
                    .footer-info {
                        height: fit-content;
                        min-height: 25%;
                        width: 100%;
                        
                        
                    }
                    .footer-info-container {
                        margin: 0 ;
                        width: 100%;
                        text-align: center;
                        justify-content: center;
                        height:fit-content;


                        
                        
                    }
                    
                    .footer-icon {
                        margin: 0 auto 20% auto;
                        width: 100px;
                        height: auto;
                        
                    }
                }
            `}</style>
        </>
    );
};

export default StaticLayout;

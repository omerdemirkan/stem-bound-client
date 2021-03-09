import Typography from '@material-ui/core/Typography';



const Footer = () => {



    return (
        <>
            <div className="footer-wrapper">

                        <div className="footer-info">
                            <div className="footer-info-container">
                                <img id="footer-logo" src="footer-logo.svg" alt=""/>
                                <div className="footer-text-container">
                                    <Typography component="p">
                                        {`© Stem-bound ${new Date().getFullYear()} ALL RIGHTS RESEVERED`}
                                    </Typography>
                                           
                                </div>                        
                            </div>


                        </div>

                        <div className="footer-contact">
                            <img src="email-icon.svg" alt="email-icon" className="footer-icon"/>
                            <img src="github-icon.svg" alt="github-icon" className="footer-icon"/>
                            <img src="linkedin-icon.svg" alt="linkedn-icon" className="footer-icon"/>

                        </div>
                </div>

            <style jsx>
                {`
                .footer-wrapper {
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
                    align-items: center;

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


                @media only screen and (max-width: 900px) {




                    .footer-wrapper {
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
                        width: 100%;
                        margin: 0;
                        
                        
                    }
                    .footer-info-container {
                        margin: 0 ;
                        width: 100%;
                        text-align: center;
                        justify-content: center;
                        height:fit-content;


                        
                        
                    }
                    
                    .footer-icon {
                        margin: 0 auto 10% auto;
                        width: 100px;
                        height: auto;
                        
                    }
                `}
            </style>
        </>
    )
}


export default Footer;
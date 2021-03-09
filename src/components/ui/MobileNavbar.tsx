import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { useEffect, useState } from "react";
import Link from "next/link";
import { EUserRoles } from "../../utils/types";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const MobileNavbar =()=> {


    const [isMenuOpen, setIsMenuOpen] = useState(false);

    
    return (
    <>

    <div className="mobile-navbar-wrapper">
        <div className="toggle-btn-container">
            <IconButton color="primary" onClick={()=> {
                setIsMenuOpen(!isMenuOpen)
            }}>
                <MenuIcon/>
            </IconButton>
        </div>

    
            <div className={isMenuOpen? 'list-wrapper active': 'list-wrapper'}>
                <ul>
                    <li className="navigation-link-items">
                        <Link href="/about">
                            <Typography variant="h4" component="a">
                            about us
                            </Typography>
                        </Link>                    
                    </li>
                    <li className="navigation-link-items">
                        <Link href="/our-team">
                            <Typography variant="h4" component="a">
                                our team
                            </Typography>
                        </Link>                        
                    </li>
                    <li className="navigation-link-items">
                        <Link href={`/search?q=${EUserRoles.INSTRUCTOR}`}>
                            <Typography variant="h4" component="a">
                                search
                            </Typography>
                            
                        </Link>                        
                    </li>
                    <li className="navigation-link-items">
                        <Link href="/log-in">
                            <Typography variant="h4" component="a">
                                log in
                            </Typography>
                        </Link>                        
                    </li>
                    <li className="navigation-link-items">
                        <Link href="/sign-up">
                            <Typography variant="h4" component="a">
                                sing up
                            </Typography>
                        </Link>                        
                    </li>
                    <li className="button-li">
                        <Link href="/sign-up">
                            <Button variant="contained"><p className="button-text">Donate</p></Button>
                        </Link>                        
                    </li>
                    <li className="button-li">
                        <Link href="/sign-up">
                            <Button variant="contained"><p className="button-text">Volunteer</p></Button>
                        </Link>                           
                    </li>
                    <li className="button-li">
                        <IconButton onClick={()=> {
                    setIsMenuOpen(!isMenuOpen)
                }}>
                            <CloseIcon style={{color: "white"}}/>
                        </IconButton>
                    </li>

                    
                </ul>
            </div>       
    

    </div>
    
    
    
    <style jsx>
        {`
        
        .list-wrapper {
            position:fixed;
            width:100%;
            height:100%;
            background: linear-gradient(184.54deg, #9D8DFE -42.58%, #5241BF 102.34%);
            overflow: hidden;
            display:flex;
            align-items: center;
            text-align:center;
            right:0;
            left:0;
            top:-100%;  
            transition: 850ms;
            z-index:2000;
        }
        .list-wrapper.active {
            top: 0;
            transition: 850ms;
            z-index:2000;

        }
        ul {
            margin:0 auto;
        }
        li {
            list-style-type:none;
            color:white;
            font-size: 30px;
            font-weight:bold;
            margin: 20% auto;
        }
        
        .button-text {
            margin: 0;
            color: #5242B0;
        }
        
        `}
    </style>
    </>
    );
}



export default MobileNavbar;
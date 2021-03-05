import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { useEffect, useState } from "react";
import Link from "next/link";
import { EUserRoles } from "../../utils/types";
import Button from '@material-ui/core/Button';


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

        {isMenuOpen?
            <div className="list-wrapper">
                <ul>
                    <li className="navigation-link-items">
                        <Link href="/about">
                            <a>about us</a>
                        </Link>                    
                    </li>
                    <li className="navigation-link-items">
                        <Link href="/our-team">
                            <a>our team</a>
                        </Link>                        
                    </li>
                    <li className="navigation-link-items">
                        <Link href={`/search?q=${EUserRoles.INSTRUCTOR}`}>
                            <a>search</a>
                        </Link>                        
                    </li>
                    <li className="navigation-link-items">
                        <Link href="/log-in">
                            <a>log in</a>
                        </Link>                        
                    </li>
                    <li className="navigation-link-items">
                        <Link href="/sign-up">
                            <a>sign up</a>
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
            </div>:null       
    }

    </div>
    
    
    
    <style jsx>
        {`
        
        .list-wrapper {
            position:fixed;
            right:0;
            left:0;
            top:0;
            width:100%;
            height:100%;
            background: linear-gradient(184.54deg, #9D8DFE -42.58%, #5241BF 102.34%);
            overflow: hidden;
            display:flex;
            align-items: center;
            text-align:center;


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
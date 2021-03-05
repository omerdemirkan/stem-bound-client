import Link from "next/link";
import { EUserRoles } from "../../utils/types";
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { useEffect, useState } from "react";
import DesktopNavbar from "./DestopNavbar";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MobileNavbar from "./MobileNavbar";


const Navbar = () => {




    const mobileSize = useMediaQuery('(max-width: 900px)');

    return (
        <>
         <nav>
            <div className="logo-container">
       
                <Link href="/">
                    <img className='logo' src="stem-logo.svg" alt="logo"/>
                </Link> 
                                                              
            </div>
            {!mobileSize? <DesktopNavbar />: <MobileNavbar/>}

            

        </nav>
        
                <style jsx>{`
               
                nav {
                    position: fixed;
                    top:0;
                    right:0;
                    left:0;
                    display: flex;
                    justify-content: space-between;
                    padding: 19px 5%;
                    background-color: white;
                
                } 
                

            `}</style>
        </>
    );
}

export default Navbar;
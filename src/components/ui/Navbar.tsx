import Link from "next/link";
import { EUserRoles } from "../../utils/types";
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { useEffect, useState } from "react";


const Navbar = () => {




    return (
        <>
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
                        <Link href="/our-team">
                            <a>our team</a>
                        </Link>
                        <Link href={`/search?q=${EUserRoles.INSTRUCTOR}`}>
                            <a>search</a>
                        </Link>
                        <Link href="/log-in">
                            <a>log in</a>
                        </Link>
                        <Link href="/sign-up">
                            <a>sign up</a>
                        </Link>
                        <Link href="/sign-up">
                            <Button variant="contained"><p className="button-text">Donate</p></Button>
                        </Link>
                        <Link href="/sign-up">
                            <Button variant="contained"><p className="button-text">Volunteer</p></Button>
                        </Link>         
                </div>

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
                a {
                    color: #5242B0;
                }
                div {
                    text-align: center;
                    align-items: center;
                    flex-wrap: wrap;
                }
                .logo-container {
                    max-width: 30%;
                    display:flex;
                    text-align: center;

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

            `}</style>
        </>
    );
}

export default Navbar;
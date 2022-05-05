import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.css"


export const NavBar = ({clearUser}) => {
    const location = useLocation()
    
    return (
        <nav>
            <div className="notTheLogout">
                <div className="logo">
                    <img id="logo" src="./images/PickUpAndPlay.png" alt="ultimate frisbee app logo" onClick={() => window.scrollTo({top: 0, left: 0, behavior: "smooth"})}/>
                </div>                
                <ul className="navList">
                    <li className="navListItem">
                        <Link className={`navLink ${location.pathname === "/" ? "active" : ""}`} to="/">Upcoming</Link>
                    </li>
                    <li className="navListItem">
                        <Link  className={`navLink ${location.pathname === "/myGames" ? "active" : ""}`} to="/myGames">My Games</Link>
                    </li>
                    <li className="navListItem">
                        <Link  className={`navLink ${location.pathname === "/pastGames" ? "active" : ""}`} to="/pastGames">History</Link>
                    </li>
                    <li className="navListItem">
                        <Link  className={`navLink ${location.pathname === "/myPastGames" ? "active" : ""}`} to="/myPastGames">My Past Games</Link>
                    </li>
                </ul>
            </div>
            <div className="logout">
                <ul className="navList">
                    <li className="navListItem">
                        <Link  className="navLink" to="/" onClick={() => clearUser()}>Logout</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
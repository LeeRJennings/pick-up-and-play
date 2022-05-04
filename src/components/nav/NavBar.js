import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"

export const NavBar = ({clearUser}) => {
    return (
        <nav>
            <div className="notTheLogout">
                <div className="logo">
                    <img id="logo" src="./images/PickUpAndPlay.png" alt="ultimate frisbee app logo" onClick={() => window.scrollTo({top: 0, left: 0, behavior: "smooth"})}/>
                </div>                
                <ul className="navList">
                    <li className="navListItem">
                        <Link className="navLink" id="activeView" to="/">Upcoming Games</Link>
                    </li>
                    <li className="navListItem">
                        <Link  className="navLink" to="/myGames">My Upcoming Games</Link>
                    </li>
                    <li className="navListItem">
                        <Link  className="navLink" to="/pastGames">Past Games</Link>
                    </li>
                    <li className="navListItem">
                        <Link  className="navLink" to="/myPastGames">My Past Games</Link>
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
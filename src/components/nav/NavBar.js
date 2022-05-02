import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"

export const NavBar = ({clearUser}) => {
    return (
        <nav>
            <div className="logo">
                <img src="./images/PickUpAndPlay.png" alt="ultimate frisbee app logo"/>
            </div>                
            <ul className="navListItems">
                <li>
                    <Link to="/">All Games</Link>
                </li>
                <li>
                    <Link to="/myGames">My Games</Link>
                </li>
                <div className="logout">
                    <li>
                        <Link to="/" onClick={() => clearUser()}>Logout</Link>
                    </li>
                </div>
            </ul>
        </nav>
    )
}
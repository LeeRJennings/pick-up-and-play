import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"

export const NavBar = ({clearUser}) => {
    return (
        <nav>
            <ul>
                <div className="nav-items">
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
                </div>
            </ul>
        </nav>
    )
}
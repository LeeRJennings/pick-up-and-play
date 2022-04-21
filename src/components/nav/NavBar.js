import React from "react";
import { Link } from "react-router-dom";

export const NavBar = ({clearUser}) => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">All Games</Link>
                </li>
                <li>
                    <Link to="/myGames">My Games</Link>
                </li>
                <li>
                    <Link to="/" onClick={() => clearUser()}>Logout</Link>
                </li>
            </ul>
        </nav>
    )
}
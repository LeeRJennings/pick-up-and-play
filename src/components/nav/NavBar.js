import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css"


export const NavBar = ({clearUser}) => {
    const navigate = useNavigate()

    const handleNavDropdown = (e) => {
        navigate(e.target.value)
        e.target.value = 0
    }

    return (
        <nav>
            <div className="notTheLogout">
                <div className="logo">
                    <img id="logo" src="/images/PickUpAndPlay.png" alt="ultimate frisbee app logo" onClick={() => window.scrollTo({top: 0, left: 0, behavior: "smooth"})}/>
                </div>
                <div className="navDropdowns">
                    <label>Upcoming:</label>
                    <select defaultValue="0" onChange={handleNavDropdown}>
                        <option disabled value="0">--</option>
                        <option value="/">All Games</option>
                        <option value="/myGames">My Games</option>
                    </select>
                </div>
                <div className="navDropdowns">
                    <label>Past:</label>
                    <select defaultValue="0" onChange={handleNavDropdown}>
                        <option disabled value="0">--</option>
                        <option value="/pastGames">All Games</option>
                        <option value="/myPastGames">My Games</option>
                    </select>
                </div>
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
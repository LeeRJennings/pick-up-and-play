import { dateFormatter } from "../../helpers/dateFormatter"
import { timeFormatter } from "../../helpers/timeFormatter"

export const GameCard = ({game, loggedInUser, handleDeleteGame}) => (
    <div className="card">
        <div className="cardContent">
            <h2>{game.parkName}</h2>
            <p className="gameAddress">
                {game.address}, {game.area.name} 
            </p>
            <p className="gameDetails">
                Hosted By: {game.user.name}
                <br/>
                Date: {dateFormatter(game.date)}
                <br/>
                Time: {timeFormatter(game.time)}
                <br/>
                Skill Level: {game.skillLevel.skillLevel}
                <br/>
                {game.additionalInfo === "" ? "" : `Additional Info: ${game.additionalInfo}`}
                <br/>
                {game.userId === loggedInUser.id ?
                    <button type="button" onClick={() => handleDeleteGame(game.id)}>Delete</button>
                    : ""
                }
            </p>
        </div>
    </div>
)
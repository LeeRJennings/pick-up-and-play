import { dateFormatter } from "../../helpers/dateFormatter"
import { timeFormatter } from "../../helpers/timeFormatter"

export const GameCard = ({game}) => (
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
                Addition Info: {game.additionalInfo}
            </p>
        </div>
    </div>
)
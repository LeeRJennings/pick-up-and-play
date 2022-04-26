import { useState } from "react"
import { Link } from "react-router-dom"
import { dateFormatter } from "../../helpers/dateFormatter"
import { timeFormatter } from "../../helpers/timeFormatter"
import { getLikesByGameId, addLike } from "../../modules/LikesManager"

export const GameCard = ({game, loggedInUser, handleDeleteGame, handleGameLike, isLoading}) => {
    const [numberOfLikes, setNumberOfLikes] = useState(0)

    const showLikes = (gameId) => {
        getLikesByGameId(gameId)
        .then(likes => {
            const howManyLikes = likes.length
            setNumberOfLikes(howManyLikes)
        })
        return (
            <>👍 x {numberOfLikes}</>
        )
    }
    
    return (
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
                    <button type="button" disabled={isLoading} onClick={() => handleGameLike(game.id)}>Like</button>
                    {showLikes(game.id)}
                    <br/>
                    {game.userId === loggedInUser.id ? 
                        <Link to={`/${game.id}/edit`}>
                            <button type="button">Edit</button>
                        </Link>
                        : ""
                    }
                    {game.userId === loggedInUser.id ?
                        <button type="button" onClick={() => handleDeleteGame(game.id)}>Delete</button>
                        : ""
                    }
                </p>
            </div>
        </div>
    )
}
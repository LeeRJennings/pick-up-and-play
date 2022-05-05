import { useState } from "react"
import { Link } from "react-router-dom"
import { dateFormatter } from "../../helpers/dateFormatter"
import { timeFormatter } from "../../helpers/timeFormatter"
import { getLikesByGameId } from "../../modules/LikesManager"
import "./GameViews.css"

export const GameCard = ({game, loggedInUser, handleDeleteGame, handleGameLike, isLoading, likes, handleDeleteLike}) => {
    const [numberOfLikes, setNumberOfLikes] = useState(0)

    const showLikes = (gameId) => {
        getLikesByGameId(gameId)
        .then(likes => {
            const howManyLikes = likes.length
            setNumberOfLikes(howManyLikes)
        })
        return (
            <>🥏 x {numberOfLikes}</>
        )
    }

    const likeExists = likes.find(like => like.gameId === game.id && like.userId === loggedInUser.id)
    
    return (
        <div className="card" id={`gameCard__${game.id}`}>
            <div className="cardContent">
                <h3>{game.parkName}</h3>
                <p className="gameAddress">
                    {game.address}, {game.area.name} 
                </p>
                <div className="gameDetails">
                    <b>Date:</b> {dateFormatter(game.date)}
                    <br/>
                    <b>Time:</b> {timeFormatter(game.time)}
                    <br/>
                    <b>Hosted By:</b> {game.user.name}
                    <br/>
                    <b>Skill Level:</b> {game.skillLevel.skillLevel}
                    <br/>
                    {!game.additionalInfo.cleatsRequired && !game.additionalInfo.whiteAndDarkShirt && !game.additionalInfo.barefootFriendly && !game.additionalInfo.dogsAllowed && 
                     !game.additionalInfo.playgroundNearby && !game.additionalInfo.bathroomsNearby && !game.additionalInfo.drinkingWaterNearby && !game.additionalInfo.allAges && !game.additionalInfo.eighteenPlus ?  "" 
                     : <><b>Additional Info:</b>
                        <ul>
                            {game.additionalInfo.cleatsRequired ?
                                <li>cleats required</li> : ""}
                            {game.additionalInfo.whiteAndDarkShirt ?
                                <li>white & dark shirt required</li> : ""}
                            {game.additionalInfo.barefootFriendly ?
                                <li>barefoot friendly</li> : ""}
                            {game.additionalInfo.dogsAllowed ?
                                <li>dogs allowed at park</li> : ""}
                            {game.additionalInfo.playgroundNearby ?
                                <li>playground nearby</li> : ""}
                            {game.additionalInfo.bathroomsNearby ?
                                <li>bathrooms nearby</li> : ""}
                            {game.additionalInfo.drinkingWaterNearby ?
                                <li>drinking water nearby</li> : ""}
                            {game.additionalInfo.allAges ?
                                <li>all ages welcome</li> : ""}
                            {game.additionalInfo.eighteenPlus ?
                                <li>18+</li> : ""}
                        </ul></>}
                </div>
                <div className="cardButtons">
                    <div className="likeButton">
                        {likeExists
                            ?   <><button type="button" disabled={isLoading} onClick={() => handleDeleteLike(likeExists.id)}>CAN'T PLAY</button>
                                {showLikes(game.id)}</> 
                            :   <><button type="button" disabled={isLoading} onClick={() => handleGameLike(game.id)}>PLAYING</button>
                                {showLikes(game.id)}</>}
                    </div>
                    <div className="editAndDeleteButtons">
                        {game.userId === loggedInUser.id ? 
                            <Link to={`/${game.id}/edit`}>
                                <button type="button">EDIT</button>
                            </Link>
                            : ""
                        }
                        {game.userId === loggedInUser.id ?
                            <button type="button" onClick={() => handleDeleteGame(game.id)}>DELETE</button>
                            : ""
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
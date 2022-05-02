import { useState } from "react"
import { Link } from "react-router-dom"
import { dateFormatter } from "../../helpers/dateFormatter"
import { timeFormatter } from "../../helpers/timeFormatter"
import { getLikesByGameId } from "../../modules/LikesManager"

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
                    Hosted By: {game.user.name}
                    <br/>
                    Date: {dateFormatter(game.date)}
                    <br/>
                    Time: {timeFormatter(game.time)}
                    <br/>
                    Skill Level: {game.skillLevel.skillLevel}
                    <br/>
                    {!game.additionalInfo.cleatsRequired && !game.additionalInfo.whiteAndDarkShirt && !game.additionalInfo.barefootFriendly && !game.additionalInfo.dogsAllowed && 
                     !game.additionalInfo.playgroundNearby && !game.additionalInfo.bathroomsNearby && !game.additionalInfo.drinkingWaterNearby && !game.additionalInfo.allAges && !game.additionalInfo.eighteenPlus ?  "" 
                     : <>Additional Info:
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
                    {likeExists
                        ?   <><button type="button" disabled={isLoading} onClick={() => handleDeleteLike(likeExists.id)}>I can't play</button>
                            {showLikes(game.id)}</> 
                        :   <><button type="button" disabled={isLoading} onClick={() => handleGameLike(game.id)}>I'm playing</button>
                            {showLikes(game.id)}</>}
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
                </div>
            </div>
        </div>
    )
}
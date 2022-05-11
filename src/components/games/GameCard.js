import { useState } from "react"
import { Link } from "react-router-dom"
import { dateFormatter } from "../../helpers/dateFormatter"
import { timeFormatter } from "../../helpers/timeFormatter"
import { getLikesByGameId } from "../../modules/LikesManager"
import { getStatsByGameIdAndUserId, deleteStats } from "../../modules/StatsManager"
import { upcomingDateFormatter } from "../../helpers/dateFormatter"
import "./GameViews.css"

export const GameCard = ({game, loggedInUser, handleDeleteGame, handleGameLike, isLoading, likes, handleDeleteLike, stats, getStats}) => {
    const todaysDate = upcomingDateFormatter(new Date())
    
    const [numberOfLikes, setNumberOfLikes] = useState(0)
    const [dialogVisible, setDialogVisible] = useState(false)
    const [gameStats, setGameStats] = useState({})
    
    const handleClickSeeStats = () => {
        getStatsByGameIdAndUserId(game.id, loggedInUser.id)
        .then(stats => {
            setGameStats(stats)
            setDialogVisible(true)
        })
    } 

    const handleDeleteStats = (statsId) => {
        deleteStats(statsId)
        .then(() => {
            getStats()
        })
        .then(setDialogVisible(false))
    }

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
    const statsExists = stats.find(stat => stat.gameId === game.id && stat.userId === loggedInUser.id)
    
    return (
        <>
        <dialog open={dialogVisible}>
            Stats for the game at <b>{game.parkName}</b> on <b>{dateFormatter(game.date)}</b>
            <br/>
            <br/>
            <b>Goals:</b> {gameStats[0]?.goals}
            <br/>
            <b>Assists:</b> {gameStats[0]?.assists}
            <br/>
            <b>Blocks:</b> {gameStats[0]?.blocks}
            <br/>
            <b>Turnovers:</b> {gameStats[0]?.turnovers}
            <div className="dialogButtons">
                <div className="dialogButtonLeft">
                    <Link to={`/${gameStats[0]?.id}/editStats`}>
                        <button type="button">EDIT</button>
                    </Link>
                    <button type="button" onClick={() => handleDeleteStats(gameStats[0]?.id)}>DELETE</button>
                </div>
                <div className="dialogButtonRight">
                    <button type="button" onClick={() => setDialogVisible(false)}>CLOSE</button>
                </div>
            </div>
        </dialog>

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
                     !game.additionalInfo.playgroundNearby && !game.additionalInfo.bathroomsNearby && !game.additionalInfo.drinkingWaterNearby && !game.additionalInfo.allAges && 
                     !game.additionalInfo.eighteenPlus ?  "" 
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
                    <div className="likeButton">
                        {likeExists && game.date <= todaysDate
                            ?   <>
                                {!statsExists ?   
                                    <Link to={`/${game.id}/stats`}>
                                        <button type="button">RECORD STATS</button>
                                    </Link>
                                    :   <button type="button" onClick={() => handleClickSeeStats()}>SEE STATS</button>}
                                </>
                            : ""}
                
                        {likeExists
                            ?   <><button type="button" disabled={isLoading} onClick={() => handleDeleteLike(likeExists.id)}>CAN'T PLAY</button>
                                {showLikes(game.id)}</> 
                            :   <><button type="button" disabled={isLoading} onClick={() => handleGameLike(game.id)}>PLAYING</button>
                                {showLikes(game.id)}</>}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
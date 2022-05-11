import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addStats } from "../modules/StatsManager";
import { getGameById } from "../modules/GameManager";
import { dateFormatter } from "../helpers/dateFormatter";

export const StatForm = () => {
    const loggedInUser = JSON.parse(sessionStorage.puap_user)
    const {gameId} = useParams()
    const navigate = useNavigate()

    const [stats, setStats] = useState({
        userId: loggedInUser.id,
        gameId: parseInt(gameId),
        goals: 0,
        assists: 0,
        blocks: 0,
        turnovers: 0
    })
    const [game, setGame] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const handleControlledInputChange = (evt) => {
        const newStats = {...stats}
        let selectedVal = evt.target.value
        newStats[evt.target.id] = selectedVal
        setStats(newStats)
    }

    const handleClickSaveStats = (e) => {
        e.preventDefault()
        if (stats.goals === "" && stats.assists === "" && stats.blocks === "" && stats.turnovers === "") {
            window.alert("Please fill in all fields")
        } else {
            setIsLoading(true)
            const newStats = {
                userId: stats.userId,
                gameId: stats.gameId,
                goals: parseInt(stats.goals),
                assists: parseInt(stats.assists),
                blocks: parseInt(stats.blocks),
                turnovers: parseInt(stats.turnovers)
            }
            addStats(newStats)
            .then(() => navigate(-1))
        }
    }

    useEffect(() => {
        getGameById(gameId)
        .then(game => {
            setGame(game)
        })
        setIsLoading(false)
    }, [])

    return (
        <>
        <form className="gameForm">
            <h2 className="gameForm__title">Record stats for the game at {game.parkName} on {dateFormatter(game.date)}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="goals"><b>Goals:</b> </label>
                    <input 
                        type="text" 
                        id="goals" 
                        onChange={handleControlledInputChange} 
                        required  
                        className="form-control" 
                        value={stats.goals} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="assists"><b>Assists:</b> </label>
                    <input 
                        type="text" 
                        id="assists" 
                        onChange={handleControlledInputChange} 
                        required  
                        className="form-control"  
                        value={stats.assists} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="blocks"><b>Blocks:</b> </label>
                    <input 
                        type="text" 
                        id="blocks" 
                        onChange={handleControlledInputChange} 
                        required  
                        className="form-control"  
                        value={stats.blocks} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="turnovers"><b>Turnovers:</b> </label>
                    <input 
                        type="text" 
                        id="turnovers" 
                        onChange={handleControlledInputChange} 
                        required  
                        className="form-control"  
                        value={stats.turnovers} />
                </div>
            </fieldset>
            <button className="gameFormButtons" type="button" disabled={isLoading} onClick={handleClickSaveStats}>SAVE STATS</button>
            <button className="gameFormButtons" type="button" onClick={() => navigate(-1)}>CANCEL</button>
        </form>
        </>
    )
}
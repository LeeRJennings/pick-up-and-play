import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateStats, getStatsById } from "../modules/StatsManager";
import { getGameById } from "../modules/GameManager";
import { dateFormatter } from "../helpers/dateFormatter";

export const EditStatForm = () => {
    const {statId} = useParams()
    const navigate = useNavigate()

    const [stats, setStats] = useState({})
    const [game, setGame] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [gameId, setGameId] = useState()

    const handleFieldChange = (e) => {
        const stateToChange = {...stats}
        stateToChange[e.target.id] = e.target.value
        setStats(stateToChange)
    }

    const handleClickSaveStats = (e) => {
        e.preventDefault()
        if (stats.goals === "" && stats.assists === "" && stats.blocks === "" && stats.turnovers === "") {
            window.alert("Please fill in all fields")
        } else {
            setIsLoading(true)
            const newStats = {
                id: stats.id,
                userId: stats.userId,
                gameId: stats.gameId,
                goals: parseInt(stats.goals),
                assists: parseInt(stats.assists),
                blocks: parseInt(stats.blocks),
                turnovers: parseInt(stats.turnovers)
            }
            updateStats(newStats)
            .then(() => navigate(-1))
        }
    }

    useEffect(() => {
        getStatsById(statId)
        .then(stats => {
            setStats(stats)
            setGameId(stats.gameId)
        })
        setIsLoading(false)
    }, [])

    useEffect(() => {
        getGameById(gameId)
        .then(game => {
            setGame(game)
        })
    }, [gameId])

    return (
        <>
        <form className="gameForm">
            <h2 className="gameForm__title">Edit stats for the game at {game?.parkName} on {dateFormatter(game?.date)}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="goals"><b>Goals:</b> </label>
                    <input 
                        type="text" 
                        id="goals" 
                        onChange={handleFieldChange} 
                        required  
                        className="form-control, statInput" 
                        value={stats.goals} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="assists"><b>Assists:</b> </label>
                    <input 
                        type="text" 
                        id="assists" 
                        onChange={handleFieldChange} 
                        required  
                        className="form-control, statInput"  
                        value={stats.assists} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="blocks"><b>Blocks:</b> </label>
                    <input 
                        type="text" 
                        id="blocks" 
                        onChange={handleFieldChange} 
                        required  
                        className="form-control, statInput"  
                        value={stats.blocks} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="turnovers"><b>Turnovers:</b> </label>
                    <input 
                        type="text" 
                        id="turnovers" 
                        onChange={handleFieldChange} 
                        required  
                        className="form-control, statInput"  
                        value={stats.turnovers} />
                </div>
            </fieldset>
            <button className="gameFormButtons" type="button" disabled={isLoading} onClick={handleClickSaveStats}>SAVE STATS</button>
            <button className="gameFormButtons" type="button" onClick={() => navigate(-1)}>CANCEL</button>
        </form>
        </>
    )
}
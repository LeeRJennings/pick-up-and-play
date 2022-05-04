import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { deleteGame, getAllPreviousGames, getPreviousGamesByAreaId, getPreviousGamesBySkillLevelId, getPreviousGamesByDate } from "../../modules/GameManager"
import { GameCard } from "./GameCard"
import { addLike, deleteLike, getAllLikes } from "../../modules/LikesManager"
import { getAllAreas } from "../../modules/AreasManager"
import { getAllSkillLevels } from "../../modules/SkillLevelManager"
import "./GameViews.css"

export const PastGames = () => {
    const loggedInUser = JSON.parse(sessionStorage.puap_user)

    const [games, setGames] = useState([])
    const [likes, setLikes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [areas, setAreas] = useState([])
    const [skillLevels, setSkillLevels] = useState([])

    const navigate = useNavigate()

    const getPreviousGames = () => {
        return getAllPreviousGames()
        .then(games => {
            setGames(games)
        })
    }

    const getLikes = () => {
        return getAllLikes()
        .then(likes => {
            setLikes(likes)
        })
    }

    const handleDeleteGame = (id) => {
        deleteGame(id)
        .then(getPreviousGames)
    }

    const handleGameLike = (gameId) => {
        const newLike = {
            userId: loggedInUser.id,
            gameId: gameId 
        }
        setIsLoading(true)
        addLike(newLike) 
        .then(res => {
            getLikes()
            setIsLoading(false)
        })  
    }

    const handleDeleteLike = (likeId) => {
        setIsLoading(true)
        deleteLike(likeId)
        .then(res => {
            getLikes()
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getPreviousGames()
        getLikes()
        setIsLoading(false)
    }, [])

    useEffect(() => {
        getAllAreas()
        .then(areas => {
            setAreas(areas)
        })
        getAllSkillLevels()
        .then(skillLevels => {
            setSkillLevels(skillLevels)
        })
    }, [])

    const handleAreaDropdown = (areaId) => {
        getPreviousGamesByAreaId(areaId.target.value)
        .then(games => {
            if (!games.length) {
                window.alert("Sorry, there are no previous games in this area.")
            } else {
                setGames(games)
            }
        })
    }

    const handleSkillLevelDropdown = (skillLevelId) => {
        getPreviousGamesBySkillLevelId(skillLevelId.target.value)
        .then(games => {
            if (!games.length) {
                window.alert("Sorry, there are no previous games at this skill level.")
            } else {
                setGames(games)
            }
        })
    }

    const handleDatePicker = (date) => {
        getPreviousGamesByDate(date.target.value)
        .then(games => {
            if (!games.length) {
                window.alert("Sorry, there are no previous games on this date.")
            } else {
                setGames(games)
            }
        })
    }

    return (
        <>
            <button id="addGameButton" type="button" onClick={() => {navigate("/create")}}>Add Game</button>
            <br/>
            <div className="filterArea">
                <label id="filterBy">Filter by</label>
                <div className="filterItem">
                    <label htmlFor="areasDropdown">Area: </label>
                    <select  
                        defaultValue="0"
                        name="areasDropdown"  
                        onChange={handleAreaDropdown}
                        className="form-control">
                            <option disabled hidden value="0">
                                Select an Area
                            </option>
                            {areas.map(area => (
                                <option key={area.id} value={area.id}>
                                    {area.name}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="filterItem">
                    <label htmlFor="skillLevelsDropdown">Skill Level: </label>
                    <select  
                        defaultValue="0"
                        name="skillLevelsDropdown"  
                        onChange={handleSkillLevelDropdown}
                        className="form-control">
                            <option disabled hidden value="0">
                                Select a Skill Level
                            </option>
                            {skillLevels.map(skillLevel => (
                                <option key={skillLevel.id} value={skillLevel.id}>
                                    {skillLevel.skillLevel}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="filterItem">
                    <label htmlFor="date">Date: </label>
                    <input 
                        type="date"
                        name="date" 
                        onChange={handleDatePicker} 
                        className="form-control" 
                    />
                </div>
                <div className="filterItem">
                    <button type="button" onClick={() => getPreviousGames()}>See All Games</button>
                </div>
            </div>
            <div className="gameCards">
                {games.map(game => 
                    <GameCard
                        key={game.id}
                        game={game}
                        loggedInUser={loggedInUser}
                        handleDeleteGame={handleDeleteGame}
                        handleGameLike={handleGameLike}
                        isLoading={isLoading}
                        likes={likes}
                        handleDeleteLike={handleDeleteLike} />)}
            </div>
        </>
    )
}
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { getAllGames, deleteGame, getGamesByAreaId, getGamesBySkillLevelId, getGamesByDate } from "../../modules/GameManager"
import { GameCard } from "./GameCard"
import { addLike, deleteLike, getAllLikes } from "../../modules/LikesManager"
import { getAllAreas } from "../../modules/AreasManager"
import { getAllSkillLevels } from "../../modules/SkillLevelManager"

export const AllGames = () => {
    const loggedInUser = JSON.parse(sessionStorage.puap_user)

    const [games, setGames] = useState([])
    const [likes, setLikes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [areas, setAreas] = useState([])
    const [skillLevels, setSkillLevels] = useState([])

    const navigate = useNavigate()

    const getGames = () => {
        return getAllGames()
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
        .then(getGames())
    }

    const handleGameLike = (gameId) => {
        const newLike = {
            userId: loggedInUser.id,
            gameId: gameId 
        }
        // TODO look at nutshell for making past events go to the bottom
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
        getGames()
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
        getGamesByAreaId(areaId.target.value)
        .then(games => {
            if (!games.length) {
                window.alert("There are no games in this area right now")
            } else {
                setGames(games)
            }
        })
    }

    const handleSkillLevelDropdown = (skillLevelId) => {
        getGamesBySkillLevelId(skillLevelId.target.value)
        .then(games => {
            if (!games.length) {
                window.alert("There are no games at this skill level right now")
            } else {
                setGames(games)
            }
        })
    }

    const handleDatePicker = (date) => {
        getGamesByDate(date.target.value)
        .then(games => {
            if (!games.length) {
                window.alert("There are no games on this date right now")
            } else {
                setGames(games)
            }
        })
    }

    return (
        <>
            <button type="button" onClick={() => {navigate("/create")}}>Add Game</button>
            <br/>
            <label htmlFor="areasDropdown">Filter by Area: </label>
            <select  
                defaultValue="0"
                name="areasDropdown" 
                id="areaId" 
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
            <label htmlFor="skillLevelsDropdown">Filter by Skill Level: </label>
            <select  
                defaultValue="0"
                name="skillLevelsDropdown" 
                id="skillLevelId" 
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
            <label htmlFor="date">Filter by Date: </label>
                    <input 
                        type="date" 
                        id="date"
                        name="date" 
                        onChange={handleDatePicker} 
                        className="form-control" />
            <button type="button" onClick={() => getGames()}>See All Games</button>
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
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { getAllGames, deleteGame, getGamesByAreaId } from "../../modules/GameManager"
import { GameCard } from "./GameCard"
import { addLike, deleteLike, getAllLikes } from "../../modules/LikesManager"
import { getAllAreas } from "../../modules/AreasManager"

export const AllGames = () => {
    const loggedInUser = JSON.parse(sessionStorage.puap_user)

    const [games, setGames] = useState([])
    const [likes, setLikes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [areas, setAreas] = useState([])

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
    }, [])

    const doNothing = () => {
        return undefined
    }

    const handleAreaDropdown = (areaId) => {
        getGamesByAreaId(areaId)
        .then(games => {
            setGames(games)
        })
    }

    return (
        <>
            <button type="button" onClick={() => {navigate("/create")}}>Add Game</button>
            <label htmlFor="areasDropdown">Filter by Area: </label>
            <select  
                defaultValue="0"
                name="areasDropdown" 
                id="areaId" 
                onChange={() => handleAreaDropdown(area.id)}
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
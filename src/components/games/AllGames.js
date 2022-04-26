import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { getAllGames, deleteGame } from "../../modules/GameManager"
import { GameCard } from "./GameCard"
import { addLike, getAllLikes } from "../../modules/LikesManager"

export const AllGames = () => {
    const loggedInUser = JSON.parse(sessionStorage.puap_user)

    const [games, setGames] = useState([])
    const [likes, setLikes] = useState([])
    const [isLoading, setIsLoading] = useState(true)

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
        .then(setIsLoading(false))
    }

    const handleDeleteGame = (id) => {
        deleteGame(id)
        .then(getGames())
    }

    const doNothing = () => {
        return undefined
    }

    const handleGameLike = (gameId) => {
        const newLike = {
            userId: loggedInUser.id,
            gameId: gameId 
        }
        const likeExists = likes.find(like => like.gameId === newLike.gameId && like.userId === newLike.userId)
        if (likeExists) {
            return undefined
        } else { 
            addLike(newLike) 
            setIsLoading(true)
            getLikes()
        }
        
    }

    useEffect(() => {
        getGames()
        getLikes()
    }, [])

    return (
        <>
            <button type="button" onClick={() => {navigate("/create")}}>Add Game</button>
            <div className="gameCards">
                {games.map(game => 
                    <GameCard
                        key={game.id}
                        game={game}
                        loggedInUser={loggedInUser}
                        handleDeleteGame={handleDeleteGame}
                        handleGameLike={handleGameLike}
                        isLoading={isLoading} />)}
            </div>
        </>
    )
}
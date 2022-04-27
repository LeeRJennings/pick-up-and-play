import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { getAllGames, deleteGame } from "../../modules/GameManager"
import { GameCard } from "./GameCard"
import { addLike, deleteLike, getAllLikes } from "../../modules/LikesManager"

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
                        isLoading={isLoading}
                        likes={likes}
                        handleDeleteLike={handleDeleteLike} />)}
            </div>
        </>
    )
}
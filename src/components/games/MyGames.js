import { useState, useEffect } from "react"
import { getGamesByUserId, deleteGame } from "../../modules/GameManager"
import { GameCard } from "./GameCard"
import { useNavigate } from "react-router-dom"
import { getAllLikes, addLike, deleteLike, getLikesByUserId } from "../../modules/LikesManager"

export const MyGames = () => {
    const loggedInUser = JSON.parse(sessionStorage.puap_user)

    const [games, setGames] = useState([])
    const [likes, setLikes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [myLikes, setMyLikes] = ([])

    const navigate = useNavigate()

    const getGames = () => {
        return getGamesByUserId(loggedInUser.id)
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

    const getMyLikes = () => {
        return getLikesByUserId(loggedInUser.id)
        .then(myLikes => {
            setMyLikes(myLikes)
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
        getMyLikes()
        setIsLoading(false)
    }, [])

    return (
        <>
            <button type="button" onClick={() => {navigate("/create")}}>Add Game</button>
            <h2>Created Games</h2>
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
            <h2>Liked Games</h2>
        </>
    )
}
import { useState, useEffect } from "react"
import { getGamesByUserId, deleteGame, getAllGames, getGamesByUserIdAndAreaId } from "../../modules/GameManager"
import { GameCard } from "./GameCard"
import { useNavigate } from "react-router-dom"
import { getAllLikes, addLike, deleteLike, getLikesByUserId } from "../../modules/LikesManager"
import "./GameViews.css"

export const MyGames = () => {
    const loggedInUser = JSON.parse(sessionStorage.puap_user)

    const [games, setGames] = useState([])
    const [likes, setLikes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [myLikedGames, setMyLikedGames] = useState([])
    const [userId, setUserId] = useState(loggedInUser.id)

    const navigate = useNavigate()

    const getGames = () => {
        return getGamesByUserId(userId)
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
        setIsLoading(true)
        addLike(newLike) 
        .then(res => {
            getLikes()
            setIsLoading(false)
        })
        
    }

    const getArrayToSetMyLikedGames = () => {
        let usersLikedGames = []
        getAllGames()
        .then(everyGame => {
            getLikesByUserId(userId)
            .then(usersLikes => {
                for (const like of usersLikes) {
                  usersLikedGames.push(everyGame.find(game => game.id === like.gameId))
                }
                const likedGamesWithoutCreatedOnes = usersLikedGames.filter(game => game.userId !== userId)
                setMyLikedGames(likedGamesWithoutCreatedOnes)
            })
        })
    }

    const handleDeleteLike = (likeId) => {
        setIsLoading(true)
        deleteLike(likeId)
        .then(res => {
            getLikes()
            getArrayToSetMyLikedGames()
            setIsLoading(false)
        })    
    }

    useEffect(() => {
        getGames()
        getLikes()
        getArrayToSetMyLikedGames()
        setIsLoading(false)
    }, [])

    return (
        <>
            <button type="button" onClick={() => {navigate("/create")}}>Add Game</button>
            <br/>
            {/* <label htmlFor="areasDropdown">Filter by Area: </label>
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
            </select> */}
            {games.length ?
                <><h2>Created Games</h2>
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
                </div></>
                : <>Whoops ...... You haven't created any games yet</>}
            {myLikedGames.length ? 
                <><h2>Liked Games</h2>
                <div className="gameCards">
                {myLikedGames.map(game => 
                    <GameCard
                        key={game.id}
                        game={game}
                        loggedInUser={loggedInUser}
                        handleDeleteGame={handleDeleteGame}
                        handleGameLike={handleGameLike}
                        isLoading={isLoading}
                        likes={likes}
                        handleDeleteLike={handleDeleteLike} />)}
                </div></>
            : ""}
        </>
    )
}
import { useState, useEffect } from "react"
import { getGamesByUserId, deleteGame, getAllGames } from "../../modules/GameManager"
import { GameCard } from "./GameCard"
import { useNavigate } from "react-router-dom"
import { getAllLikes, addLike, deleteLike, getLikesByUserId } from "../../modules/LikesManager"
import { getAllUsers } from "../../modules/UsersManager"
import "./GameViews.css"

export const MyGames = () => {
    const loggedInUser = JSON.parse(sessionStorage.puap_user)

    const [games, setGames] = useState([])
    const [likes, setLikes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [myLikedGames, setMyLikedGames] = useState([])
    const [userId, setUserId] = useState(loggedInUser.id)
    const [users, setUsers] = useState([])

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
        getAllUsers()
        .then(users => {
            setUsers(users)
        })
        setIsLoading(false)
    }, [userId])

    const handleUserDropdown = (userId) => {
        setUserId(userId.target.value)
    } 

    return (
        <>
            <button type="button" onClick={() => {navigate("/create")}}>Add Game</button>
            <br/>
            <label htmlFor="usersDropdown">See someone else's games: </label>
            <select  
                defaultValue="0"
                name="usersDropdown" 
                onChange={handleUserDropdown}
                className="form-control">
                    <option disabled hidden value="0">
                        Select a User
                    </option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
            </select>
            {games.length ?
                <><h2 className="myGamesHeader">Created Games</h2>
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
                : userId === loggedInUser.id ? 
                    <><br/><br/>Whoops ...... You haven't created any games yet.</>
                    : <><br/><br/>Whoops ...... This user haven't created any games yet.</>}
            {myLikedGames.length ? 
                <><h2 className="myGamesHeader">Liked Games</h2>
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
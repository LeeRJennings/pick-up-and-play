import { useState, useEffect } from "react"
import { getGamesByUserId, deleteGame } from "../../modules/GameManager"
import { GameCard } from "./GameCard"

export const MyGames = () => {
    const loggedInUser = JSON.parse(sessionStorage.puap_user)

    const [games, setGames] = useState([])

    useEffect(() => {
        getGamesByUserId(loggedInUser.id)
        .then(games => {
            setGames(games)
        })
    }, [])

    const handleDeleteGame = (id) => {
        deleteGame(id)
        .then(() => getGamesByUserId(loggedInUser.id).then((res) => setGames(res)))
    }

    return (
        <>
            <div className="gameCards">
                {games.map(game => 
                    <GameCard
                        key={game.id}
                        game={game}
                        loggedInUser={loggedInUser}
                        handleDeleteGame={handleDeleteGame} />)}
            </div>
        </>
    )
}
import { useState, useEffect } from "react"
import { getGamesByUserId } from "../../modules/GameManager"
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

    return (
        <>
            <div className="gameCards">
                {games.map(game => 
                    <GameCard
                        key={game.id}
                        game={game} />)}
            </div>
        </>
    )
}
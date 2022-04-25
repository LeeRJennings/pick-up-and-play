import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { getAllGames } from "../../modules/GameManager"
import { GameCard } from "./GameCard"

export const AllGames = () => {
    const [games, setGames] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        getAllGames()
        .then(games => {
            setGames(games)
        })
    }, [])

    return (
        <>
            <button type="button" onClick={() => {navigate("/create")}}>Add Game</button>
            <div className="gameCards">
                {games.map(game => 
                    <GameCard
                        key={game.id}
                        game={game} />)}
            </div>
        </>
    )
}
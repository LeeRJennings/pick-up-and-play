import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { getAllGames, deleteGame } from "../../modules/GameManager"
import { GameCard } from "./GameCard"

export const AllGames = () => {
    const loggedInUser = JSON.parse(sessionStorage.puap_user)

    const [games, setGames] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        getAllGames()
        .then(games => {
            setGames(games)
        })
    }, [])

    const handleDeleteGame = (id) => {
        deleteGame(id)
        .then(() => getAllGames().then((res) => setGames(res)))
    }

    return (
        <>
            <button type="button" onClick={() => {navigate("/create")}}>Add Game</button>
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
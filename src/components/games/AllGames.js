import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { getAllGames } from "../../modules/GameManager"

export const AllGames = () => {

    const navigate = useNavigate()

    return (
        <>
            <button type="button" onClick={() => {navigate("/create")}}>Add Game</button>
            <p>This is where I'd put the pick-up games, IF I HAD ANY</p>
        </>
    )
}
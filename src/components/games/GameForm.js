import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { addGame } from "../../modules/GameManager"

export const GameForm =() => {
    const loggedInUser = JSON.parse(sessionStorage.puap_user)

    const [game, setGame] = useState({
        userId: loggedInUser.id,
        parkName: "",
        address: "",
        city: "",
        stateId: 0,
        date: "",
        time: "",
        skillLevelId: 0,
        additionalInfo: {
            
        },
    })


    
    
    return (
        <>
            <p>This is where I'd put a new game form, IF I HAD ONE</p>
        </>
    )
}
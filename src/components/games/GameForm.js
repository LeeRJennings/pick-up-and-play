import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { addGame } from "../../modules/GameManager"
import { getAllSkillLevels } from "../../modules/SkillLevelManager"
import { getAllStates } from "../../modules/StatesManager"


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
        additionalInfo: []
    })
    const [skillLevels, setSkillLevels] = useState([])
    const [states, setStates] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate()

    const handleControlledInputChange = (evt) => {
        const newGame = {...game}
        let selectedVal = evt.target.value
        if (evt.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }
        newGame[evt.target.id] = selectedVal
        setGame(newGame)
    }

    useEffect(() => {
        getAllSkillLevels()
        .then(skillLevels => {
            setSkillLevels(skillLevels)
        })
        getAllStates()
        .then(states => {
            setStates(states)
        })
        setIsLoading(false)
    }, [])

    const handleClickAddGame = (e) => {
        e.preventDefault()
        if (game.parkName === "" || game.address === "" || game.city === "" || game.stateId === 0 || game.date === "" || game.time === "" || game.skillLevelId === 0) {
            window.alert('All fields except "Additional Info" are required')
        } else {
            setIsLoading(true)
            addGame(game)
            .then(() => navigate("/"))
        }
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Add a New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="parkName">Park Name: </label>
                    <input 
                        type="text" 
                        id="parkName" 
                        onChange={handleControlledInputChange} 
                        required autoFocus 
                        className="form-control" 
                        placeholder="Break Side Park" 
                        value={game.parkName} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Address: </label>
                    <input 
                        type="text" 
                        id="address" 
                        onChange={handleControlledInputChange} 
                        required autoFocus 
                        className="form-control" 
                        placeholder="123 Big Huck Ave" 
                        value={game.address} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="city">City: </label>
                    <input 
                        type="text" 
                        id="city" 
                        onChange={handleControlledInputChange} 
                        required autoFocus 
                        className="form-control" 
                        placeholder="Layoutville" 
                        value={game.city} />
                </div>
            </fieldset>
            <fieldset>
				<div className="form-group">
					<label htmlFor="state">State: </label>
					<select 
                        value={game.stateId} 
                        name="stateId" 
                        id="stateId" 
                        onChange={handleControlledInputChange} 
                        required autoFocus 
                        className="form-control" >
						<option hidden disabled value="0">Select a state</option>
						{states.map(state => (
							<option key={state.id} value={state.id}>
								{state.name}
							</option>
						))}
					</select>
				</div>
			</fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input 
                        type="date" 
                        id="date" 
                        onChange={handleControlledInputChange} 
                        required autoFocus 
                        className="form-control"  
                        value={game.date} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input 
                        type="time" 
                        id="time" 
                        onChange={handleControlledInputChange} 
                        required autoFocus
                        className="form-control"  
                        value={game.time} />
                    <small>all times are in Central Time</small>
                </div>
            </fieldset>
            <fieldset>
				<div className="form-group">
					<label htmlFor="skillLevelId">Skill Level: </label>
					<select 
                        value={game.skillLevelId} 
                        name="skillLevelId" 
                        id="skillLevelId" 
                        onChange={handleControlledInputChange} 
                        required autoFocus 
                        className="form-control" >
						<option hidden disabled value="0">Select a Skill Level</option>
						{skillLevels.map(sl => (
							<option key={sl.id} value={sl.id}>
								{sl.skillLevel}
							</option>
						))}
					</select>
				</div>
			</fieldset>
        </form>
    )
}

// userId: loggedInUser.id,
//         parkName: "",
//         address: "",
//         city: "",
//         stateId: 0,
//         date: "",
//         time: "",
//         skillLevelId: 0,
//         additionalInfo: []
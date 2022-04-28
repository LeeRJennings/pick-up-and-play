import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { addGame } from "../../modules/GameManager"
import { getAllSkillLevels } from "../../modules/SkillLevelManager"
import { getAllAreas } from "../../modules/AreasManager"
import "./GameForm.css"


export const GameForm =() => {
    const loggedInUser = JSON.parse(sessionStorage.puap_user)
    const infoArray = []

    const [game, setGame] = useState({
        userId: loggedInUser.id,
        areaId: 0,
        parkName: "",
        address: "",
        date: "",
        time: "",
        skillLevelId: 0,
        additionalInfo: ""
    })
    const [skillLevels, setSkillLevels] = useState([])
    const [areas, setAreas] = useState([])
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
        getAllAreas()
        .then(areas => {
            setAreas(areas)
        })
        setIsLoading(false)
    }, [])

    const handleClickCreateGame = (e) => {
        e.preventDefault()
        if (game.parkName === "" || game.address === "" || game.city === "" || game.areaId === 0 
            || game.zipCode === "" || game.date === "" || game.time === "" || game.skillLevelId === 0) {
            window.alert('All fields except "Additional Info" are required')
        } else {
            game.additionalInfo = infoArray.join(", ")
            setIsLoading(true)
            addGame(game)
            .then(() => navigate("/"))
        }
    }

    const handleCheckboxes = (e) => {
        let val = e.target.value
        if (infoArray.includes(val)) {
            let valIndex = infoArray.indexOf(val)
            infoArray.splice(valIndex, 1)
        } else {
            infoArray.push(val)
        }    
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Add a New Game</h2>
            <fieldset>
				<div className="form-group">
					<label htmlFor="areaId">Area: </label>
					<select 
                        value={game.areaId} 
                        name="areaId" 
                        id="areaId" 
                        onChange={handleControlledInputChange} 
                        required autoFocus 
                        className="form-control">
						<option hidden disabled value="0">Select an Area</option>
						{areas.map(area => (
							<option key={area.id} value={area.id}>
								{area.name}
							</option>
						))}
					</select>
				</div>
			</fieldset>
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
                    <small>  all times are in Central Time</small>
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
            <fieldset>
                <div className="form-group checkboxes">
                    <label>Additional Info:</label>
                    <div>
                        <input type="checkbox" value="cleats required" onChange={handleCheckboxes}/>
                        <label>cleats required</label>
                    </div>
                    <div>
                        <input type="checkbox" value="white & dark shirt required" onChange={handleCheckboxes}/>
                        <label>white & dark shirt required</label>
                    </div>
                    <div>
                        <input type="checkbox" value="barefoot friendly" onChange={handleCheckboxes}/>
                        <label>barefoot friendly</label>
                    </div>
                    <div>
                        <input type="checkbox" value="dogs allowed at park" onChange={handleCheckboxes}/>
                        <label>dogs allowed at park</label>
                    </div>
                    <div>
                        <input type="checkbox" value="playground nearby" onChange={handleCheckboxes}/>
                        <label>playground nearby</label>
                    </div>
                    <div>
                        <input type="checkbox" value="bathrooms nearby" onChange={handleCheckboxes}/>
                        <label>bathrooms nearby</label>
                    </div>
                    <div>
                        <input type="checkbox" value="drinking water nearby" onChange={handleCheckboxes}/>
                        <label>drinking water nearby</label>
                    </div>
                    <div>
                        <input type="checkbox" value="all ages welcome" onChange={handleCheckboxes}/>
                        <label>all ages welcome</label>
                    </div>
                    <div>
                        <input type="checkbox" value="18+" onChange={handleCheckboxes}/>
                        <label>18+</label>
                    </div>
                </div>
            </fieldset>
            <button type="button" disabled={isLoading} onClick={handleClickCreateGame}>Create Game</button>
            <button type="button" onClick={() => navigate("/")}>
                Cancel
            </button>
        </form>
    )
}
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateGame, getGameById } from "../../modules/GameManager";
import { getAllSkillLevels } from "../../modules/SkillLevelManager";
import { getAllAreas } from "../../modules/AreasManager";

export const EditGameForm = () => {
    const loggedInUser = JSON.parse(sessionStorage.puap_user)

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
    const [isChecked, setIsChecked] = useState(true)

    const {gameId} = useParams()
    const navigate = useNavigate()

    const handleFieldChange = (e) => {
        const stateToChange = {...game}
        stateToChange[e.target.id] = e.target.value
        setGame(stateToChange)
    }

    const updateExistingGame = (e) => {
        e.preventDefault()
        setIsLoading(true)
        const editedGame = {
            userId: game.userId,
            areaId: game.areaId,
            parkName: game.parkName,
            address: game.address,
            date: game.date,
            time: game.time,
            skillLevelId: game.skillLevelId,
            additionalInfo: game.additionalInfo,
            id: game.id
        }
        updateGame(editedGame)
        .then(() => navigate("/"))
    }

    useEffect(() => {
        getGameById(gameId)
        .then(game => {
            setGame(game)
        })
        setIsLoading(false)
    }, [gameId])

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

    const infoArray = game.additionalInfo.split(",")
    console.log(infoArray)
    const handleCheckboxes = (e) => {
        let val = e.target.value
        if (infoArray.includes(val)) {
            let valIndex = infoArray.indexOf(val)
            infoArray.splice(valIndex, 1)
            game.additionalInfo = infoArray.join(", ")
        } else {
            infoArray.push(val)
            game.additionalInfo = infoArray.join(", ")
        }
        // console.log(infoArray) 
    }
    
    const handleDefaultCheck = (e) => {
        let val = e.target.value
        if (infoArray.includes(val)) {
            return true
        } else {
            return false
        }
    }

    // if additionalInfo.includes(checkboxValue) {
    //     make the checkbox checked on page render
    // }

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
                        onChange={handleFieldChange} 
                        required autoFocus 
                        className="form-control" >
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
                        onChange={handleFieldChange} 
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
                        onChange={handleFieldChange} 
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
                        onChange={handleFieldChange} 
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
                        onChange={handleFieldChange} 
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
                        onChange={handleFieldChange} 
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
                        <input type="checkbox" value="cleats required" onChange={handleCheckboxes} defaultChecked={isChecked}/>
                        <label>cleats required</label>
                    </div>
                    <div>
                        <input type="checkbox" value="white & dark shirt required" onChange={handleCheckboxes} defaultChecked={handleDefaultCheck}/>
                        <label>white & dark shirt required</label>
                    </div>
                    <div>
                        <input type="checkbox" value="barefoot friendly" onChange={handleCheckboxes} defaultChecked={handleDefaultCheck}/>
                        <label>barefoot friendly</label>
                    </div>
                    <div>
                        <input type="checkbox" value="dogs allowed at park" onChange={handleCheckboxes} defaultChecked={isChecked}/>
                        <label>dogs allowed at park</label>
                    </div>
                    <div>
                        <input type="checkbox" value="playground nearby" onChange={handleCheckboxes} defaultChecked={isChecked}/>
                        <label>playground nearby</label>
                    </div>
                    <div>
                        <input type="checkbox" value="bathrooms nearby" onChange={handleCheckboxes} defaultChecked={isChecked}/>
                        <label>bathrooms nearby</label>
                    </div>
                    <div>
                        <input type="checkbox" value="drinking water nearby" onChange={handleCheckboxes} defaultChecked={isChecked}/>
                        <label>drinking water nearby</label>
                    </div>
                    <div>
                        <input type="checkbox" value="all ages welcome" onChange={handleCheckboxes} defaultChecked={isChecked}/>
                        <label>all ages welcome</label>
                    </div>
                    <div>
                        <input type="checkbox" value="18+" onChange={handleCheckboxes} defaultChecked={isChecked}/>
                        <label>18+</label>
                    </div>
                </div>
            </fieldset>
            <button type="button" disabled={isLoading} onClick={updateExistingGame}>Save Edits</button>
            <button type="button" onClick={() => navigate("/")}>Cancel</button>
        </form>
    )
}

// {infoArray.includes("barefoot friendly") ? true : false}
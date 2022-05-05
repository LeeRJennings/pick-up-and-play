import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { addGame } from "../../modules/GameManager"
import { getAllSkillLevels } from "../../modules/SkillLevelManager"
import { getAllAreas } from "../../modules/AreasManager"
import "./GameForm.css"


export const GameForm =() => {
    const loggedInUser = JSON.parse(sessionStorage.puap_user)

    const [game, setGame] = useState({
        userId: loggedInUser.id,
        areaId: 0,
        parkName: "",
        address: "",
        date: "",
        time: "",
        skillLevelId: 0,
        additionalInfo: {}
    })
    const [info, setInfo] = useState({
        cleatsRequired: false,
        whiteAndDarkShirt: false,
        barefootFriendly: false,
        dogsAllowed: false,
        playgroundNearby: false,
        bathroomsNearby: false,
        drinkingWaterNearby: false,
        allAges: false,
        eighteenPlus: false
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
            game.additionalInfo = info
            setIsLoading(true)
            addGame(game)
            .then(() => navigate("/"))
        }
    }

    const handleCheckboxes = (e) => {
        const newInfo = {...info}
        newInfo[e.target.id] = !newInfo[e.target.id]
        setInfo(newInfo)
    }

    return (
        <>
            <form className="gameForm">
                <h2 className="gameForm__title">Add a New Game</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="areaId"><b>Area:</b> </label>
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
                        <label htmlFor="parkName"><b>Park Name:</b> </label>
                        <input 
                            type="text" 
                            id="parkName" 
                            onChange={handleControlledInputChange} 
                            required  
                            className="form-control" 
                            placeholder="Break Side Park" 
                            value={game.parkName} />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="address"><b>Address:</b> </label>
                        <input 
                            type="text" 
                            id="address" 
                            onChange={handleControlledInputChange} 
                            required 
                            className="form-control" 
                            placeholder="123 Big Huck Ave" 
                            value={game.address} />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="date"><b>Date:</b> </label>
                        <input 
                            type="date" 
                            id="date" 
                            onChange={handleControlledInputChange} 
                            required 
                            className="form-control"  
                            value={game.date} />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="time"><b>Time:</b> </label>
                        <input 
                            type="time" 
                            id="time" 
                            onChange={handleControlledInputChange} 
                            required 
                            className="form-control"  
                            value={game.time} />
                        <small>  all times are in Central Time</small>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="skillLevelId"><b>Skill Level:</b> </label>
                        <select 
                            value={game.skillLevelId} 
                            name="skillLevelId" 
                            id="skillLevelId" 
                            onChange={handleControlledInputChange} 
                            required  
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
                        <label><b>Additional Info:</b></label>
                        <div>
                            <input 
                                type="checkbox" 
                                name="cleatsRequired" 
                                id="cleatsRequired"
                                checked={info.cleatsRequired} 
                                value={info.cleatsRequired} 
                                onChange={handleCheckboxes}/>
                            <label htmlFor="cleatsRequired">cleats required</label>
                        </div>
                        <div>
                            <input 
                                type="checkbox" 
                                name="whiteAndDarkShirt"
                                id="whiteAndDarkShirt"
                                checked={info.whiteAndDarkShirt} 
                                value={info.whiteAndDarkShirt}
                                onChange={handleCheckboxes}/>
                            <label htmlFor="whiteAndDarkShirt">white & dark shirt required</label>
                        </div>
                        <div>
                            <input 
                                type="checkbox" 
                                name="barefootFriendly"
                                id="barefootFriendly"
                                checked={info.barefootFriendly}
                                value={info.barefootFriendly} 
                                onChange={handleCheckboxes}/>
                            <label htmlFor="barefootFriendly">barefoot friendly</label>
                        </div>
                        <div>
                            <input 
                                type="checkbox"
                                name="dogsAllowed"
                                id="dogsAllowed"
                                checked={info.dogsAllowed}
                                value={info.dogsAllowed} 
                                onChange={handleCheckboxes}/>
                            <label htmlFor="dogsAllowed">dogs allowed at park</label>
                        </div>
                        <div>
                            <input 
                                type="checkbox"
                                name="playgroundNearby"
                                id="playgroundNearby"
                                checked={info.playgroundNearby} 
                                value={info.playgroundNearby} 
                                onChange={handleCheckboxes}/>
                            <label htmlFor="playgroundNearby">playground nearby</label>
                        </div>
                        <div>
                            <input 
                                type="checkbox"
                                name="bathroomsNearby"
                                id="bathroomsNearby"
                                checked={info.bathroomsNearby} 
                                value={info.bathroomsNearby} 
                                onChange={handleCheckboxes}/>
                            <label htmlFor="bathroomsNearby">bathrooms nearby</label>
                        </div>
                        <div>
                            <input 
                                type="checkbox"
                                name="drinkingWaterNearby"
                                id="drinkingWaterNearby"
                                checked={info.drinkingWaterNearby} 
                                value={info.drinkingWaterNearby} 
                                onChange={handleCheckboxes}/>
                            <label htmlFor="drinkingWaterNearby">drinking water nearby</label>
                        </div>
                        <div>
                            <input 
                                type="checkbox"
                                name="allAges"
                                id="allAges"
                                checked={info.allAges} 
                                value={info.allAges}
                                onChange={handleCheckboxes}/>
                            <label htmlFor="allAges">all ages welcome</label>
                        </div>
                        <div>
                            <input 
                                type="checkbox"
                                name="eighteenPlus"
                                id="eighteenPlus"
                                checked={info.eighteenPlus} 
                                value={info.eighteenPlus} 
                                onChange={handleCheckboxes}/>
                            <label htmlFor="eighteenPlus">18+</label>
                        </div>
                    </div>
                </fieldset>
                <button className="gameFormButtons" type="button" disabled={isLoading} onClick={handleClickCreateGame}>CREATE GAME</button>
                <button className="gameFormButtons" type="button" onClick={() => navigate("/")}>CANCEL</button>
            </form>
        </>
    )
}
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
        additionalInfo: {}
    })
    const [info, setInfo] = useState({})
    const [skillLevels, setSkillLevels] = useState([])
    const [areas, setAreas] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const {gameId} = useParams()
    const navigate = useNavigate()

    const handleFieldChange = (e) => {
        const stateToChange = {...game}
        stateToChange[e.target.id] = e.target.value
        setGame(stateToChange)
    }

    const handleCheckboxes = (e) => {
        const newInfo = {...info}
        newInfo[e.target.id] = !newInfo[e.target.id]
        setInfo(newInfo)
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
            additionalInfo: info,
            id: game.id
        }
        updateGame(editedGame)
        .then(() => navigate(-1))
    }

    useEffect(() => {
        getGameById(gameId)
        .then(game => {
            setGame(game)
            setInfo(game.additionalInfo)
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

    return (
        <>
        <form className="gameForm">
            <h2 className="gameForm__title">Edit Your Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="areaId"><b>Area:</b> </label>
                    <select
                        value={game.areaId}
                        name="areaId"
                        id="areaId"
                        onChange={handleFieldChange}
                        required
                        autoFocus
                        className="form-control"
                    >
                        <option hidden disabled value="0">
                            Select an Area
                        </option>
                        {areas.map((area) => (
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
                        onChange={handleFieldChange}
                        required
                        className="form-control"
                        placeholder="Break Side Park"
                        value={game.parkName}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address"><b>Address:</b> </label>
                    <input
                        type="text"
                        id="address"
                        onChange={handleFieldChange}
                        required
                        className="form-control"
                        placeholder="123 Big Huck Ave"
                        value={game.address}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date"><b>Date:</b> </label>
                    <input
                        type="date"
                        id="date"
                        onChange={handleFieldChange}
                        required
                        className="form-control"
                        value={game.date}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time"><b>Time:</b> </label>
                    <input
                        type="time"
                        id="time"
                        onChange={handleFieldChange}
                        required
                        className="form-control"
                        value={game.time}
                    />
                    <small> all times are in Central Time</small>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevelId"><b>Skill Level:</b> </label>
                    <select
                        value={game.skillLevelId}
                        name="skillLevelId"
                        id="skillLevelId"
                        onChange={handleFieldChange}
                        required
                        className="form-control"
                    >
                        <option hidden disabled value="0">
                            Select a Skill Level
                        </option>
                        {skillLevels.map((sl) => (
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
                            checked={info.cleatsRequired || ""} 
                            value={info.cleatsRequired} 
                            onChange={handleCheckboxes}
                            />
                        <label htmlFor="cleatsRequired">cleats required</label>
                    </div>
                    <div>
                        <input 
                            type="checkbox" 
                            name="whiteAndDarkShirt"
                            id="whiteAndDarkShirt"
                            checked={info.whiteAndDarkShirt || ""} 
                            value={info.whiteAndDarkShirt}
                            onChange={handleCheckboxes}/>
                        <label htmlFor="whiteAndDarkShirt">white & dark shirt required</label>
                    </div>
                    <div>
                        <input 
                            type="checkbox" 
                            name="barefootFriendly"
                            id="barefootFriendly"
                            checked={info.barefootFriendly || ""}
                            value={info.barefootFriendly} 
                            onChange={handleCheckboxes}/>
                        <label htmlFor="barefootFriendly">barefoot friendly</label>
                    </div>
                    <div>
                        <input 
                            type="checkbox"
                            name="dogsAllowed"
                            id="dogsAllowed"
                            checked={info.dogsAllowed || ""}
                            value={info.dogsAllowed} 
                            onChange={handleCheckboxes}/>
                        <label htmlFor="dogsAllowed">dogs allowed at park</label>
                    </div>
                    <div>
                        <input 
                            type="checkbox"
                            name="playgroundNearby"
                            id="playgroundNearby"
                            checked={info.playgroundNearby || ""} 
                            value={info.playgroundNearby} 
                            onChange={handleCheckboxes}/>
                        <label htmlFor="playgroundNearby">playground nearby</label>
                    </div>
                    <div>
                        <input 
                            type="checkbox"
                            name="bathroomsNearby"
                            id="bathroomsNearby"
                            checked={info.bathroomsNearby || ""} 
                            value={info.bathroomsNearby} 
                            onChange={handleCheckboxes}/>
                        <label htmlFor="bathroomsNearby">bathrooms nearby</label>
                    </div>
                    <div>
                        <input 
                            type="checkbox"
                            name="drinkingWaterNearby"
                            id="drinkingWaterNearby"
                            checked={info.drinkingWaterNearby || ""} 
                            value={info.drinkingWaterNearby} 
                            onChange={handleCheckboxes}/>
                        <label htmlFor="drinkingWaterNearby">drinking water nearby</label>
                    </div>
                    <div>
                        <input 
                            type="checkbox"
                            name="allAges"
                            id="allAges"
                            checked={info.allAges || ""} 
                            value={info.allAges}
                            onChange={handleCheckboxes}/>
                        <label htmlFor="allAges">all ages welcome</label>
                    </div>
                    <div>
                        <input 
                            type="checkbox"
                            name="eighteenPlus"
                            id="eighteenPlus"
                            checked={info.eighteenPlus || ""} 
                            value={info.eighteenPlus} 
                            onChange={handleCheckboxes}/>
                        <label htmlFor="eighteenPlus">18+</label>
                    </div>
                </div>
            </fieldset>
            <button className="gameFormButtons" type="button" disabled={isLoading} onClick={updateExistingGame}>
                SAVE EDITS
            </button>
            <button className="gameFormButtons" type="button" onClick={() => navigate(-1)}>
                CANCEL
            </button>
        </form>
    </>
    )
}
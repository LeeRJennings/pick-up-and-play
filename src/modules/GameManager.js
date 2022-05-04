import { upcomingDateFormatter, previousDateFormatter } from "../helpers/dateFormatter"

const remoteURL = "http://localhost:1968"
const todaysDate = upcomingDateFormatter(new Date())
const yesterdaysDate = previousDateFormatter(new Date())

// ======================================== CRUD ========================================

export const addGame = (newGame) => {
    return fetch(`${remoteURL}/games`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newGame)
    }).then(response => response.json())
}

export const updateGame = (editedGame) => {
    return fetch(`${remoteURL}/games/${editedGame.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedGame)
    }).then(response => response.json())
}

export const deleteGame = (gameId) => {
    return fetch(`${remoteURL}/games/${gameId}`, {
        method: "DELETE"
    }).then(response => response.json())
}

// ======================================== all games ========================================

export const getAllGames = () => {
    return fetch(`${remoteURL}/games?_expand=user&_expand=area&_expand=skillLevel&_sort=date,time&_order=asc,asc`)
    .then(response => response.json())
}

export const getAllUpcomingGames = () => {
    return fetch(`${remoteURL}/games?date_gte=${todaysDate}&date_lte=3022-01-01&_expand=user&_expand=area&_expand=skillLevel&_sort=date,time&_order=asc,asc`)
    .then(response => response.json())
}

export const getAllPreviousGames = () => {
    return fetch(`${remoteURL}/games?date_gte=1022-01-01&date_lte=${yesterdaysDate}&_expand=user&_expand=area&_expand=skillLevel&_sort=date,time&_order=desc,asc`)
    .then(response => response.json())
}

// ======================================== games by userId ========================================

export const getGamesByUserId =(userId) => {
    return fetch(`${remoteURL}/games?userId=${userId}&_expand=user&_expand=area&_expand=skillLevel&_sort=date,time&_order=asc,asc`)
    .then(response => response.json())
}

export const getUpcomingGamesByUserId =(userId) => {
    return fetch(`${remoteURL}/games?userId=${userId}&date_gte=${todaysDate}&date_lte=3022-01-01&_expand=user&_expand=area&_expand=skillLevel&_sort=date,time&_order=asc,asc`)
    .then(response => response.json())
}

export const getPreviousGamesByUserId =(userId) => {
    return fetch(`${remoteURL}/games?userId=${userId}&date_gte=1022-01-01&date_lte=${yesterdaysDate}&_expand=user&_expand=area&_expand=skillLevel&_sort=date,time&_order=desc,asc`)
    .then(response => response.json())
}

// ======================================== games by gameId ========================================

export const getGameById = (gameId) => {
    return fetch(`${remoteURL}/games/${gameId}?_expand=user&_expand=area&_expand=skillLevel`)
    .then(response => response.json())
}

// ======================================== games by areaId ========================================

export const getGamesByAreaId = (areaId) => {
    return fetch(`${remoteURL}/games?areaId=${areaId}&_expand=user&_expand=area&_expand=skillLevel&_sort=date,time&_order=asc,asc`)
    .then(response => response.json())
}

export const getUpcomingGamesByAreaId = (areaId) => {
    return fetch(`${remoteURL}/games?areaId=${areaId}&date_gte=${todaysDate}&date_lte=3022-01-01&_expand=user&_expand=area&_expand=skillLevel&_sort=date,time&_order=asc,asc`)
    .then(response => response.json())
}

export const getPreviousGamesByAreaId = (areaId) => {
    return fetch(`${remoteURL}/games?areaId=${areaId}&date_gte=1022-01-01&date_lte=${yesterdaysDate}&_expand=user&_expand=area&_expand=skillLevel&_sort=date,time&_order=desc,asc`)
    .then(response => response.json())
}

// ======================================== games by skillLevelId ========================================

export const getGamesBySkillLevelId = (skillLevelId) => {
    return fetch(`${remoteURL}/games?skillLevelId=${skillLevelId}&_expand=user&_expand=area&_expand=skillLevel&_sort=date,time&_order=asc,asc`)
    .then(response => response.json())
}

export const getUpcomingGamesBySkillLevelId = (skillLevelId) => {
    return fetch(`${remoteURL}/games?skillLevelId=${skillLevelId}&date_gte=${todaysDate}&date_lte=3022-01-01&_expand=user&_expand=area&_expand=skillLevel&_sort=date,time
                 &_order=asc,asc`)
    .then(response => response.json())
}

export const getPreviousGamesBySkillLevelId = (skillLevelId) => {
    return fetch(`${remoteURL}/games?skillLevelId=${skillLevelId}&date_gte=1022-01-01&date_lte=${yesterdaysDate}&_expand=user&_expand=area&_expand=skillLevel&_sort=date,time
                 &_order=desc,asc`)
    .then(response => response.json())
}

// ======================================== games by date ========================================

export const getGamesByDate = (date) => {
    return fetch(`${remoteURL}/games?date=${date}&_expand=user&_expand=area&_expand=skillLevel&_sort=date,time&_order=asc,asc`)
    .then(response => response.json())
}

export const getUpcomingGamesByDate = (date) => {
    return fetch(`${remoteURL}/games?date=${date}&date_gte=${todaysDate}&date_lte=3022-01-01&_expand=user&_expand=area&_expand=skillLevel&_sort=date,time&_order=asc,asc`)
    .then(response => response.json())
}

export const getPreviousGamesByDate = (date) => {
    return fetch(`${remoteURL}/games?date=${date}&date_gte=1022-01-01&date_lte=${yesterdaysDate}&_expand=user&_expand=area&_expand=skillLevel&_sort=date,time&_order=desc,asc`)
    .then(response => response.json())
}
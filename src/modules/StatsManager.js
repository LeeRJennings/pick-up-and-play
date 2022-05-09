const remoteURL = "http://localhost:1968"

export const addStats = (newStats) => {
    return fetch(`${remoteURL}/stats`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newStats)
    }).then(response => response.json())
}

export const updateStats = (editedStats) => {
    return fetch(`${remoteURL}/stats/${editedStats.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedStats)
    }).then(response => response.json())
}

export const deleteStats = (statsId) => {
    return fetch(`${remoteURL}/stats/${statsId}`, {
        method: "DELETE"
    }).then(response => response.json())
}

export const getAllStats = () => {
    return fetch(`${remoteURL}/stats`)
    .then(response => response.json()) 
}

export const getStatsById = (statId) => {
    return fetch(`${remoteURL}/stats/${statId}`)
    .then(response => response.json())
}

export const getStatsByGameIdAndUserId = (gameId, userId) => {
    return fetch(`${remoteURL}/stats?gameId=${gameId}&userId=${userId}`)
    .then(response => response.json())
}
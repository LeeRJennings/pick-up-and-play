const remoteURL = "http://localhost:1968"

export const addGame = (newGame) => {
    return fetch(`${remoteURL}/games`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newGame)
    }).then(response => response.json())
}

export const getAllGames = () => {
    return fetch(`${remoteURL}/games?_expand=user&_expand=area&_expand=skillLevel`)
    .then(response => response.json())
}

export const getGamesByUserId =(loggedInUserId) => {
    return fetch(`${remoteURL}/games?userId=${loggedInUserId}&_expand=user&_expand=area&_expand=skillLevel`)
    .then(response => response.json())
}

export const deleteGame = (gameId) => {
    return fetch(`${remoteURL}/games/${gameId}`, {
        method: "DELETE"
    }).then(response => response.json())
}

export const getGameById = (gameId) => {
    return fetch(`${remoteURL}/games/${gameId}?_expand=user&_expand=area&_expand=skillLevel`)
    .then(response => response.json())
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
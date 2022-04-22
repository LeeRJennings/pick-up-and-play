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
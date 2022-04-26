const remoteURL = "http://localhost:1968"

export const addLike = (likeObj) => {
    return fetch(`${remoteURL}/likes`, {
        method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(likeObj)
    }).then(response => response.json())
}

export const getLikesByGameId = (gameId) => {
    return fetch(`${remoteURL}/likes?gameId=${gameId}`)
    .then(response => response.json())
}

export const getAllLikes = () => {
    return fetch(`${remoteURL}/likes`)
    .then(response => response.json())
}
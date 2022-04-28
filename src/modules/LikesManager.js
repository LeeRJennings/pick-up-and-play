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

export const deleteLike = (likeId) => {
    return fetch(`${remoteURL}/likes/${likeId}`, {
        method: "DELETE"
    }).then(result => result.json())
}

export const getLikesByUserId = (userId) => {
    return fetch(`${remoteURL}/likes?userId=${userId}`)
    .then(response => response.json())
}
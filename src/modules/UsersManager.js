const remoteURL = "http://localhost:1968"

export const getAllUsers = () => {
    return fetch (`${remoteURL}/users`)
    .then(response => response.json())
}
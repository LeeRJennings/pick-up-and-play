const remoteURL = "http://localhost:1968"

export const getAllStates = () => {
    return fetch (`${remoteURL}/states`)
    .then(response => response.json())
}
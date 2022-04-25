const remoteURL = "http://localhost:1968"

export const getAllAreas = () => {
    return fetch (`${remoteURL}/areas`)
    .then(response => response.json())
}
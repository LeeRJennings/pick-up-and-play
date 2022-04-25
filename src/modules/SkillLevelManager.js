const remoteURL = "http://localhost:1968"

export const getAllSkillLevels = () => {
    return fetch (`${remoteURL}/skillLevels`)
    .then(response => response.json())
}
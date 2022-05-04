export const dateFormatter = (string) => {
    const date = new Date(string) 
    let day = date.getUTCDate() 
    let month = date.getUTCMonth() +1
    let year = date.getUTCFullYear() 
    const formattedDate = month + "/" + day + "/" + year 
    return formattedDate 
}

export const upcomingDateFormatter = (string) => {
    const date = new Date(string) 
    let day = date.getUTCDate() 
    let month = date.getUTCMonth() +1
    let year = date.getUTCFullYear()
    if (parseInt(day) < 10 && parseInt(month) < 10) {
        const formattedDate = `${year}-0${month}-0${day}`  
        return formattedDate 
    } else if (parseInt(day) < 10) {
        const formattedDate = `${year}-${month}-0${day}`  
        return formattedDate
    } else if (parseInt(month) < 10) {
        const formattedDate = `${year}-0${month}-${day}`  
        return formattedDate 
    } else {
        const formattedDate = `${year}-${month}-${day}`  
        return formattedDate
    }
}

export const previousDateFormatter = (string) => {
    const date = new Date(string) 
    let day = date.getUTCDate() -1
    let month = date.getUTCMonth() +1
    let year = date.getUTCFullYear()
    if (parseInt(day) < 10 && parseInt(month) < 10) {
        const formattedDate = `${year}-0${month}-0${day}`  
        return formattedDate 
    } else if (parseInt(day) < 10) {
        const formattedDate = `${year}-${month}-0${day}`  
        return formattedDate
    } else if (parseInt(month) < 10) {
        const formattedDate = `${year}-0${month}-${day}`  
        return formattedDate 
    } else {
        const formattedDate = `${year}-${month}-${day}`  
        return formattedDate
    }
}
export const timeFormatter = (time) => {
    let hour = parseInt(time.split(":")[0])
    let minute = time.split(":")[1]
    if (hour === 0) {
        hour = 12
        return `${hour}:${minute} AM`
    } else if (hour <= 11) {
        return `${time} AM`
    } else if (hour === 13) {
        hour = 1
        return `${hour}:${minute} PM`
    } else if (hour === 14) {
        hour = 2
        return `${hour}:${minute} PM`
    } else if (hour === 15) {
        hour = 3
        return `${hour}:${minute} PM`
    } else if (hour === 16) {
        hour = 4
        return `${hour}:${minute} PM`
    } else if (hour === 17) {
        hour = 5
        return `${hour}:${minute} PM`
    } else if (hour === 18) {
        hour = 6
        return `${hour}:${minute} PM`
    } else if (hour === 19) {
        hour = 7
        return `${hour}:${minute} PM`
    } else if (hour === 20) {
        hour = 8
        return `${hour}:${minute} PM`
    } else if (hour === 21) {
        hour = 9
        return `${hour}:${minute} PM`
    } else if (hour === 22) {
        hour = 10
        return `${hour}:${minute} PM`
    } else if (hour === 23) {
        hour = 11
        return `${hour}:${minute} PM`
    } else if (hour === 12) {
        hour = 12
        return `${hour}:${minute} PM`
    }
}
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const offset = ["-5", "+1", "+8"] // NA, EU, Asia

export function createDateObject(date: string) {

    const formatDate = (date: string, offset: string) => `${date.split(" ").slice(0, 2).join(" ").replace(/-/g, "/")}${offset}`

    let dateObj
    if (date.endsWith("UTC+8")) {
        dateObj = new Date(formatDate(date, "+8"))
    }
    else {
        dateObj = new Date(formatDate(date, offset[0]))
    }

    let arr = dateObj.toLocaleString().split(",")
    
    let dateArr = arr[0].split("/")
    let month = months[Number(dateArr[0]) - 1]
    let day = parseInt(dateArr[1], 10).toString()
    let year = dateArr[2]
    let dateString = `${month} ${day}, ${year}`

    let timeArr = arr[1].trim().split(" ")
    let timestamp = `${timeArr[0].split(":").splice(0, 2).join(":")} ${timeArr[1]}`

    return { obj: dateObj, date: dateString, time: timestamp }

}

export function isCurrentBanner(start: Date, end: Date) {
    let today = new Date()
    return today >= start && today < end
}
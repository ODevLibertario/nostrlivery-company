const regexLat = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/
const regexLon = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/

export function isValidLatitude(latitude: string) {
    return regexLat.test(latitude)
}

export function isValidLongitude(longitude: string) {
    return regexLon.test(longitude)
}

export function isEmpty(obj: any) {
    return Object.keys(obj).length === 0
}
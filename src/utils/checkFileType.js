export function checkFileType(url) {
    if (/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(url)) {
        return "image"
    } else if (/^https?:\/\/.+\.(mp4|webm|ogg)$/.test(url)) {
        return "video"
    } else {
        return undefined
    }
}
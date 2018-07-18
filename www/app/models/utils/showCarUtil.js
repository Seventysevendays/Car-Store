export const fetchImages = async( nowId ) => {
    const {images} = await fetch(`carimages/${nowId}`).then(data => data.json())
    return images
}
export const fetchCarLike = async( nowId ) => {
    const result = await fetch(`carlike/${nowId}`).then(data => data.json())
    return result
}
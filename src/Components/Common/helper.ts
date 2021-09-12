export const convertDate = (inboxDate: string) => {
    const months = ['January', 'Febrary', 'March', 'April', 'May', 'June', 'Jule', 'August', 'September', 'Oktomber', 'November', 'December']
    const createDate = new Date(inboxDate)
    const year = createDate.getFullYear()
    const month = months[createDate.getMonth()]
    const date = createDate.getDate()
    return `${month} ${date}, ${year}`
}
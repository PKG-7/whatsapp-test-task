export const getTime = () => {
    const date = new Date(Date.now())

    const time = date.toLocaleString('ru-Ru', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
    })
    return time
}

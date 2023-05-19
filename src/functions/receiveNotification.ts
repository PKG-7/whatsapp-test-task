import { iNotification } from 'entities/notifications/IncomingMessage'
import { iUserSecrets } from 'entities/userSecrets'

export const receiveNotification = async (secrets: iUserSecrets) => {
    const { idInstance, apiToken } = secrets
    const url = `https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiToken}`
    const response = await fetch(url)
    const notification: iNotification = await response.json()
    return notification
}

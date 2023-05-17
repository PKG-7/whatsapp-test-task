import { iUserSecrets } from 'entities/userSecrets'

export const deleteNotification = async (receiptId: number, secrets: iUserSecrets) => {
    const { idInstance, apiToken } = secrets
    const link = `https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiToken}/${receiptId}`

    await fetch(link, {
        method: 'DELETE',
    })
}

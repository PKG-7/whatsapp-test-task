import { useQuery } from '@tanstack/react-query'
import { iUserSecrets } from 'entities/userSecrets'
import { useState } from 'react'

// Define the types for the notification and its possible types
type NotificationType =
    | 'incomingMessageReceived'
    | 'stateInstanceChanged'
    | 'outgoingMessageStatus'
    | 'deviceInfo'

interface IncomingMessage {
    typeWebhook: 'incomingMessageReceived'
    messageData: {
        textMessageData: {
            textMessage: string
        }
    }
}

interface StateInstanceChanged {
    typeWebhook: 'stateInstanceChanged'
    stateInstance: string
}

interface OutgoingMessageStatus {
    typeWebhook: 'outgoingMessageStatus'
    idMessage: string
    instanceData: {
        idInstance: string
        typeInstance: string
        wid: string
    }
    sendByApi: boolean
    status: string
    timestamp: number
}

interface nDeviceInfo {
    typeWebhook: 'deviceInfo'
    deviceData: string
}

type Notification =
    | IncomingMessage
    | StateInstanceChanged
    | OutgoingMessageStatus
    | nDeviceInfo

export function useNotifications() {
    const [newNotification, setNewNotification] = useState<Notification | null>(null)

    useQuery(['newNotification'], async () => {
        const localSecrets = localStorage.getItem('userSecrets')

        if (localSecrets) {
            const secrets: iUserSecrets = JSON.parse(localSecrets)
            const { idInstance, apiToken } = secrets
            // console.log(idInstance)
            // console.log(apiToken)

            const url = `https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiToken}`

            const response = await fetch(url)
            console.log(response)

            const webhook = await response.json()
            const wbText = await response.text()
            console.log(wbText)
            console.log(webhook)

            const webhookBody = webhook.body
            console.log(webhookBody)

            if (isIncomingMessage(webhookBody)) {
                console.log('incomingMessageReceived')
                console.log(webhookBody.messageData.textMessageData.textMessage)

                //* Update messages state with the received message
                // updateMessages(webhookBody.messageData.textMessageData.textMessage)
            } else if (isStateInstanceChanged(webhookBody)) {
                console.log('stateInstanceChanged')
                console.log(`stateInstance=${webhookBody.stateInstance}`)
            } else if (isOutgoingMessageStatus(webhookBody)) {
                console.log(webhook)
                console.log('outgoingMessageStatus')
                console.log(`status=${webhookBody.status}`)
                const result = deleteNotification(webhook.receiptId, idInstance, apiToken)

                console.log(result)
            } else if (isDeviceInfo(webhookBody)) {
                console.log('deviceInfo')
                console.log(`status=${webhookBody.deviceData}`)
            }
            setNewNotification(webhookBody)
        }
    })

    return { newNotification }
}

const deleteNotification = async (
    receiptId: string,
    idInstance: string,
    apiToken: string,
) => {
    const link = `https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiToken}/${receiptId}`

    await fetch(link, {
        method: 'DELETE',
    })
}

// Type guards
function isIncomingMessage(notification: Notification): notification is IncomingMessage {
    return notification.typeWebhook === 'incomingMessageReceived'
}

function isStateInstanceChanged(
    notification: Notification,
): notification is StateInstanceChanged {
    return notification.typeWebhook === 'stateInstanceChanged'
}

function isOutgoingMessageStatus(
    notification: Notification,
): notification is OutgoingMessageStatus {
    return notification.typeWebhook === 'outgoingMessageStatus'
}

function isDeviceInfo(notification: Notification): notification is nDeviceInfo {
    return notification.typeWebhook === 'deviceInfo'
}

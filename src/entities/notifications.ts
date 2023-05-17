export type iNotification = {
    receiptId: number
    body: NotificationBody
}

type NotificationBody = {
    typeWebhook: string
    instanceData: {
        idInstance: number
        wid: string
        typeInstance: string
    }
    timestamp: number
    stateInstance: string
}

export type NotificationX =
    | IncomingMessage
    | StateInstanceChanged
    | OutgoingMessageStatus
    | DeviceInfo

export type NotificationType =
    | 'incomingMessageReceived'
    | 'stateInstanceChanged'
    | 'outgoingMessageStatus'
    | 'deviceInfo'

export interface IncomingMessage {
    typeWebhook: 'incomingMessageReceived'
    messageData: {
        textMessageData: {
            textMessage: string
        }
    }
}

export interface StateInstanceChanged {
    typeWebhook: 'stateInstanceChanged'
    instanceData: {
        idInstance: number
        wid: string
        typeInstance: string
    }
    timestamp: number
    stateInstance: string
}

export interface OutgoingMessageStatus {
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

export interface DeviceInfo {
    typeWebhook: 'deviceInfo'
    deviceData: string
}

export function isIncomingMessage(
    notification: NotificationX,
): notification is IncomingMessage {
    return notification.typeWebhook === 'incomingMessageReceived'
}

export function isStateInstanceChanged(
    notification: NotificationX,
): notification is StateInstanceChanged {
    return notification.typeWebhook === 'stateInstanceChanged'
}

export function isOutgoingMessageStatus(
    notification: NotificationX,
): notification is OutgoingMessageStatus {
    return notification.typeWebhook === 'outgoingMessageStatus'
}

export function isDeviceInfo(notification: NotificationX): notification is DeviceInfo {
    return notification.typeWebhook === 'deviceInfo'
}

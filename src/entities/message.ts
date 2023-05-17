export type iMessage = IncomingMessage | OutgoingMessage

export const createNewTextMessage = (
    text: string,
    idMessage: string,
    chatId: string,
    timestamp?: number,
) => {
    const newMessage: iMessage = {
        textMessage: text,
        idMessage,
        chatId,
        type: 'outgoing',
        typeMessage: 'textMessage',
        timestamp: timestamp || Date.now(),
    }
    return newMessage
}
type iIncomingMessageX = {
    receiptId: number
    body: {
        idMessage: string
        instanceData: {
            idInstance: number
            typeInstance: string
            wid: string
        }
        messageData: {
            textMessageData: {
                textMessage: string
            }
            typeMessage: string
        }
        senderData: {
            chatId: string
            chatName: string
            sender: string
            senderName: string
        }
        timestamp: number
        typeWebhook: string
    }
}
export const createIncomingTextMessage = (notification: iIncomingMessageX) => {
    const newMessage: iMessage = {
        textMessage: notification.body.messageData.textMessageData.textMessage,
        idMessage: notification.body.idMessage,
        chatId: notification.body.senderData.chatId,
        type: 'incoming',
        typeMessage: 'textMessage',
        timestamp: notification.body.timestamp,
    }
    return newMessage
}
export interface IncomingMessage {
    type: 'incoming'
    timestamp: number
    idMessage: string
    typeMessage: typeMessage
    chatId: string
    senderId: string
    senderName: string
    textMessage?: string
    downloadUrl?: string
    caption?: string
    location?: Location
    contact?: Contact
    extendedTextMessage?: ExtendedTextMessage
}

export interface OutgoingMessage {
    idMessage: string //Получаем в ответ при отправке
    type: 'outgoing'
    chatId: string //
    typeMessage: typeMessage
    timestamp: number
    statusMessage?: 'pending' | 'sent' | 'delivered' | 'read'
    textMessage?: string
    downloadUrl?: string
    caption?: string
    location?: Location
    contact?: Contact
    extendedTextMessage?: ExtendedTextMessage
}

type typeMessage =
    | 'textMessage'
    | 'imageMessage'
    | 'videoMessage'
    | 'documentMessage'
    | 'audioMessage'
    | 'locationMessage'
    | 'contactMessage'
    | 'extendedTextMessage'

export interface Location {
    nameLocation: string
    address: string
    latitude: number
    longitude: number
    jpegThumbnail: string
}

export interface Contact {
    displayName: string
    vcard: string
}

export interface ExtendedTextMessage {
    text: string
    description: string
    title: string
    previewType: string
    jpegThumbnail: string
}

export function isOutgoingMessageX(message: iMessage): message is OutgoingMessage {
    return message.type === 'outgoing'
}

export function isIncomingMessageX(message: iMessage): message is IncomingMessage {
    return message.type === 'incoming'
}

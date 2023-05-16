export type iMessage = IncomingMessage | OutgoingMessage

export const createNewTextMessage = (text: string, idMessage: string, chatId: string) => {
    const newMessage: iMessage = {
        textMessage: text,
        idMessage,
        chatId,
        type: 'outgoing',
        typeMessage: 'textMessage',
        timestamp: Date.now(),
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

export function isOutgoingMessage(message: iMessage): message is OutgoingMessage {
    return message.type === 'outgoing'
}

export function isIncomingMessage(message: iMessage): message is IncomingMessage {
    return message.type === 'incoming'
}

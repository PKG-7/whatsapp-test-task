type iMessage = iMessageIncoming | OutgoingMessage

interface OutgoingMessage {
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

type iMessageIncoming = {
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

type typeMessage =
    | 'textMessage'
    | 'imageMessage'
    | 'videoMessage'
    | 'documentMessage'
    | 'audioMessage'
    | 'locationMessage'
    | 'contactMessage'
    | 'extendedTextMessage'

interface Location {
    nameLocation: string
    address: string
    latitude: number
    longitude: number
    jpegThumbnail: string
}
interface Contact {
    displayName: string
    vcard: string
}

interface ExtendedTextMessage {
    text: string
    description: string
    title: string
    previewType: string
    jpegThumbnail: string
}

export type iNotification = {
    receiptId: number
    body: iIncomingMessageBodyType
}

//TODO: Добавить типы если надо будет
interface OutgoingMessageBodyType {}

export interface iIncomingMessageBodyType {
    typeWebhook: 'incomingMessageReceived'
    instanceData: InstanceData
    timestamp: number
    idMessage: string
    senderData: SenderData
    messageData: MessageData
}

interface InstanceData {
    idInstance: number
    wid: string
    typeInstance: string
}

interface SenderData {
    chatId: string
    chatName: string
    sender: string
    senderName: string
}

interface TextMessageData {
    textMessage: string
}

interface MessageData {
    typeMessage: string
    textMessageData: TextMessageData
}

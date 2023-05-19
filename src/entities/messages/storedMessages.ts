//* Сообщения, которые хранятся в LocalStorage

import {
    iIncomingMessageBodyType,
    iNotification,
} from 'entities/notifications/IncomingMessage'

export type iMessageStored = OutgoingTextMessageStored | IncomingTextMessageStored

// Сообщение, которое напечатал user в чате и отправил
export const createStoredTextMessage = (
    text: string,
    idMessage: string,
    chatId: string,
    timestamp?: number,
) => {
    const newMessage: OutgoingTextMessageStored = {
        text,
        idMessage,
        chatId,
        type: 'outgoing',
        typeMessage: 'textMessage',
        timestamp: timestamp || Date.now(),
    }
    return newMessage
}

export interface OutgoingTextMessageStored {
    text: string
    idMessage: string //Получаем в ответе от API при отправке
    type: 'outgoing'
    chatId: string
    typeMessage: 'textMessage'
    timestamp: number
}

export const createIncomingTextMessage = (notification: iNotification) => {
    const newMessage: IncomingTextMessageStored = {
        text: notification.body.messageData.textMessageData.textMessage,
        idMessage: notification.body.idMessage,
        chatId: notification.body.senderData.chatId,
        type: 'incoming',
        typeMessage: 'textMessage',
        timestamp: notification.body.timestamp,
    }
    return newMessage
}

export interface IncomingTextMessageStored {
    text: string
    idMessage: string
    chatId: string
    type: 'incoming'
    typeMessage: 'textMessage'
    timestamp: number
}

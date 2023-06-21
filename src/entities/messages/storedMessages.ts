//* Сообщения, которые хранятся в LocalStorage

import {
    iIncomingMessageBodyType,
    iNotification,
} from 'entities/notifications/IncomingMessage'
import { getTime } from '../../functions/getTime'

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
        time: getTime(),
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
    time: string
    timestamp: number
}

export const createIncomingTextMessage = (notification: iNotification) => {
    const newMessage: IncomingTextMessageStored = {
        text: notification.body.messageData.textMessageData.textMessage,
        idMessage: notification.body.idMessage,
        chatId: notification.body.senderData.chatId,
        type: 'incoming',
        typeMessage: 'textMessage',
        time: getTime(),
        timestamp: Date.now(), // Server gives wrong time so we rewrite it,
        //its not even different timezone its like 15:42 instead of 20:00
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
    time: string
}

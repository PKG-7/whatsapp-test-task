import { Api } from '@/functions/Api'
import {
    createIncomingTextMessage,
    createStoredTextMessage,
    iMessageStored,
} from 'entities/messages/storedMessages'
import { iNotification } from 'entities/notifications/IncomingMessage'
import { iUserSecrets } from 'entities/userSecrets'
import { useLocalStorage } from 'hooks/useLocalStorage'
import { useEffect } from 'react'

export type iStoredUserChats = {
    [key: string]: iMessageStored[]
}

export function useStoredChats(
    newNotification: iNotification | null,
    popNotification: (
        notification: iNotification,
        secrets: iUserSecrets | null,
    ) => Promise<void>,
    secrets: iUserSecrets | null,
): {
    storedChats: iStoredUserChats | null
    handleSendTextMessage: (chatId: string, userInput: string) => Promise<void>
} {
    const [storedChats, setStoredChats] = useLocalStorage<iStoredUserChats | null>(
        'userMessages',
        null,
    )

    useEffect(() => {
        const storedObj = storedChats || {}

        if (newNotification?.body.typeWebhook === 'incomingMessageReceived') {
            const { newMessage, newMessageChatId } =
                createIncomingTextMessage(newNotification) // Создаем объект для нового сообщения и получаем его ChatID

            const currentChatMessages = storedObj[newMessageChatId] || [] // Получаем чаты из Localstorage

            const updatedMessages = currentChatMessages.filter(
                (message) => message.idMessage !== newMessage.idMessage, // фильтруем от дубликатов
            )

            updatedMessages.push(newMessage)

            const updatedStoredChats = {
                ...storedObj,
                [newMessageChatId]: updatedMessages, // Обновленный объект всех чатов
            }

            setStoredChats(updatedStoredChats) // Перезаписываем объект всех чатов в LocalStorage
            popNotification(newNotification, secrets) // Удаляем Notification полученное от API, чтобы получать следующие
        }
    }, [newNotification])

    const handleSendTextMessage = async (chatId: string, userInput: string) => {
        if (secrets) {
            const storedObj = storedChats || {}

            const response = await Api.sendMessage(userInput, chatId, secrets)

            if (response) {
                const newMessage = createStoredTextMessage(
                    userInput,
                    response.idMessage,
                    chatId,
                )

                const chatMessages = storedObj[chatId] || []
                const updatedMessages = [...chatMessages, newMessage]

                const updatedStoredMessages = {
                    ...storedChats,
                    [chatId]: updatedMessages,
                }
                setStoredChats(updatedStoredMessages)
            } else {
                console.log('Api не ответил на отправленное сообщение, отправка отменена')
            }
        } else {
            console.log('Что-то не так с storage или secrets')
        }
    }

    return { storedChats, handleSendTextMessage }
}

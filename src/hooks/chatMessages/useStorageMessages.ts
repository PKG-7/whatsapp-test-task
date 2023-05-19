import {
    createIncomingTextMessage,
    createStoredTextMessage,
    iMessageStored,
} from 'entities/messages/storedMessages'
import { useLocalStorage } from 'hooks/useLocalStorage'
import { useEffect } from 'react'
import { iNotification } from 'entities/notifications/IncomingMessage'
import { iUserSecrets } from 'entities/userSecrets'
import { Api } from '@/functions/Api'

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

        if (newNotification) {
            const hookType = newNotification.body.typeWebhook

            if (hookType === 'incomingMessageReceived') {
                const newMessage = createIncomingTextMessage(newNotification)
                const messageChatId = newNotification.body.senderData.chatId

                const currentChatMessages = storedObj[messageChatId] || []

                const updatedMessages = [...currentChatMessages, newMessage]

                const updatedStoredChats = {
                    ...storedChats,
                    [messageChatId]: updatedMessages,
                }

                setStoredChats(updatedStoredChats)
                popNotification(newNotification, secrets)
            }
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

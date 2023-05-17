import { Api } from '@/functions/Api'
import {
    createIncomingTextMessage,
    createNewTextMessage,
    iMessage,
} from 'entities/message'
import { iNotification } from 'entities/notifications'
import { useSecrets } from 'hooks/useSecrets'
import { useEffect, useState } from 'react'

export const useChatById = (
    chatId: string,
    newNotification: iNotification | null,
    popNotification: (notification: iNotification) => iNotification,
) => {
    const { secrets } = useSecrets()
    const [messages, setMessages] = useState<iMessage[]>([])

    useEffect(() => {
        if (newNotification) {
            const notification = popNotification(newNotification)
            console.log(notification)

            //* поднять
            const storedMessages = JSON.parse(
                localStorage.getItem('userMessages') || '{}',
            )
            const chatMessages = storedMessages[chatId] || []

            const hookType = notification.body.typeWebhook
            if (hookType === 'incomingMessageReceived') {
                console.log('MESSAGE')

                const newMessage = createIncomingTextMessage(notification)
                console.log(newMessage)

                const updatedMessages = [...chatMessages, newMessage]
                console.log(newMessage.chatId)
                const updatedStoredMessages = {
                    ...storedMessages,
                    [chatId]: updatedMessages,
                }

                localStorage.setItem(
                    'userMessages',
                    JSON.stringify(updatedStoredMessages),
                )
                setMessages(updatedMessages)
            } else {
                // If the hook type is not 'incomingMessageReceived', simply set the existing chat messages
                setMessages(chatMessages)
            }
        } else {
            const storedMessages = JSON.parse(
                localStorage.getItem('userMessages') || '{}',
            )
            const chatMessages = storedMessages[chatId] || []
            setMessages(chatMessages)
        }
    }, [chatId, newNotification])

    const updateMessages = async (userInput: string) => {
        if (secrets) {
            const result = await Api.sendMessage(userInput, chatId, secrets)

            if (result) {
                const newMessage = createNewTextMessage(
                    userInput,
                    result.idMessage,
                    chatId,
                )

                const storedMessages = JSON.parse(
                    localStorage.getItem('userMessages') || '{}',
                )
                const chatMessages = storedMessages[chatId] || []
                const updatedMessages = [...chatMessages, newMessage]

                const updatedStoredMessages = {
                    ...storedMessages,
                    [chatId]: updatedMessages,
                }

                localStorage.setItem(
                    'userMessages',
                    JSON.stringify(updatedStoredMessages),
                )
                setMessages(updatedMessages)
            }
        } else {
            console.log('No secrets in localStorage...')
        }
    }

    return { messages, updateMessages }
}

import { Api } from '@/functions/Api'
import { createNewTextMessage, iMessage } from 'entities/message'
import { useEffect, useState } from 'react'

export const useChatById = (chatId: string) => {
    const [messages, setMessages] = useState<iMessage[]>([])

    useEffect(() => {
        const storedMessages = JSON.parse(localStorage.getItem('userMessages') || '{}')
        const chatMessages = storedMessages[chatId] || []
        setMessages(chatMessages)
    }, [chatId])

    const updateMessages = async (userInput: string) => {
        const secrets = JSON.parse(localStorage.getItem('userSecrets') || 'null')

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

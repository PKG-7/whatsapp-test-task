import { iMessageStored } from 'entities/messages/storedMessages'
import { useEffect, useState } from 'react'
import { iStoredUserChats } from './useStorageMessages'

export const useSelectedChatMessages = (
    storedChats: iStoredUserChats | null,
    selectedChatId: string,
): {
    messages: iMessageStored[] | []
} => {
    const [messages, setMessages] = useState<iMessageStored[]>([])

    useEffect(() => {
        if (storedChats) {
            const selectedChatMessages = storedChats[selectedChatId]
            setMessages(selectedChatMessages)
        }
    }, [selectedChatId, storedChats])

    return { messages }
}

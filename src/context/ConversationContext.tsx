import { createContext, ReactNode, useState } from 'react'
import { iMessage, iConversation } from '../types/Conversation'

interface ConversationProviderProps {
    children: ReactNode
}

interface ConversationContextType {
    conversation: iConversation
    message: iMessage[]
    setConversation: (conversation: iConversation) => void
    setMessage: (message: iMessage[]) => void
}

export const ConversationContext = createContext({} as ConversationContextType)

export const ConversationProvider = ({ children }: ConversationProviderProps) => {
    const [conversation, setConversationData] = useState<iConversation>(
        {} as iConversation,
    )
    const [message, setMessageData] = useState<iMessage[]>([])

    function setConversation(conversation: iConversation) {
        setConversationData(conversation)
    }

    function setMessage(message: iMessage[]) {
        console.log(message)
        setMessageData(message)
    }

    return (
        <ConversationContext.Provider
            value={{
                conversation,
                message,
                setConversation,
                setMessage,
            }}
        >
            {children}
        </ConversationContext.Provider>
    )
}

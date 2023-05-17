import { createContext, ReactNode, useState } from 'react'

interface ChatContextType {
    selectedChatId: string | null
    setSelectedChatId: (chatId: string | null) => void
}

const initialChatContext: ChatContextType = {
    selectedChatId: null,
    setSelectedChatId: () => {},
}

export const ChatContext = createContext<ChatContextType>(initialChatContext)

export const SelectedChatProvider = ({ children }: { children: ReactNode }) => {
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null)

    const handleSetSelectedChatId = (chatId: string | null) => {
        setSelectedChatId(chatId)
    }

    return (
        <ChatContext.Provider
            value={{ selectedChatId, setSelectedChatId: handleSetSelectedChatId }}
        >
            {children}
        </ChatContext.Provider>
    )
}

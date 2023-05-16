import { createContext, ReactNode, useState } from 'react'
import { iChat } from 'entities/chat'

interface ChatContextType {
    selectedChat: iChat | null
    setSelectedChat: (chat: iChat | null) => void
}

interface SelectedChatProviderProps {
    children: ReactNode
}

export const ChatContext = createContext<ChatContextType>({} as ChatContextType)

export const SelectedChatProvider = ({ children }: SelectedChatProviderProps) => {
    const [selectedChat, setSelectedChat] = useState<iChat | null>(null)

    return (
        <ChatContext.Provider value={{ selectedChat, setSelectedChat }}>
            {children}
        </ChatContext.Provider>
    )
}

interface iMessage {
    me: boolean
    message: string
}

interface iConversation {
    contactName: string
    messageHistory: iMessage[]
    image: string
}

interface iConversationListData {
    contactName: string
    lastMessage: string
    lastTime: string
    image: string
    messageHistory: iMessage[]
}

export type { iMessage, iConversation, iConversationListData }

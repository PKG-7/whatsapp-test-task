import { iMessage } from './message'

export interface iChat {
    id: string // id user who we chat with ('24124521@c.us')
    messageHistory: iMessage[]
    contactName: string | null

    lastMessage?: string
    lastTime?: string
    avatarUrl?: string
    phoneNumber?: number

    archive?: boolean
    ephemeralExpiration?: number
    ephemeralSettingTimestamp?: number
    notSpam?: boolean
}

export const createNewChat = (id: string, contactName?: string): iChat => {
    const newChat: iChat = {
        id,
        contactName: contactName || null,
        messageHistory: [],
    }

    return newChat
}

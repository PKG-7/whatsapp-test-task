import { Api } from '@/functions/Api'
import { createNewChat, iChat } from 'entities/chat'
import { iUserSecrets } from 'entities/userSecrets'
import { useEffect, useState } from 'react'

export const useChats = (): {
    chats: iChat[] | null
    handleSync: () => Promise<void>
    isSynced: boolean
    handleCreateNewChat: (phoneInput: number) => void
} => {
    const [isSynced, setIsSynced] = useState(false)
    const [chats, setChats] = useState<iChat[] | null>(null)
    const [secrets, setSecrets] = useState<iUserSecrets | null>(null)

    useEffect(() => {
        const storedChats = localStorage.getItem('userChats')
        const storedSecrets = localStorage.getItem('userSecrets')

        if (storedChats) {
            setChats(JSON.parse(storedChats))
        }
        if (storedSecrets) {
            setSecrets(JSON.parse(storedSecrets))
        }
    }, [])

    const handleCreateNewChat = (phoneInput: number) => {
        //TODO: Add postfix validation here depending on country
        const idPostfix = '@c.us'

        const id = `${phoneInput}${idPostfix}`
        const newChat: iChat = createNewChat(id)
        console.log(newChat)

        // Api.createNewChat(newChat) //TODO: add new chat to db
        setChats((prev) => {
            const updatedChats = [...(prev || []), newChat]
            localStorage.setItem('userChats', JSON.stringify(updatedChats))
            return updatedChats
        })
        // handleSync()

        console.log(newChat)
    }

    //* Adds chats from API history
    const handleSync = async () => {
        if (secrets) {
            const syncedChats = await Api.getChats(secrets)

            if (syncedChats) {
                if (!chats) {
                    const newChats = syncedChats.map((chat) => createNewChat(chat.id))
                    setChats(newChats)
                    console.log(newChats)
                }

                if (chats && syncedChats.length > chats.length) {
                    for (const syncedChat of syncedChats) {
                        if (!chats.find((chat) => chat.id === syncedChat.id)) {
                            setChats((prev) => [
                                ...(prev || []),
                                createNewChat(syncedChat.id),
                            ])
                        }
                    }
                }
            }
            setIsSynced(true)
        }
    }

    return { handleCreateNewChat, chats, handleSync, isSynced }
}

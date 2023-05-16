import { useEffect, useState } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { createNewChat, iChat } from 'entities/chat'
import { iUserSecrets } from 'entities/userSecrets'
import { Api } from '@/functions/Api'

export const useChats = (): {
    chats: iChat[] | null
    handleSync: () => Promise<void>
    isSynced: boolean
    setChats: (value: iChat[] | ((val: iChat[] | null) => iChat[] | null) | null) => void
    isLoading: boolean
} => {
    const [chats, setChats] = useLocalStorage<iChat[] | null>('userChats', null)
    const [secrets] = useLocalStorage<iUserSecrets | null>('userSecrets', null)

    const [isSynced, setIsSynced] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(false)
    }, [])

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

    return { chats, handleSync, isSynced, setChats, isLoading }
}

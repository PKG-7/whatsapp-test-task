import { iChat } from 'entities/chat'
import { useEffect, useState } from 'react'

export const useFilterChats = (chats: iChat[] | null | undefined) => {
    const [searchInput, setSearchInput] = useState('')
    const [filteredChatList, setFilteredChatList] = useState(chats)

    useEffect(() => {
        if (chats && searchInput.length > 0) {
            const filteredChats = chats.filter((chats) =>
                //TODO: нужно name добавить к объекту чтобы искать по имени, Api имя нам не дает
                chats.id?.includes(searchInput),
            )
            setFilteredChatList(filteredChats)
        } else {
            setFilteredChatList(chats)
        }
    }, [searchInput, chats])

    return { filteredChatList, searchInput, setSearchInput }
}

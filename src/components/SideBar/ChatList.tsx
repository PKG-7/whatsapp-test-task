import { useChats } from 'hooks/useChats'
import { useFilterChats } from 'hooks/useFilterChats'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { iChat } from '../../entities/chat'
import ChatCard from '../ChatCard'
import { CreateNewChatCard } from './CreateNewChatCard'
import { SidebarSearch } from './SidebarSearch'
import { SyncButton } from './SyncButton'
import { useHasMounted } from 'hooks/useHasMounted'

export function ChatList({
    setSelectedChatId,
}: {
    setSelectedChatId: Dispatch<SetStateAction<string | null>>
}) {
    const { chats, handleSync, isSynced } = useChats()
    const { searchInput, setSearchInput, filteredChatList } = useFilterChats(chats)

    const hasMounted = useHasMounted()
    if (!hasMounted) {
        return <div>💀💀💀Skeleton</div>
    }

    return (
        <>
            <SidebarSearch search={searchInput} setSearch={setSearchInput} />

            <SyncButton handleSync={handleSync} isSynced={isSynced} />

            <div className='flex flex-col w-full overflow-y-scroll'>
                {filteredChatList?.map((chat, index) => (
                    <ChatCard
                        setSelectedChatId={setSelectedChatId}
                        data={chat}
                        isFirstConversation={index === 0}
                        key={chat.id}
                    />
                ))}
                {!filteredChatList ||
                    (filteredChatList?.length === 0 && <CreateNewChatCard />)}
                <CreateNewChatCard />
            </div>
        </>
    )
}

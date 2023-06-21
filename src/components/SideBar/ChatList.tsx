import { useChats } from 'hooks/useChats'
import { useFilterChats } from 'hooks/useFilterChats'
import ChatCard from '../ChatCard'
import { CreateNewChatCard } from './CreateNewChatCard'
import { SidebarSearch } from './SidebarSearch'

export function ChatList() {
    const { chats, handleSync, isSynced, handleCreateNewChat } = useChats()
    const { searchInput, setSearchInput, filteredChatList } = useFilterChats(chats)

    return (
        <>
            <SidebarSearch search={searchInput} setSearch={setSearchInput} />
            {/* //TODO: [POF-51] Синхронизация списка чатов, написана, но не используется, если есть время можно добавить и тестировать */}
            {/* <SyncButton handleSync={handleSync} isSynced={isSynced} /> */}
            <div className='flex flex-col w-full overflow-y-scroll'>
                {filteredChatList?.map((chat, index) => (
                    <ChatCard
                        data={chat}
                        isFirstConversation={index === 0}
                        key={chat.id}
                    />
                ))}

                {/* //TODO: [POF-52] Кнопка создания нового чата, не то чтобы подходит по дизайну */}
                <CreateNewChatCard handleCreateNewChat={handleCreateNewChat} />
            </div>
        </>
    )
}

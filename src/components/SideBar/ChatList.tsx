import { useChats } from 'hooks/useChats'
import { useFilterChats } from 'hooks/useFilterChats'
import { useHasMounted } from 'hooks/useHasMounted'
import ChatCard from '../ChatCard'
import { CreateNewChatCard } from './CreateNewChatCard'
import { SidebarSearch } from './SidebarSearch'
import { SyncButton } from './SyncButton'

export function ChatList() {
    const { chats, handleSync, isSynced, handleCreateNewChat } = useChats()
    const { searchInput, setSearchInput, filteredChatList } = useFilterChats(chats)

    return (
        <>
            <SidebarSearch search={searchInput} setSearch={setSearchInput} />
            {/* //TODO: Так и не понял есть ли ограничения по Api запросам, пока пусть лежит */}
            {/* <SyncButton handleSync={handleSync} isSynced={isSynced} /> */}
            <div className='flex flex-col w-full overflow-y-scroll'>
                {filteredChatList?.map((chat, index) => (
                    <ChatCard
                        data={chat}
                        isFirstConversation={index === 0}
                        key={chat.id}
                    />
                ))}
                {/* {!filteredChatList || */}
                {/* // (filteredChatList?.length === 0 && <CreateNewChatCard />)} */}
                <CreateNewChatCard handleCreateNewChat={handleCreateNewChat} />
            </div>
        </>
    )
}

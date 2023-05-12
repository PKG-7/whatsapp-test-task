import ConversationList from '../ConversationList'
import conversations from '../../data.json'
import { useState } from 'react'
import { SidebarMenu } from './SidebarMenu'
import { SidebarSearch } from './SidebarSearch'

export default function SideBar() {
    const [search, setSearch] = useState('')

    const conversationsList = conversations.conversation_list

    const filteredConversationsList =
        search.length > 0
            ? conversationsList.filter((conversationList) =>
                  conversationList.contactName.toLowerCase().includes(search),
              )
            : conversationsList

    return (
        <div
            className='flex flex-col w-[480px] h-full bg-[#202c33]'
            style={{ borderRight: '1px solid rgba(134,150,160,0.15)' }}
        >
            <SidebarMenu />
            <SidebarSearch search={search} setSearch={setSearch} />

            <div className='flex flex-col w-full overflow-y-scroll' id='conversation'>
                {filteredConversationsList.map((conversation, index) => {
                    return (
                        <ConversationList
                            key={index}
                            isFirstConversation={index == 0}
                            data={conversation}
                        />
                    )
                })}
            </div>
        </div>
    )
}

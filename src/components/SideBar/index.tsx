import Avatar from '../Avatar'
import ConversationList from '../ConversationList'
import conversations from '../../data.json'
import { useState } from 'react'
import {
    iconFilter,
    iconMenu,
    iconNewChat,
    iconSearch,
    iconStatus,
} from '../../../images/icons'

export default function SideBar() {
    const conversationsList = conversations.conversation_list
    const [search, setSearch] = useState('')
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
            <div className='flex items-center justify-between w-full px-4'>
                <div className='flex bg-[#202c33] w-full h-14 py-3 items-center'>
                    <div className='flex cursor-pointer'>
                        <Avatar width='w-10' height='w-10' image='avatar.jpg' />
                    </div>
                </div>
                <div className='flex gap-2'>
                    <div className='flex cursor-pointer w-10 h-10 items-center justify-center'>
                        {iconStatus}
                    </div>
                    <div className='flex cursor-pointer w-10 h-10 items-center justify-center'>
                        {iconNewChat}
                    </div>
                    <div className='flex cursor-pointer text-[#8696a0] w-10 h-10 items-center justify-center'>
                        {iconMenu}
                    </div>
                </div>
            </div>
            <div className='flex bg-[#111b21] w-full h-max px-3 py-2'>
                <div className='relative w-[95%] h-max'>
                    <div className='absolute text-[#AEBAC1] h-full w-9'>{iconSearch}</div>
                    <div className=''>
                        <input
                            className='w-[96%] h-9 rounded-lg bg-[#202c33] text-white text-sm px-10'
                            placeholder='Поиск или новый чат'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                <div className='flex w-[5%] h-full items-center justify-center'>
                    {iconFilter}
                </div>
            </div>
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

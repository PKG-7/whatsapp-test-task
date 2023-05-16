import { Dispatch, SetStateAction } from 'react'
import { ChatList } from './ChatList'
import { SidebarMenu } from './SidebarMenu'

export default function SideBar({
    setSelectedChatId,
}: {
    setSelectedChatId: Dispatch<SetStateAction<string | null>>
}) {
    return (
        <div
            className='flex flex-col w-[480px] h-full bg-[#202c33]'
            style={{ borderRight: '1px solid rgba(134,150,160,0.15)' }}
        >
            <SidebarMenu />
            <ChatList setSelectedChatId={setSelectedChatId} />
        </div>
    )
}

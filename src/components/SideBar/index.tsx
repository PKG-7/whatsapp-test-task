import { ChatList } from './ChatList'
import { SidebarMenu } from './SidebarMenu'

export function SideBar() {
    return (
        <div className='flex flex-col w-bar-width h-full bg-secondary border-r-[1px] border-accent'>
            <SidebarMenu />
            <ChatList />
        </div>
    )
}

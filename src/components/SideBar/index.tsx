import { useChatResize } from 'hooks/useChatResize'
import { ChatList } from './ChatList'
import { SidebarMenu } from './SidebarMenu'

export function SideBar() {
    const { sidebarWidth, ref, refRight } = useChatResize(270, 500)

    return (
        <div className='flex h-full bg-secondary border-r-[1px] border-accent'>
            <div style={{ width: `${sidebarWidth}px` }} ref={ref}>
                <SidebarMenu />
                <ChatList />
            </div>

            <div ref={refRight} className='bg-primary w-1 h-full cursor-col-resize' />
        </div>
    )
}

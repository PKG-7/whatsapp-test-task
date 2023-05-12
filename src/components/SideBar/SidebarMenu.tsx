import communities from '@/images/iconCommunities.svg'
import iconMenu from '@/images/iconMenu.svg'
import iconNewChat from '@/images/iconNewChat.svg'
import iconStatus from '@/images/iconStatus.svg'
import Avatar from '../Avatar'
import { Button } from '../Button/Button'

export function SidebarMenu() {
    return (
        <div className='flex items-center justify-between w-full px-4'>
            <div className='flex bg-[#202c33] w-full h-14 py-3 items-center'>
                <div className='flex cursor-pointer'>
                    <Avatar width='w-10' height='w-10' image='avatar.jpg' />
                </div>
            </div>

            <div className='flex gap-1'>
                <Button icon={communities} alt='communities' scale={28} />
                <Button icon={iconStatus} alt='status' scale={24} />
                <Button icon={iconNewChat} alt='new chat' scale={24} />
                <Button icon={iconMenu} alt='menu' scale={24} />
            </div>
        </div>
    )
}

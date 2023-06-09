import iconMenu from '@/images/iconMenu.svg'
import iconSearch from '@/images/iconSearch.svg'
import Avatar from '../Avatar'
import { Button } from '../Button'
import { doNothing } from '../SideBar/SidebarMenu'

//TODO: Avatar дефолтный и что с именем
export function ChatNavBar({
    selectedChatId,
    contactName,
    avatarUrl,
}: {
    selectedChatId: string
    contactName?: string | undefined | null
    avatarUrl?: string | undefined | null
}) {
    return (
        <div className='flex justify-between bg-primary w-full h-16 px-4 select-none z-10'>
            <div className='flex items-center gap-4 h-full cursor-pointer'>
                <Avatar scale={40} image={'NOO'} />

                <h1 className='text-white font-normal'>
                    {selectedChatId.slice(0, 11) || 'No name'}
                </h1>
            </div>

            <div className='flex items-center gap-2'>
                <Button
                    icon={iconSearch}
                    onClick={doNothing}
                    alt='icon Search'
                    scale={28}
                />
                <Button icon={iconMenu} onClick={doNothing} alt='icon Menu' scale={24} />
            </div>
        </div>
    )
}

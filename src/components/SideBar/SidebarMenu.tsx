import communities from '@/images/iconCommunities.svg'
import iconMenu from '@/images/iconMenu.svg'
import iconNewChat from '@/images/iconNewChat.svg'
import iconStatus from '@/images/iconStatus.svg'
import Avatar from '../Avatar'
import { Button } from '../Button'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

export const doNothing = () => {
    toast.success('Эта кнопка ничего не делает')
}

export function SidebarMenu() {
    const [warningSeen, setWarningSeen] = useState(false)

    const router = useRouter()
    const logOut = () => {
        if (!warningSeen) {
            toast.error('Эта тайная кнопка выхода, не жмите ее еще раз')
            setWarningSeen(true)
            return
        } else {
            localStorage.removeItem('userSecrets')
            router.reload()
        }
    }

    return (
        <div className='flex items-center h-14 justify-between w-full px-4 bg-primary'>
            <button onClick={() => logOut()} className='flex items-center'>
                <Avatar scale={40} image='avatar.jpg' />
            </button>

            <div className='flex gap-1'>
                <Button
                    icon={communities}
                    onClick={doNothing}
                    alt='communities'
                    scale={28}
                />
                <Button icon={iconStatus} onClick={doNothing} alt='status' scale={24} />
                <Button
                    icon={iconNewChat}
                    onClick={doNothing}
                    alt='new chat'
                    scale={24}
                />
                {/* Временно тут спрячу выход */}
                <Button icon={iconMenu} onClick={doNothing} alt='menu' scale={24} />
            </div>
        </div>
    )
}

import defaultAvatar from '@/images/iconAvatarDefault.svg'
import iconChatMenu from '@/images/iconChatMenu.svg'
import { ChatContext } from 'context/ChatContext'
import { iChat } from 'entities/chat'
import Image from 'next/image'
import { useContext } from 'react'
import Avatar from '../Avatar'

//TODO: Lastmessage, avatar, last time
interface ChatCardProps {
    isFirstConversation?: boolean
    data: iChat
}

export default function ChatCard({ isFirstConversation, data }: ChatCardProps) {
    const { setSelectedChatId } = useContext(ChatContext)

    // if(isFirstConversation) return <div>asd</div>

    return (
        <div
            className='flex items-center w-full h h-[4rem] bg-secondary pl-3 pr-4 hover:bg-accent cursor-pointer'
            onClick={() => setSelectedChatId(data.id)}
        >
            <div className='flex w-[4.8rem]'>
                <Avatar scale={48} image={defaultAvatar} />
            </div>

            <div className='flex flex-col w-full border-b border-primary'>
                <div className='flex py-2 w12'>
                    <div className='flex flex-col w-full h-full '>
                        <span className='overflow-y-hidden text-ellipsis text-white text-base'>
                            {data.id.slice(0, 11)}
                        </span>

                        <span className='overflow-y-hidden text-ellipsis text-[#aebac1] text-sm'>
                            {'Last message'}
                        </span>
                    </div>

                    <div className='flex flex-col w-auto text-[#aebac1]'>
                        <h1 className='text-xs'>{'25:25'}</h1>

                        <span className='flex cursor-pointer h-full items-center rotate-90 justify-center'>
                            <Image src={iconChatMenu} alt='iconChatMenu' />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

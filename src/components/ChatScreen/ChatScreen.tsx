import iconEmoji from '@/images/iconEmoji.svg'
import iconFile from '@/images/iconFile.svg'
import iconMenu from '@/images/iconMenu.svg'
import iconSearch from '@/images/iconSearch.svg'
import iconVoiceMessage from '@/images/iconVoiceMessage.svg'
import { KeyboardEvent, useContext, useEffect, useState } from 'react'
import { ConversationContext } from '../../context/ConversationContext'
import Avatar from '../Avatar'
import { Button } from '../Button/Button'
import MessageBalloon from '../MessageBalloon'
import { Placeholder } from '../Placeholder/Placeholder'

export function ChatScreen() {
    const { conversation, message, setMessage } = useContext(ConversationContext)
    const { contactName, image, messageHistory } = conversation
    const [messageSend, setMessageSend] = useState('')

    useEffect(() => {
        setMessage(messageHistory)
    }, [conversation])

    function changeHandler(evt: KeyboardEvent<HTMLInputElement>) {
        const { key } = evt

        if (key === 'Enter') {
            const teste = { me: true, message: messageSend }
            setMessage([...message, teste])
            setMessageSend('')
        }
    }

    if (!conversation.contactName) return <Placeholder />

    return (
        <div className='flex w-full bg-[#222E35]'>
            <div className='flex flex-col w-full'>
                <div className='flex justify-between w-full px-4'>
                    <div className='flex justify-between bg-[#202c33] w-full h-14'>
                        <div className='flex items-center gap-4 h-full cursor-pointer'>
                            <Avatar width='w-10' height='h-10' image={image} />
                            <h1 className='text-white font-normal'>{contactName}</h1>
                        </div>

                        <div className='flex items-center gap-2'>
                            <Button icon={iconSearch} alt='icon Search' scale={28} />
                            <Button icon={iconMenu} alt='icon Menu' scale={24} />
                        </div>
                    </div>
                </div>

                <div
                    className='flex flex-col w-full h-full px-24 py-6 overflow-y-auto'
                    style={{ backgroundImage: "url('/assets/images/background.jpg')" }}
                >
                    {message.map((messageConversation, index) => {
                        const { me, message } = messageConversation

                        return <MessageBalloon key={index} me={me} message={message} />
                    })}
                </div>

                <footer className='flex items-center gap-1 bg-[#202c33] w-full h-16 py-3 px-1 text-[#8696a0]'>
                    <Button icon={iconEmoji} alt='icon Emoji' />
                    <Button icon={iconFile} alt='icon File' />

                    <div className='flex w-[90%] h-12 ml-3'>
                        <input
                            type={'text'}
                            className='bg-[#2a3942] rounded-lg w-full px-3 py-3 text-white'
                            placeholder='Введите сообщение'
                            onKeyDown={(e) => changeHandler(e)}
                            onChange={(e) => setMessageSend(e.target.value)}
                            value={messageSend}
                        />
                    </div>

                    <Button icon={iconVoiceMessage} alt='icon Voice Message' />
                </footer>
            </div>
        </div>
    )
}

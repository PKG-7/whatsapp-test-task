import { KeyboardEvent, useContext, useEffect, useState } from 'react'
import { ConversationContext } from '../../context/ConversationContext'
import Avatar from '../Avatar'
import MessageBalloon from '../MessageBalloon'
import {
    iconEmoji,
    iconFile,
    iconMenu,
    iconSearch,
    iconVoiceMessage,
} from '../../../images/icons'

export default function ConversationDetails() {
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

    return (
        <div className='flex flex-col w-full'>
            <div className='flex justify-between w-full px-4'>
                <div className='flex justify-between bg-[#202c33] w-full h-14'>
                    <div className='flex items-center gap-4 h-full'>
                        <Avatar width='w-10' height='h-10' image={image} />
                        <h1 className='text-white font-normal'>{contactName}</h1>
                    </div>
                    <div className='flex items-center text-[#8696a0] gap-2'>
                        {iconSearch}
                        {iconMenu}
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
            <footer className='flex items-center bg-[#202c33] w-full h-16 py-3 text-[#8696a0]'>
                <div className='flex py-1 pl-5 gap-3'>
                    {iconEmoji}
                    {iconFile}
                </div>
                <div className='flex w-[85%] h-12 ml-3'>
                    <input
                        type={'text'}
                        className='bg-[#2a3942] rounded-lg w-full px-3 py-3 text-white'
                        placeholder='Введите сообщение'
                        onKeyDown={(evt) => changeHandler(evt)}
                        onChange={(evt) => setMessageSend(evt.target.value)}
                        value={messageSend}
                    />
                </div>
                <div className='flex justify-center items-center w-[5%] h-12'>
                    {iconVoiceMessage}
                </div>
            </footer>
        </div>
    )
}

import { iMessageStored } from 'entities/messages/storedMessages'
import { useEffect, useState } from 'react'

export default function MessageBalloon({
    message,
    isCurrentUserMessage,
}: {
    message: iMessageStored
    isCurrentUserMessage: boolean
}) {
    const flexAlignItems = isCurrentUserMessage ? 'items-end' : 'items-start'
    const backgroundColor = isCurrentUserMessage ? 'bg-message-user' : 'bg-primary'
    const borderRounded = isCurrentUserMessage ? 'rounded-tr-none' : 'rounded-tl-none'

    //TODO: Flex тестировать
    return (
        <div className={`flex flex-col ${flexAlignItems} w-full h-max`}>
            <div
                className={`flex  min-w-[5%] gap-2 max-w-[65%] h-max ${backgroundColor} p-2 text-white rounded-lg ${borderRounded} mb-3`}
            >
                <div className='flex flex-col w-full break-words'>
                    <span>{message.text}</span>
                </div>
                <div className='flex items-end h-full text-[hsla(0,0%,100%,0.6)] text-xs mt-1'>
                    <span>{message.time}</span>
                </div>
            </div>
        </div>
    )
}

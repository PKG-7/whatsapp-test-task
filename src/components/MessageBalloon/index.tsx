import { iMessage } from 'entities/message'
import { useEffect, useState } from 'react'

export default function MessageBalloon({
    message,
    me,
}: {
    message: iMessage
    me: boolean
}) {
    const [time, setTime] = useState('')

    const flexAlignItems = me ? 'items-end' : 'items-start'
    const backgroundColor = me ? 'bg-[#005c4b]' : 'bg-[#202c33]'
    const borderRounded = me ? 'rounded-tr-none' : 'rounded-tl-none'

    //TODO: што
    useEffect(() => {
        setTime(refreshTime())
    }, [])

    function refreshTime() {
        const date = new Date(message.timestamp)
        return date.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
        })
    }

    return (
        <div className={`flex flex-col ${flexAlignItems} w-full h-max`}>
            <div
                className={`flex  min-w-[5%] gap-2 max-w-[65%] h-max ${backgroundColor} p-2 text-white rounded-lg ${borderRounded} mb-3`}
            >
                <div className='flex flex-col w-full break-words'>
                    <span>{message.textMessage}</span>
                </div>
                <div className='flex items-end h-full text-[hsla(0,0%,100%,0.6)] text-xs mt-1'>
                    <span>{time}</span>
                </div>
            </div>
        </div>
    )
}

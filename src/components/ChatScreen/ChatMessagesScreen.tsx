import { useScroll } from 'hooks/useScroll'
import { useRef } from 'react'
import MessageBalloon from '../MessageBalloon'
import { iMessageStored } from 'entities/messages/storedMessages'

export function MessagesScreen({ messages }: { messages: [] | iMessageStored[] }) {
    const chatContainerRef = useRef<HTMLDivElement>(null)
    useScroll(messages, chatContainerRef)

    return (
        <div ref={chatContainerRef} className='w-full h-full overflow-y-auto'>
            <div className='flex flex-col px-[3vw] min-h-full py-[1vh] justify-end items-center bg-chat-background'>
                {messages?.map((message: iMessageStored) => {
                    const isCurrentUserMessage = message.type === 'outgoing'
                    return (
                        <MessageBalloon
                            key={message.idMessage}
                            isCurrentUserMessage={isCurrentUserMessage}
                            message={message}
                        />
                    )
                })}
                {!messages && (
                    <div className='text-gray-400 select-none py-2 px-4 rounded-xl text-center max-w-xs bg-secondary'>
                        ✉ Напишите свое первое сообщение!
                    </div>
                )}
            </div>
        </div>
    )
}

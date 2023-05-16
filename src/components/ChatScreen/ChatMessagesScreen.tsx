import { iMessage } from 'entities/message'
import { useScroll } from 'hooks/useScroll'
import { useRef } from 'react'
import MessageBalloon from '../MessageBalloon'

export function ChatMessagesScreen({ messages }: { messages: iMessage[] }) {
    const chatContainerRef = useRef<HTMLDivElement>(null)
    useScroll(messages, chatContainerRef)

    //TODO: Handle
    // if (!messages) return <div>No messages message</div>
    return (
        <div
            className='flex flex-col w-full h-full justify-end px-24 py-6 overflow-y-auto'
            ref={chatContainerRef}
            style={{ backgroundImage: "url('/assets/images/background.jpg')" }}
        >
            {messages
                .slice()
                .reverse()
                .map((message: iMessage) => {
                    const me = message.type === 'outgoing'
                    return (
                        <MessageBalloon
                            key={message.idMessage}
                            me={me}
                            message={message}
                        />
                    )
                })}
        </div>
    )
}

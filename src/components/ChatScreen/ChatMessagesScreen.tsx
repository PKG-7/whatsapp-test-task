import { useScroll } from 'hooks/useScroll'
import { useRef } from 'react'
import MessageBalloon from '../MessageBalloon'
import { iMessageStored } from 'entities/messages/storedMessages'

export function MessagesScreen({ messages }: { messages: iMessageStored[] }) {
    const chatContainerRef = useRef<HTMLDivElement>(null)
    useScroll(messages, chatContainerRef)
    console.log(messages)

    //TODO: Handle
    // if (!messages) return <div>No messages message</div>
    return (
        <div
            className='flex flex-col w-full h-full justify-end px-24 py-6 overflow-y-auto bg-chat-background'
            // ref={chatContainerRef}
        >
            {messages
                // .slice()
                // .reverse()
                // .filter((message) => message.chatId === selectedChatId)
                .map((message: iMessageStored) => {
                    const isCurrentUserMessage = message.type === 'outgoing'
                    return (
                        <MessageBalloon
                            key={message.idMessage}
                            isCurrentUserMessage={isCurrentUserMessage}
                            message={message}
                        />
                    )
                })}
        </div>
    )
}

import { iMessageStored } from 'entities/messages/storedMessages'
import { RefObject, useEffect } from 'react'

export const useScroll = (
    messages: [] | iMessageStored[],
    chatContainerRef: RefObject<HTMLDivElement>,
) => {
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
        }
    }, [messages?.length, chatContainerRef])
}

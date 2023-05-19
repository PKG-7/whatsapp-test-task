import { iMessageStored } from 'entities/messages/storedMessages'
import { RefObject, useEffect } from 'react'

export const useScroll = (
    messageHistory: iMessageStored[],
    chatContainerRef: RefObject<HTMLDivElement>,
) => {
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
        }
    }, [messageHistory.length, chatContainerRef])
}

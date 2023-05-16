import { iMessage } from 'entities/message'
import { RefObject, useEffect } from 'react'

export const useScroll = (
    messageHistory: iMessage[],
    chatContainerRef: RefObject<HTMLDivElement>,
) => {
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
        }
    }, [messageHistory.length])
}

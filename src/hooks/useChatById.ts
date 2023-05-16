import { Api } from '@/functions/Api'
import { useMutation } from '@tanstack/react-query'
import { createNewTextMessage, iMessage } from 'entities/message'
import { iUserSecrets } from 'entities/userSecrets'
import { useState } from 'react'
import { useLocalStorage } from './useLocalStorage'

export const useChatById = (chatId: string) => {
    const [messages, setMessages] = useState<iMessage[]>([])

    const [secrets] = useLocalStorage<iUserSecrets | null>('userSecrets', null)

    const [loading, setLoading] = useState(true)

    const messageInputMutation = useMutation(
        async (userInput: string) => {
            if (secrets) {
                const result = await Api.sendMessage(userInput, chatId, secrets)
                if (result) {
                    console.log(result.idMessage)

                    const newMessage = createNewTextMessage(
                        userInput,
                        result.idMessage,
                        chatId,
                    )
                    setMessages((prev) => [...prev, newMessage])

                    // queryClient
                    console.log('mutated')
                }
            } else console.log('WTFFF!!!!')
        },
        {
            onSuccess: () => {
                console.log('success')
                // queryClient
                //     .invalidateQueries(['chat'])
                // .then(() => setReRender((prev) => prev + 1))
                console.log('invalidated')
                // setReRender((prev) => !prev)
            },
            onError: () => console.log('error'),
        },
    )

    const handleReceiveMessage = () => {
        if (secrets) {
            Api.getMessage(secrets).then((message) => {
                console.log(message)
            })
        }
    }
    // const { data: messageHistory, isLoading, error } = useChatById(selectedChat.id)

    // const {
    //     data: messageHistory,
    //     isLoading,
    //     error,
    // } = useQuery(['chat'], () => getChatDataById(selectedChat.id))

    // console.log(messageHistory)
    // const queryClient = useQueryClient()

    // useEffect(() => {}, [])

    return { messages, setMessages, loading, messageInputMutation }
}

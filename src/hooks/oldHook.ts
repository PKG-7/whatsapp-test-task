export const zxvzxvzxvzx = 1

//     //TODO: переписать
// const useCHAD = (chatId: string) => {
//     const [messages, setMessages] = useState<iMessage[]>([])
//     const [loading, setLoading] = useState(true)

//     useEffect(() => {
//         const storedMessages = localStorage.getItem('userMessages')
//         if (storedMessages) {
//             setMessages(JSON.parse(storedMessages))
//         }

//         setLoading(false)
//     }, [])

//     const messageInputMutation = useMutation(
//         async (userInput: string) => {
//             if (secrets) {
//                 const result = await Api.sendMessage(userInput, chatId, secrets)
//                 if (result) {
//                     console.log(result.idMessage)

//                     const newMessage = createNewTextMessage(
//                         userInput,
//                         result.idMessage,
//                         chatId,
//                     )
//                     setMessages((prev) => [...prev, newMessage])

//                     // queryClient
//                     console.log('mutated')
//                 }
//             } else console.log('WTFFF!!!!')
//         },
//         {
//             onSuccess: () => {
//                 console.log('success')
//                 // queryClient
//                 //     .invalidateQueries(['chat'])
//                 // .then(() => setReRender((prev) => prev + 1))
//                 console.log('invalidated')
//                 // setReRender((prev) => !prev)
//             },
//             onError: () => console.log('error'),
//         },
//     )

//     const handleReceiveMessage = () => {
//         if (secrets) {
//             Api.getMessage(secrets).then((message) => {
//                 console.log(message)
//             })
//         }
//     }
//     // const { data: messageHistory, isLoading, error } = useChatById(selectedChat.id)

//     // const {
//     //     data: messageHistory,
//     //     isLoading,
//     //     error,
//     // } = useQuery(['chat'], () => getChatDataById(selectedChat.id))

//     // console.log(messageHistory)
//     // const queryClient = useQueryClient()

//     // useEffect(() => {}, [])

//     return { messages, setMessages, loading, messageInputMutation }
// }

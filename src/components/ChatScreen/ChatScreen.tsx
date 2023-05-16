import { useChatById } from 'hooks/useChatById'
import { ChatMessagesScreen } from './ChatMessagesScreen'
import { ChatNavBar } from './ChatNavBar'
import { InputField } from './InputField'

export function ChatScreen({ selectedChatId }: { selectedChatId: string }) {
    const { messages, messageInputMutation } = useChatById(selectedChatId)

    return (
        <div className='flex w-full bg-[#222E35]'>
            <div className='flex flex-col w-full'>
                <ChatNavBar />

                <ChatMessagesScreen messages={messages} />

                <InputField messageInputMutation={messageInputMutation} />
            </div>
        </div>
    )
}

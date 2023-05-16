import { useChatById } from 'hooks/useChatById'
import { ChatMessagesScreen } from './ChatMessagesScreen'
import { ChatNavBar } from './ChatNavBar'
import { InputField } from './InputField'

export function ChatScreen({ selectedChatId }: { selectedChatId: string }) {
    const { messages, updateMessages } = useChatById(selectedChatId)

    return (
        <div className='flex w-full bg-[#222E35]'>
            <div className='flex flex-col w-full'>
                <ChatNavBar selectedChatId={selectedChatId} />

                <ChatMessagesScreen messages={messages} />

                <InputField updateMessages={updateMessages} />
            </div>
        </div>
    )
}

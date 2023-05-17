import { useChatById } from 'hooks/chatMessages/useChatById'
import { useNotifications } from 'hooks/chatMessages/useNotifications'
import { MessagesScreen } from './ChatMessagesScreen'
import { ChatNavBar } from './ChatNavBar'
import { InputField } from './InputField'

export function ChatScreen({ selectedChatId }: { selectedChatId: string }) {
    const { popNotification, newNotification } = useNotifications(selectedChatId)

    const { messages, updateMessages } = useChatById(
        selectedChatId,
        newNotification,
        popNotification,
    )

    return (
        <div className='flex w-full bg-[#222E35]'>
            <div className='flex flex-col w-full'>
                <ChatNavBar selectedChatId={selectedChatId} />
                <MessagesScreen messages={messages} />
                <InputField updateMessages={updateMessages} />
            </div>
        </div>
    )
}

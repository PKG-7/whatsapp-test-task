import { useNotifications } from 'hooks/chatMessages/useNotifications'
import { useSelectedChatMessages } from 'hooks/chatMessages/useSelectedChatMessages'
import { useStoredChats } from 'hooks/chatMessages/useStorageMessages'
import { useSecrets } from 'hooks/useSecrets'
import { MessagesScreen } from './ChatMessagesScreen'
import { ChatNavBar } from './ChatNavBar'
import { InputField } from './InputField'

export function ChatScreen({ selectedChatId }: { selectedChatId: string }) {
    const { secrets } = useSecrets()
    const { newNotification, popNotification } = useNotifications(secrets)

    const { storedChats, handleSendTextMessage } = useStoredChats(
        newNotification,
        popNotification,
        secrets,
    )

    const { messages } = useSelectedChatMessages(storedChats, selectedChatId)

    return (
        <div className='flex w-full h-full bg-primary'>
            <div className='flex flex-col w-full '>
                <ChatNavBar selectedChatId={selectedChatId} />
                <MessagesScreen messages={messages} />
                <InputField
                    selectedChatId={selectedChatId}
                    handleSendTextMessage={handleSendTextMessage}
                />
            </div>
        </div>
    )
}

import { ChatScreen } from '@/components/ChatScreen/ChatScreen'
import { Placeholder } from '@/components/Placeholder'
import { SideBar } from '@/components/SideBar'
import MainLayout from 'Layouts/MainLayout'

import { ChatContext } from 'context/ChatContext'
import { useContext } from 'react'

export default function Home() {
    const { selectedChatId } = useContext(ChatContext)

    return (
        <MainLayout>
            <SideBar />

            {selectedChatId ? (
                <ChatScreen selectedChatId={selectedChatId} />
            ) : (
                <Placeholder />
            )}
        </MainLayout>
    )
}

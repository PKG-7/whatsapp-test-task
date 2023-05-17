import { Placeholder } from '@/components/Placeholder'
import MainLayout from 'Layouts/MainLayout'
import { ChatContext } from 'context/ChatContext'
import { useContext } from 'react'
import { ChatScreen } from '../components/ChatScreen/ChatScreen'
import SideBar from '../components/SideBar'

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

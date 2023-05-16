import { Placeholder } from '@/components/Placeholder'
import { useState } from 'react'
import { ChatScreen } from '../components/ChatScreen/ChatScreen'
import SideBar from '../components/SideBar'

export default function Home() {
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null)

    //TODO: Modal?
    // <LoginScreen setSecrets={setSecrets} />

    return (
        <div className='flex w-full h-screen'>
            <SideBar setSelectedChatId={setSelectedChatId} />

            {selectedChatId ? (
                <ChatScreen selectedChatId={selectedChatId} />
            ) : (
                <Placeholder />
            )}
        </div>
    )
}

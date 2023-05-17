import { LoginScreen } from '@/components/LoginScreen'
import { Placeholder } from '@/components/Placeholder'
import { useHasMounted } from 'hooks/useHasMounted'
import { useSecrets } from 'hooks/useSecrets'
import { useState } from 'react'
import { ChatScreen } from '../components/ChatScreen/ChatScreen'
import SideBar from '../components/SideBar'

export default function Home() {
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null)
    const { secrets, setSecrets } = useSecrets()

    //TODO: Сделать Auth Page на server components с Next auth
    const hasMounted = useHasMounted()
    if (!hasMounted) {
        return <div>💀💀💀Skeleton loading</div>
    }

    if (!secrets) return <LoginScreen setSecrets={setSecrets} />

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

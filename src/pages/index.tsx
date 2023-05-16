import { Placeholder } from '@/components/Placeholder'
import { useState } from 'react'
import { ChatScreen } from '../components/ChatScreen/ChatScreen'
import SideBar from '../components/SideBar'
import { useLocalStorage } from 'hooks/useLocalStorage'
import { iUserSecrets } from 'entities/userSecrets'
import { useHasMounted } from 'hooks/useHasMounted'
import { LoginScreen } from '@/components/LoginScreen'

export default function Home() {
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null)

    const [secrets, setSecrets] = useLocalStorage<iUserSecrets | null>(
        'userSecrets',
        null,
    )

    //TODO: Сделать Modal
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

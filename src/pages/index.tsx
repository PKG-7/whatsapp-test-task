import { ChatScreen } from '../components/ChatScreen/ChatScreen'
import SideBar from '../components/SideBar'

export default function Home() {
    return (
        <div className='flex w-full h-screen'>
            <SideBar />
            <ChatScreen />
        </div>
    )
}

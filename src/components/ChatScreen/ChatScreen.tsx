import { useContext } from 'react'
import { ConversationContext } from '../../context/ConversationContext'
import ConversationDetails from '../ConversationDetails'
import { Placeholder } from '../Placeholder/Placeholder'

export function ChatScreen() {
    const { conversation } = useContext(ConversationContext)

    if (!conversation.contactName) return <Placeholder />

    return (
        <div className='flex w-full bg-[#222E35]'>
            <ConversationDetails />
        </div>
    )
}

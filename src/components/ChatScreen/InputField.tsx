import iconEmoji from '@/images/iconEmoji.svg'
import iconFile from '@/images/iconFile.svg'
import iconVoiceMessage from '@/images/iconVoiceMessage.svg'
import { KeyboardEvent, useState } from 'react'
import { Button } from '../Button'

export function InputField({
    selectedChatId,
    handleSendTextMessage,
}: {
    selectedChatId: string
    handleSendTextMessage: (chatId: string, userInput: string) => Promise<void>
}) {
    const [userInput, setUserInput] = useState<string>('')

    const handleSendMessage = (e: KeyboardEvent<HTMLInputElement>) => {
        const { key } = e

        if (key === 'Enter') {
            if (userInput.trim() !== '') {
                handleSendTextMessage(selectedChatId, userInput)
            }
            setUserInput('')
        }
    }

    return (
        <footer className='flex items-center gap-1 bg-primary w-full h-16 py-3 px-1 text-[#8696a0] z-10'>
            <Button icon={iconEmoji} alt='icon Emoji' />
            <Button icon={iconFile} alt='icon File' />

            <div className='flex w-[90%] h-12 ml-3'>
                <input
                    type={'text'}
                    className='bg-accent rounded-lg w-full px-3 py-3 text-white'
                    placeholder='Введите сообщение'
                    onKeyDown={(e) => handleSendMessage(e)}
                    onChange={(e) => setUserInput(e.target.value)}
                    value={userInput}
                />
            </div>

            <Button icon={iconVoiceMessage} alt='icon Voice Message' />
        </footer>
    )
}

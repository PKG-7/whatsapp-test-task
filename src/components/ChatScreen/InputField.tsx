import iconEmoji from '@/images/iconEmoji.svg'
import iconFile from '@/images/iconFile.svg'
import iconVoiceMessage from '@/images/iconVoiceMessage.svg'
import { UseMutationResult } from '@tanstack/react-query'
import { KeyboardEvent, useState } from 'react'
import { Button } from '../Button'

export function InputField({
    messageInputMutation,
}: {
    messageInputMutation: UseMutationResult<void, unknown, string, unknown>
}) {
    const [userInput, setUserInput] = useState<string>('')

    const handleSendMessage = (e: KeyboardEvent<HTMLInputElement>) => {
        const { key } = e

        if (key === 'Enter') {
            setUserInput('')
            messageInputMutation.mutate(userInput)
        }
    }

    return (
        <footer className='flex items-center gap-1 bg-[#202c33] w-full h-16 py-3 px-1 text-[#8696a0]'>
            <Button icon={iconEmoji} alt='icon Emoji' />
            <Button icon={iconFile} alt='icon File' />

            <div className='flex w-[90%] h-12 ml-3'>
                <input
                    type={'text'}
                    className='bg-[#2a3942] rounded-lg w-full px-3 py-3 text-white'
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

import { useChats } from 'hooks/useChats'
import { FormEvent, useState } from 'react'
import { createNewChat, iChat } from '../../entities/chat'

export function CreateNewChatCard() {
    const [isClicked, setisClicked] = useState(false)
    const [inputPhone, setInputPhone] = useState<number>()
    const { setChats, handleSync } = useChats()

    const handleCreateNewChat = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (inputPhone) {
            //TODO: VALidate number
            //TODO: Add postfix validation here
            const idPostfix = '@c.us'
            const id = `${inputPhone}${idPostfix}`
            const newChat: iChat = createNewChat(id)

            // Api.createNewChat(newChat) //TODO: add new chat to db
            setChats((prev) => [...(prev || []), newChat])
            handleSync()

            console.log(newChat)
        }
    }

    return (
        <button
            onClick={() => setisClicked(true)}
            className='flex items-center justify-center w-full h-[4rem] bg-[#111B21] hover:bg-[#2A3942] '
        >
            {!isClicked ? (
                <div className='text-white  flex flex-col animate-pulse'>
                    <div className='text-sm'>🌘 У вас нет чатов</div>
                    <div className='flex gap-1 font-bold'>
                        <span>+</span>
                        <span>Создать новый чат</span>
                    </div>
                </div>
            ) : (
                <form
                    className='flex gap-2 text-white'
                    onSubmit={(e) => handleCreateNewChat(e)}
                >
                    <input
                        value={inputPhone}
                        onChange={(e) => setInputPhone(Number(e.target.value))}
                        className='bg-gray-700 rounded-xl px-2'
                    />
                    <button
                        type='submit'
                        className='bg-green-600 rounded-xl p-2 font-bold text-white'
                    >
                        Добавить
                    </button>
                </form>
            )}
        </button>
    )
}

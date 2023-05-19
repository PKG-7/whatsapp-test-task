import { ChangeEvent, FormEvent, useState } from 'react'

export function CreateNewChatCard({
    handleCreateNewChat,
}: {
    handleCreateNewChat: (e: FormEvent<HTMLFormElement>, phoneInput: number) => void
}) {
    const [isClicked, setisClicked] = useState(false)
    const [inputPhone, setInputPhone] = useState<string>('')

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        if (inputPhone) {
            handleCreateNewChat(e, Number(inputPhone))
            setInputPhone('')
            setisClicked(false)
        }
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInputPhone(e.target.value)
    }

    if (!isClicked)
        return (
            <div
                onClick={() => setisClicked(true)}
                className='flex items-center justify-center w-full h-[4rem] bg-secondary hover:bg-accent  cursor-pointer '
            >
                <div className='text-white hover:bg-accent flex flex-col animate-pulse'>
                    {/* <div className='text-sm'>🌘 У вас нет чатов</div> */}
                    <div className='flex gap-1 font-bold'>
                        <span>💌 Создать новый чат</span>
                    </div>
                </div>
            </div>
        )

    return (
        <div className='flex items-center justify-center w-full h-[4rem] bg-secondary  cursor-pointer '>
            <form className=' flex gap-2 text-white' onSubmit={(e) => onSubmit(e)}>
                <input
                    placeholder='79991112233'
                    value={inputPhone}
                    onChange={handleInput}
                    className='bg-gray-700 rounded-xl px-2'
                />
                <button
                    type='submit'
                    className='bg-green-600 rounded-xl p-2 font-bold text-white'
                >
                    Добавить
                </button>
            </form>
        </div>
    )
}

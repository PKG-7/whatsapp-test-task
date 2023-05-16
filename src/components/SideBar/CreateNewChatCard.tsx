import { FormEvent, useState } from 'react'

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
        }
    }

    return (
        <div
            onClick={() => setisClicked(true)}
            className='flex items-center justify-center w-full h-[4rem] bg-[#111B21] hover:bg-[#2A3942] cursor-pointer '
        >
            {!isClicked ? (
                <div className='text-white  flex flex-col animate-pulse'>
                    {/* <div className='text-sm'>🌘 У вас нет чатов</div> */}
                    <div className='flex gap-1 font-bold'>
                        {/* <span>+</span> */}
                        <span>💌 Создать новый чат</span>
                    </div>
                </div>
            ) : (
                <form className='flex gap-2 text-white' onSubmit={(e) => onSubmit(e)}>
                    <input
                        value={inputPhone}
                        onChange={(e) => setInputPhone(e.target.value)}
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
        </div>
    )
}

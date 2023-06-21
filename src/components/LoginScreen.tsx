import { createNewUserSecrets, iUserSecrets } from 'entities/userSecrets'
import Image from 'next/image'
import { useState } from 'react'
import headerLogo from '@/images/logo/headerLogo.png'
import { Toast, toast } from 'react-hot-toast'
import Link from 'next/link'

type LoginScreenProps = {
    setSecrets: (
        value: iUserSecrets | ((val: iUserSecrets | null) => iUserSecrets | null) | null,
    ) => void
}

export function LoginScreen({ setSecrets }: LoginScreenProps) {
    const [idInstance, setIdInstance] = useState('')
    const [apiKey, setApiKey] = useState('')

    const handleSaveSecrets = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (!idInstance || !apiKey) {
            toast.error('Введите данные для входа')
            return
        }

        if (idInstance.length < 9 || apiKey.length < 9) {
            toast.error('🛡 Хорошая попытка, Killnet')
            return
        }

        if (idInstance && apiKey) {
            const userSecrets = createNewUserSecrets(idInstance, apiKey)
            setSecrets(userSecrets)
        }
    }

    // Fake secrets
    const fakeSecrets = () => {
        toast((t) => fakeSecretsMessage(t), { duration: 100000 })

        const userSecrets = createNewUserSecrets('fakeInstance', 'fakeApiKey')
        setSecrets(userSecrets)
    }

    return (
        <div className='flex flex-col bg-gradient-to-t from-black to-indigo-950-900 via-slate-900 items-center justify-center gap-4 h-screen font-bold'>
            <div className='bg-black p-20 rounded-xl'>
                <div className='flex gap-2'>
                    <div className='flex items-end'>
                        <Image src={headerLogo} height={80} width={80} alt='Logo' />
                    </div>
                    <div className=' text-white text-8xl font-extrabold'>Login</div>
                </div>
                <form className='flex flex-col gap-3 text-5xl pt-8 '>
                    <input
                        className='rounded-xl pl-4 py-2'
                        type='text'
                        placeholder='idINstance'
                        value={idInstance}
                        onChange={(e) => setIdInstance(e.target.value)}
                    />
                    <input
                        className='rounded-xl pl-4 py-2'
                        type='text'
                        placeholder='ApiTokenInstance'
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                    />
                    <div className=' flex justify-end gap-6 '>
                        <button
                            className=' hover:scale-105 text-4xl transition-all hover:opacity-90 bg-gradient-to-b from-[#87c13a] to-[#388313] text-white py-4 px-8 rounded-xl font-bold mt-4'
                            onClick={(e) => handleSaveSecrets(e)}
                        >
                            Войти
                        </button>

                        <button
                            className=' hover:scale-[1.03] text-4xl transition-all flex-1 bg-gradient-to-b from-[#c1b43a] to-[#ad5f15] text-white py-4 px-8 rounded-xl font-bold mt-4'
                            onClick={() => fakeSecrets()}
                        >
                            Я просто посмотреть
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export function fakeSecretsMessage(t: Toast) {
    return (
        <div className='flex flex-col text-center gap-2'>
            <b>У вас не будет возможности отправлять сообщения.</b>
            <div>Просто напишите мне в телеграм, я дам вам ключи для тестирования</div>
            <div className='flex gap-2'>
                <button
                    className='hover:scale-105 text-xl transition-all bg-[#b38627] text-white p-2 rounded-xl font-bold mt-4'
                    onClick={() => toast.dismiss(t.id)}
                >
                    Я понял
                </button>
                <Link
                    href='https://t.me/pavel_xt'
                    rel='noopener noreferrer'
                    target='_blank'
                >
                    <button
                        className='items-center rounded-lg bg-[#3b5998] flex-1 p-2 mt-4 font-bold text-center text-white hover:scale-105 transition-all'
                        onClick={() => toast.dismiss(t.id)}
                    >
                        Telegram
                    </button>
                </Link>
            </div>
        </div>
    )
}

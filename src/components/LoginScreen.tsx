import { createNewUserSecrets, iUserSecrets } from 'entities/userSecrets'
import Image from 'next/image'
import { useState } from 'react'
import headerLogo from '@/images/logo/headerLogo.png'

type LoginScreenProps = {
    setSecrets: (
        value: iUserSecrets | ((val: iUserSecrets | null) => iUserSecrets | null) | null,
    ) => void
}

export function LoginScreen({ setSecrets }: LoginScreenProps) {
    const [idInstance, setIdInstance] = useState('')
    const [apiKey, setApiKey] = useState('')

    const handleSaveSecrets = () => {
        if (idInstance && apiKey) {
            const userSecrets = createNewUserSecrets(idInstance, apiKey)
            setSecrets(userSecrets)
        } else {
            console.log('WTF BRO') //TODO:  handle
        }
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
                <form
                    className='flex flex-col gap-3 text-5xl pt-8 '
                    onSubmit={handleSaveSecrets}
                >
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
                    <div className=' flex justify-end '>
                        <button
                            className=' hover:scale-105 text-4xl  bg-gradient-to-b from-[#87c13a] to-[#388313] text-white py-4 px-8 rounded-xl font-bold mt-4'
                            type='submit'
                        >
                            Войти
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

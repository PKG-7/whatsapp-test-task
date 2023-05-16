import { createNewUserSecrets, iUserSecrets } from 'entities/userSecrets'
import { useState } from 'react'

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
        <div className='flex flex-col items-center justify-center gap-4 h-screen'>
            <div className='font-bold text-white text-8xl'>Login</div>
            <form
                className='flex flex-col gap-2 text-5xl pt-5 '
                onSubmit={handleSaveSecrets}
            >
                <input
                    className='rounded-xl p-2'
                    type='text'
                    placeholder='idINstance'
                    value={idInstance}
                    onChange={(e) => setIdInstance(e.target.value)}
                />
                <input
                    className='rounded-xl p-2'
                    type='text'
                    placeholder='ApiTokenInstance'
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                />
                <button
                    className='bg-blue-600 text-white p-3 rounded-xl font-bold mt-4'
                    type='submit'
                >
                    Save
                </button>
            </form>
        </div>
    )
}

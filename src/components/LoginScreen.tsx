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
        <div className='text-6xl  flex flex-col items-center justify-center gap-4  h-screen w-full'>
            <div className='font-bold text-white'>Login PAGE</div>
            <form className='flex flex-col gap-2' onSubmit={handleSaveSecrets}>
                <input
                    type='text'
                    placeholder='idINstance'
                    value={idInstance}
                    onChange={(e) => setIdInstance(e.target.value)}
                />
                <input
                    type='text'
                    placeholder='ApiTokenInstance'
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                />
                <button className='bg-blue-600 text-white p-2 rounded-xl' type='submit'>
                    Save
                </button>
            </form>
        </div>
    )
}

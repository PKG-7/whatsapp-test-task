import { iUserSecrets } from 'entities/userSecrets'
import { useLocalStorage } from './useLocalStorage'
import { useEffect, useState } from 'react'

export const useSecrets = () => {
    const [idInstance, setidInstance] = useState<string | null>(null)
    const [apiToken, setApiToken] = useState<string | null>(null)

    const [secrets, setSecrets] = useLocalStorage<iUserSecrets | null>(
        'userSecrets',
        null,
    )

    useEffect(() => {
        if (secrets) {
            setApiToken(secrets.apiToken)
            setidInstance(secrets.idInstance)
        }
    }, [secrets])

    return { idInstance, apiToken, secrets, setSecrets }
}

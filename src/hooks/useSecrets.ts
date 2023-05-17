import { iUserSecrets } from 'entities/userSecrets'
import { useLocalStorage } from './useLocalStorage'

export const useSecrets = () => {
    const [secrets, setSecrets] = useLocalStorage<iUserSecrets | null>(
        'userSecrets',
        null,
    )
    return { secrets, setSecrets }
}

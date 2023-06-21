import { LoginScreen } from '@/components/LoginScreen'
import { useHasMounted } from 'hooks/useHasMounted'
import { useSecrets } from 'hooks/useSecrets'
import React from 'react'

interface LayoutProps {
    children: React.ReactNode
}

export default function MainLayout({ children }: LayoutProps) {
    //TODO: Можно вернуть SSR если будет необходимость, пока он убит
    const { secrets, setSecrets } = useSecrets()

    const hasMounted = useHasMounted()
    if (!hasMounted) {
        return <div>💀💀💀Skeleton loading</div>
    }

    if (!secrets) return <LoginScreen setSecrets={setSecrets} />

    return <div className='flex w-full h-screen'>{children}</div>
}

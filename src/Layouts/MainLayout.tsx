import { LoginScreen } from '@/components/LoginScreen'
import { useHasMounted } from 'hooks/useHasMounted'
import { useSecrets } from 'hooks/useSecrets'
import React from 'react'

interface LayoutProps {
    children: React.ReactNode
}

export default function MainLayout({ children }: LayoutProps) {
    //TODO: Убрать на сервер
    const { secrets, setSecrets } = useSecrets()

    //TODO: Сделать Auth Page на server components с Next auth
    const hasMounted = useHasMounted()
    if (!hasMounted) {
        return <div>💀💀💀Skeleton loading</div>
    }

    if (!secrets) return <LoginScreen setSecrets={setSecrets} />

    return <div className='flex w-full h-screen'>{children}</div>
}

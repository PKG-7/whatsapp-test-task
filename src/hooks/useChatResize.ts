import { useEffect, useRef, useState } from 'react'

export const useChatResize = (minWidth: number, maxWidth: number) => {
    const [sidebarWidth, setSidebarWidth] = useState(() => {
        const storedWidth = localStorage.getItem('sidebarWidth')
        return storedWidth ? parseInt(storedWidth, 10) : 520
    })

    const ref = useRef<HTMLDivElement | null>(null)
    const refRight = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const resizeableElement = ref.current
        if (!resizeableElement) return

        const styles = window.getComputedStyle(resizeableElement)
        let width = parseInt(styles.width, 10)
        let x = 0

        const onMouseMoveResize = (event: MouseEvent) => {
            const dx = event.clientX - x
            x = event.clientX
            width = width + dx
            width = Math.max(minWidth, Math.min(maxWidth, width))
            setSidebarWidth(width)
        }

        const resizerRight = refRight.current
        if (resizerRight) {
            resizerRight.addEventListener('mousedown', (event: MouseEvent) => {
                x = event.clientX
                document.addEventListener('mousemove', onMouseMoveResize)
                document.addEventListener('mouseup', () => {
                    document.removeEventListener('mousemove', onMouseMoveResize)
                    localStorage.setItem('sidebarWidth', width.toString())
                })
            })
        }

        if (resizeableElement.style) {
            resizeableElement.style.userSelect = 'none'
        }

        return () => {
            if (resizerRight) {
                resizerRight.removeEventListener('mousedown', onMouseMoveResize)
            }
            document.removeEventListener('mousemove', onMouseMoveResize)
        }
    }, [])

    return { sidebarWidth, ref, refRight }
}

import { iNotification } from 'entities/notifications'
import { iUserSecrets } from 'entities/userSecrets'
import { useEffect, useState } from 'react'
import { deleteNotification } from '../../functions/deleteNotification'
import { receiveNotification } from '../../functions/receiveNotification'
import { useSecrets } from 'hooks/useSecrets'

export function useNotifications(selectedChatId: string) {
    const { secrets } = useSecrets()
    const [newNotificationsList, setNewNotificationsList] = useState<iNotification[]>([])
    const [newNotification, setNewNotification] = useState<iNotification | null>(null)

    useEffect(() => {
        async function processNotifications(secrets: iUserSecrets | null) {
            if (secrets) {
                const notification = await receiveNotification(secrets)
                console.log(notification)

                if (notification) {
                    setNewNotificationsList((prev) => [...prev, notification])
                    await deleteNotification(notification.receiptId, secrets)
                    setNewNotification(notification) // Set the newNotification state here
                }
            }
        }

        processNotifications(secrets)

        // Return a cleanup function
        return () => {
            // ...cleanup code...
        }
    }, [selectedChatId])

    function popNotification(notification: iNotification) {
        // Perform your processing logic with the notification here

        // After processing, remove the notification from the list
        setNewNotificationsList((prev) =>
            prev.filter((item) => item.receiptId !== notification.receiptId),
        )

        setNewNotification(null) // Clear the newNotification state

        return notification
    }

    return {
        popNotification,
        newNotification,
    }
}

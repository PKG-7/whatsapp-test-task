import { useQuery } from '@tanstack/react-query'
import { iNotification } from 'entities/notifications/IncomingMessage'
import { iUserSecrets } from 'entities/userSecrets'
import { useState } from 'react'
import { deleteNotification } from '../../functions/deleteNotification'
import { receiveNotification } from '../../functions/receiveNotification'

export function useNotifications(secrets: iUserSecrets | null) {
    const [newNotification, setNewNotification] = useState<iNotification | null>(null)

    const { data, refetch } = useQuery(
        ['notification'],
        async () => {
            if (secrets) {
                const notification = await receiveNotification(secrets)
                return notification
            }
        },
        {
            onSuccess: (notification) => {
                if (notification === null) {
                    console.log('Нет новых оповещений')
                } else if (notification === undefined) {
                    console.log('Не удалось получить новое оповещение. Все вопросы к API')
                } else if (notification.body.typeWebhook === 'incomingMessageReceived') {
                    if (data) {
                        console.log('Получено новое входящее сообщение')
                        setNewNotification(data)
                    }
                } else {
                    console.log(
                        'Получено оповещение другого типа, мы их пока не обрабатываем и удаляем',
                    )
                    popNotification(notification, secrets)
                }
                refetch()
            },
        },
    )

    async function popNotification(
        notification: iNotification,
        secrets: iUserSecrets | null,
    ) {
        if (secrets) {
            await deleteNotification(notification.receiptId, secrets)
            setNewNotification(null)
            console.log('Уведомление удалено')
        } else {
            console.log('Уведомление не удаленно, так как нет сеанса')
        }
    }

    return {
        newNotification,
        popNotification,
    }
}

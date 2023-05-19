import { useQuery, useQueryClient } from '@tanstack/react-query'
import { iUserSecrets } from 'entities/userSecrets'
import { useState } from 'react'
import { deleteNotification } from '../../functions/deleteNotification'
import { receiveNotification } from '../../functions/receiveNotification'
import { iNotification } from 'entities/notifications/IncomingMessage'

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
                console.log(notification)
                if (notification === null) {
                    console.log('Нет новых оповещений')
                } else if (notification === undefined) {
                    console.log('Не удалось получить новое оповещение')
                } else if (notification.body.typeWebhook === 'incomingMessageReceived') {
                    if (data) {
                        console.log('Получено текстовое сообщение')
                        console.log(notification.body.messageData.textMessageData)
                        setNewNotification(data)
                    }
                } else {
                    console.log(
                        'Получено оповещение другого типа, мы их пока не обрабатываем',
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

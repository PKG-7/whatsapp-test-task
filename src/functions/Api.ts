import axios from 'axios'
import { iChat } from 'entities/chat'
import { iUserSecrets } from 'entities/userSecrets'

interface ApiResponse {
    idMessage: string
}

export const Api = {
    //*📧 Sends user message to the server and returns the messageId.
    sendMessage: async (
        message: string,
        chatId: string,
        secrets: iUserSecrets,
    ): Promise<ApiResponse | null> => {
        const myHeaders = new Headers({ 'Content-Type': 'application/json' })

        const body = JSON.stringify({
            chatId,
            message,
        })

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: body,
        }

        try {
            const response = await fetch(
                `https://api.green-api.com/waInstance${secrets.idInstance}/sendMessage/${secrets.apiToken}`,
                requestOptions,
            )
            const text = await response.text()
            const result: ApiResponse = JSON.parse(text)
            console.log(result)
            return result
        } catch (error) {
            console.log('error', error)
            return null
        }
    },

    //*📧 Get New message
    getMessage: async (secrets: iUserSecrets) => {
        const url = `${process.env.NEXT_PUBLIC_HOST}/api/receive`
        const payload = { secrets: secrets.idInstance, ApiToken: secrets.apiToken }

        try {
            const res = await axios.post(url, payload)
            const data = JSON.parse(res.data)
            return data
        } catch (error) {
            console.log(error)
            return null
        }
    },

    //*📧 Creates new chat with number (id) provided
    createNewChat: async (newChat: iChat, secrets: iUserSecrets) => {},

    //*📧 Получить историю чата всего 300 запросов на бесплатном тарифе
    getChatHistory: async (chatId: string, secrets: iUserSecrets) => {
        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')

        const raw = JSON.stringify({
            chatId,
            count: 200,
        })

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        }

        try {
            const response = await fetch(
                `https://api.green-api.com/waInstance${secrets.idInstance}/getChatHistory/${secrets.apiToken}?chatId=${chatId}&count=100`,
                requestOptions,
            )

            console.log(response.body)
            console.log(response)

            if (response.body?.locked)
                if (!response.ok) {
                    throw new Error('Request failed with status ' + response.status)
                }

            const result = await response.text()
            const data = JSON.parse(result)

            return data
        } catch (error) {
            console.log('Error:', error)
            return null
        }
    },

    //*📧 GetChats
    getChats: async (secrets: iUserSecrets) => {
        const requestOptions = {
            method: 'GET',
        }

        try {
            const response = await fetch(
                `https://api.green-api.com/waInstance${secrets.idInstance}/getChats/${secrets.apiToken}`,
                requestOptions,
            )

            console.log(response)
            if (!response.ok) {
                throw new Error('Request failed with status ' + response.status)
            }

            const result = await response.text()
            console.log(result)
            const data: iChat[] = JSON.parse(result)

            return data
        } catch (error) {
            console.log('Error:', error)
            return null
        }
    },
}

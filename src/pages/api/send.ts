import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { message, phoneNumber, IdInstance, ApiToken } = req.body

    const url = `https://api.green-api.com/waInstance${IdInstance}/sendMessage/${ApiToken}`
    const chatId = `${phoneNumber}@c.us`
    //TODO:  validate country number

    try {
        const { data } = await axios.post(url, { chatId, message })
        res.status(200).json(data)
    } catch (error: any) {
        res.status(error.response?.status || 500).json({ error: 'Something went wrong!' })
    }
}

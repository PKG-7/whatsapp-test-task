import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { IdInstance, ApiToken } = req.body

    const url = `https://api.green-api.com/waInstance${IdInstance}/receiveNotification/${ApiToken}`
    // const chatId = `${phoneNumber}@c.us`

    // const config = {
    //     method: 'get',
    //     url,
    //     headers: {},
    // }

    axios(url)
        .then(function (response) {
            // console.log(response.data)
            // console.log(JSON.stringify(response.data))
            res.status(200).json(JSON.stringify(response.data))
        })
        .catch(function (error) {
            console.log(error)
            res.status(error.response?.status || 500).json({
                error: 'Something went wrong!',
            })
        })
}

export interface iUserSecrets {
    idInstance: string // id с сайта Green Api
    apiToken: string // Api с сайта Green Api
    createdAt: number // дата создания

    // userId: string // number+postfix ('24124521@c.us')
    // phoneNumber: number | null // номер телефона
    // userName: string | null // user display name
    // avatarUrl: string | null // Ссылка на аватар пользователя
}

export const createNewUserSecrets = (idInstance: string, apiToken: string) => {
    const newUser: iUserSecrets = {
        idInstance,
        apiToken,
        createdAt: Date.now(),
    }
    return newUser
}

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export function CreateNewChatCard({
    handleCreateNewChat,
}: {
    handleCreateNewChat: (phoneInput: number) => void
}) {
    const [isClicked, setisClicked] = useState(false)

    type PhoneInput = z.infer<typeof schema>
    const schema = z
        .object({
            number: z
                .string()
                .min(11, { message: 'Недостаточно цифр' })
                .max(11, { message: 'Слишком много цифр' }),
        })
        .refine((input) => input.number.startsWith('7'), {
            message: 'Номер должен начинаться с 7',
            path: ['number'],
        })

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<PhoneInput>({
        resolver: zodResolver(schema),
    })

    const onSubmit = (data: PhoneInput) => {
        handleCreateNewChat(Number(data.number))
        setisClicked(false)
        setValue('number', '')
    }

    if (!isClicked)
        return (
            <div
                onClick={() => setisClicked(true)}
                className='flex items-center justify-center w-full h-[4rem] bg-secondary hover:bg-accent  cursor-pointer '
            >
                <div className='text-white hover:bg-accent flex flex-col animate-pulse'>
                    <div className='flex gap-1 font-bold'>
                        <span>💌 Создать новый чат</span>
                    </div>
                </div>
            </div>
        )

    return (
        <div className='flex flex-col items-center justify-center w-full h-[4rem] bg-secondary  cursor-pointer '>
            <form className=' flex gap-2 text-white' onSubmit={handleSubmit(onSubmit)}>
                <input
                    type='number'
                    placeholder='79991112233'
                    className='bg-gray-700 rounded-xl px-2'
                    {...register('number')}
                />
                <button
                    type='submit'
                    className='bg-green-600 rounded-xl p-2 font-bold text-white'
                >
                    Добавить
                </button>
            </form>
            <div>
                {errors.number && (
                    <span className='text-red-500'>{errors.number.message}</span>
                )}
            </div>
        </div>
    )
}

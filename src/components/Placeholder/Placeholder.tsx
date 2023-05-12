import Image from 'next/image'
import iconLock from '@/images/iconLock.svg'
import iconPlaceholderImage from '@/images/iconPlaceholderImage.svg'

export function Placeholder() {
    return (
        <div className='flex w-full bg-[#222E35]'>
            <div className='flex flex-col w-full h-full items-center justify-center'>
                <Image src={iconPlaceholderImage} alt='placeholder' />

                <div className='flex flex-col items-center mt-10'>
                    <h1 className='text-[#e9edef] text-3xl font-extralight'>
                        WhatsApp Web
                    </h1>

                    <div className='flex flex-col mt-4 w-11/12 text-center text-[#8696a0] text-base font-light'>
                        <h2>
                            Отправляйте и получайте сообщения без необходимости оставлять
                            телефон подключённым.
                        </h2>
                        <h2>
                            Используйте WhatsАрр одновременно на четырёх связанных
                            устройствах и одном телефоне.
                        </h2>
                    </div>

                    <div className='absolute bottom-6  text-[#8696a0]'>
                        <div className='inline-block relative top-[2px]'>
                            <Image src={iconLock} alt='lock' width={17} height={13} />
                        </div>
                        <span className='text-sm font-light'>
                            Защищено сквозным шифрованием
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

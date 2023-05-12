import { iconLaptop } from '../../../images/icons'
import { PlaceholderImage } from '../../../images/placeholderImage'

export function Placeholder() {
    return (
        <div className='flex w-full bg-[#222E35]'>
            <div className='flex flex-col w-full h-full items-center justify-center'>
                <PlaceholderImage />

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
                    <div className='my-6 border-b-[1px] border-[rgba(134,150,160,0.15)] w-full'></div>

                    <div className='flex gap-2 text-[#8696a0]'>
                        {iconLaptop}
                        <span className='text-sm font-light'>
                            Защищено сквозным шифрованием
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

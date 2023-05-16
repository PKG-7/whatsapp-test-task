import Image from 'next/image'

export function Button({
    icon,
    onClick,
    scale = 20,
    alt = icon,
}: {
    icon: string
    onClick?: () => void
    scale?: number
    alt?: string
}) {
    return (
        <div
            onClick={onClick}
            className='flex selection:bg-none justify-center rounded-full items-center w-[40px] h-[40px] active:bg-[#2a3942] transition-all duration-400 cursor-pointer'
        >
            <Image src={icon} width={scale} height={scale} alt={alt} />
        </div>
    )
}

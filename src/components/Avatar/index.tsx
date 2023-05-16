import Image from 'next/image'

interface AvatarProps {
    scale: number
    image: string
}

export default function Avatar(props: AvatarProps) {
    const { scale, image } = props

    return (
        // <div className={` ${width} ${height}`}>
        <Image
            src={`/assets/images/${image}`}
            alt='Avatar Image'
            width={scale}
            height={scale}
            className='rounded-full'
        />
        // </div>
    )
}

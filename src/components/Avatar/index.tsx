import Image from 'next/image'
import iconAvatarDefault from '@/images/iconAvatarDefault.svg'

interface AvatarProps {
    scale: number
    image: string
}

export default function Avatar(props: AvatarProps) {
    const { scale, image } = props
    //TODO: get imag efrom api

    return (
        // <div className={` ${width} ${height}`}>
        <Image
            // src={`/assets/images/${image}`}
            src={iconAvatarDefault}
            alt='Avatar Image'
            width={scale}
            height={scale}
            className='rounded-full'
        />
        // </div>
    )
}

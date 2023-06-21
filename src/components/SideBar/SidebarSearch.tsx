import iconFilter from '@/images/iconFilter.svg'
import iconSearch from '@/images/iconSearch.svg'
import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'
import { Button } from '../Button'
import { doNothing } from './SidebarMenu'

export function SidebarSearch({
    search,
    setSearch,
}: {
    search: string
    setSearch: Dispatch<SetStateAction<string>>
}) {
    return (
        <div className='flex bg-secondary w-full h-max px-3 gap-1 py-2'>
            <div className='relative w-full h-max flex'>
                <div className='absolute text-[#AEBAC1] inset-y-0 left-0 flex items-center pl-2'>
                    <Image src={iconSearch} alt='search' width={24} height={24} />
                </div>

                <input
                    className='w-full h-9 rounded-lg bg-primary text-white text-sm pl-12'
                    placeholder='Поиск или новый чат'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <Button icon={iconFilter} onClick={doNothing} alt='filter' scale={24} />
        </div>
    )
}

'use client'
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge"
import Image from 'next/image'
import { FaPlay } from 'react-icons/fa'

interface ListItemProps {
    image: string;
    name: string;
    href: string;
}

export default function ListItem({
    image,
    name,
    href
}: ListItemProps) {

    const router = useRouter()

    function onClick() {
        router.push(href)
    }

    return (
        <button className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4"
            onClick={onClick}>
            <div className="relative min-h-[64px] min-w-[64px]">
                <Image src={image} fill alt='Image' className="object-cover" />
            </div>
            <p className="font-medium truncate py-5">
                {name}
            </p>
            <div className="absolute transition opacity-0 rounded-full flex items-center justify-center bg-green-500 p-4 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110">
                <FaPlay className=" text-black" />
            </div>
        </button>
    )
}
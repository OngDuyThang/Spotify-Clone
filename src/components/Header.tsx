'use client'

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge"
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { HiHome } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from 'react-icons/fa'
import toast from "react-hot-toast";
import usePlayer from "@/hooks/usePlayer";

interface HeaderProps {
    children: React.ReactNode;
    className?: string
}

export default function Header({
    children,
    className
}: HeaderProps) {

    const router = useRouter()
    const { onOpen } = useAuthModal()
    const supabaseClient = useSupabaseClient()
    const { user } = useUser()
    const player = usePlayer()

    async function handleLogout() {
        const { error } = await supabaseClient.auth.signOut()
        player.reset()
        router.refresh()
        if (error) {
            toast.error(error.message)
        } else {
            toast.success('Logged out!')
        }
    }

    return (
        <div className={twMerge(`
            h-fit
            bg-gradient-to-b
            from-emerald-800
            p-6
        `, className)}>
            <div className="w-full mb-4 flex items-center justify-between">
                <div className="hidden md:flex gap-x-2 items-center
                ">
                    <button className=" rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
                        onClick={() => router.back()}>
                        <RxCaretLeft size={35}
                            className=" text-white" />
                    </button>
                    <button className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
                        onClick={() => router.back()}>
                        <RxCaretRight size={35}
                            className=" text-white" />
                    </button>
                </div>
                <div className="flex md:hidden gap-x-2 items-center">
                    <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition"
                        onClick={() => router.push('/')} >
                        <HiHome className="text-black" size={20} />
                    </button>
                    <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition"
                        onClick={() => router.push('/search')} >
                        <BiSearch className="text-black" size={20} />
                    </button>
                </div>
                <div className="flex justify-between items-center gap-x-4">

                    {user ? <div className="flex gap-x-4 items-center">
                        <Button className="bg-white px-6 py-2"
                            onClick={handleLogout}>
                            Logout
                        </Button>
                        <Button className="bg-white"
                            onClick={() => router.push('/account')}>
                            <FaUserAlt />
                        </Button>
                    </div> :
                        <>
                            <div>
                                <Button className="bg-transparent text-neutral-300 font-medium"
                                    onClick={onOpen}>
                                    Sign up
                                </Button>
                            </div>
                            <div>
                                <Button className="bg-white px-6 py-2"
                                    onClick={onOpen}>
                                    Login
                                </Button>
                            </div>
                        </>
                    }
                </div>
            </div>
            {children}
        </div>
    )
}
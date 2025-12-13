'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { CiUser } from 'react-icons/ci'; 
import { HiHome } from 'react-icons/hi';
import { RiSimCard2Line } from "react-icons/ri";

export const BottomNavigation = () => {
    const router = useRouter();

    return (
        <nav className="fixed bottom-0 left-0 w-full bg-(--to) flex justify-around py-3 z-50">
            <button 
                className="flex flex-col items-center text-gray-400"
                onClick={() => router.push('/')}
            >
                <HiHome />
                <span className="text-xs mt-1">Home</span>
            </button>

            <button 
                className="flex flex-col items-center text-[#FF7F32]"
                onClick={() => router.push('/my-esim')}
            >
                <RiSimCard2Line />
                <span className="text-xs mt-1">eSIM</span>
            </button>

            <button 
                className="flex flex-col items-center text-gray-400"
                onClick={() => router.push('/account')}
            >
                <CiUser />
                <span className="text-xs mt-1">Account</span>
            </button>
        </nav>
    )
}

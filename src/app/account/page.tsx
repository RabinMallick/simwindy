'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { BottomNavigation } from '@/components/include/BottomNavigation'
import { TopHeader } from '@/components/include/TopHeader'

import { FiLogOut, FiSettings } from 'react-icons/fi'
import { AiOutlineWallet } from 'react-icons/ai'
import { BsSim } from 'react-icons/bs'
import { HiOutlineClipboardList } from 'react-icons/hi'

import { ProfileHeader } from '@/components/account/ProfileHeader'
import { Stats } from '@/components/account/Stats' 
import { MenuItem } from '@/components/account/MenuItem'
import { SettingsOffcanvas } from '@/components/account/SettingsOffcanvas'
import { EditProfile } from '@/components/account/EditProfile'

export default function Account() {
    const router = useRouter()
    const [openEditProfile, setOpenEditProfile] = useState(false)
    const [openSettings, setOpenSettings] = useState(false) 

    return (
        <div className="min-h-screen bg-linear-to-b from-(--from)/30 to-(--to) md:py-6">
            <TopHeader title="Account" />

            <div className="max-w-xl mx-auto">
                {/* Profile Header */}
                <ProfileHeader  
                        onClick={() => setOpenEditProfile(true)}/>

                {/* Stats */}
                <Stats />

                {/* Menu */}
                <div className="px-3 mt-5 space-y-3">
                    <MenuItem
                        icon={<HiOutlineClipboardList />}
                        label="My Orders"
                        onClick={() => router.push('/my-orders')}
                    />

                    <MenuItem
                        icon={<BsSim />}
                        label="My eSIMs"
                        onClick={() => router.push('/my-esim')}
                    />

                    <MenuItem
                        icon={<AiOutlineWallet />}
                        label="Wallet"
                        onClick={() => router.push('/wallet')}
                    />

                    <MenuItem
                        icon={<FiSettings />}
                        label="Settings"
                        onClick={() => setOpenSettings(true)}
                    />

                    <MenuItem
                        icon={<FiLogOut />}
                        label="Logout"
                        danger
                        onClick={() => alert('Logout action')}
                    />
                </div>
            </div>


              {/* Settings Offcanvas */}
            <EditProfile
                open={openEditProfile}
                onClose={() => setOpenEditProfile(false)}
            />


            {/* Settings Offcanvas */}
            <SettingsOffcanvas
                open={openSettings}
                onClose={() => setOpenSettings(false)}
            />

            {/* Bottom Nav */}
            <div className="md:hidden">
                <BottomNavigation />
            </div>
        </div>
    )
}
 
'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { BottomNavigation } from '@/components/include/BottomNavigation'
import { TopHeader } from '@/components/include/TopHeader'

import { FiLogOut, FiSettings, FiHelpCircle } from 'react-icons/fi'
import { AiOutlineWallet, AiOutlineGift } from 'react-icons/ai'
import { BsSim } from 'react-icons/bs'
import { HiOutlineClipboardList } from 'react-icons/hi'
import { MdSubscriptions } from 'react-icons/md'

import { ProfileHeader } from '@/components/account/ProfileHeader'
import { Stats } from '@/components/account/Stats'
import { MenuItem } from '@/components/account/MenuItem'
import { SettingsOffcanvas } from '@/components/account/SettingsOffcanvas'
import { EditProfile } from '@/components/account/EditProfile'
import { FAQSupport } from '@/components/account/FAQSupport'

export default function Account() {
    const router = useRouter()
    const [openEditProfile, setOpenEditProfile] = useState(false)
    const [openFAQSupport, setOpenFAQSupport] = useState(false)
    const [openSettings, setOpenSettings] = useState(false)

    return (
        <div className="min-h-screen bg-linear-to-b from-(--from)/30 to-(--to) md:py-6">
            <TopHeader title="Account" />

            <div className="max-w-xl mx-auto px-3 space-y-3 mt-4 md:mt-6">
                {/* Profile Header */}
                <ProfileHeader onClick={() => setOpenEditProfile(true)} />
                {/* Stats */}
                <Stats />

                {/* Main Features Section */}
                <div>
                    <h2 className="text-[13px] font-medium text-gray-500 mb-2">Main Features</h2>
                    <div className="grid grid-cols-2 gap-3">
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
                            icon={<MdSubscriptions />}
                            label="Subscription"
                            onClick={() => router.push('/subscription')}
                        />
                    </div>
                </div>

                {/* Other Options Section */}
                <div>
                    <h2 className="text-[13px] font-medium text-gray-500 mb-2">Other Options</h2>
                    <div className="space-y-3">
                        <MenuItem
                            icon={<AiOutlineGift />}
                            label="Refer & Earn"
                            onClick={() => router.push('/refer')}
                        />

                        <MenuItem
                            icon={<FiHelpCircle />}
                            label="Support / FAQ"
                            onClick={() => setOpenFAQSupport(true)}
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
            </div>

            {/* Edit Profile Offcanvas */}
            <EditProfile
                open={openEditProfile}
                onClose={() => setOpenEditProfile(false)}
            />
            {/* FAQs / Support Offcanvas */}
            <FAQSupport
                open={openFAQSupport}
                onClose={() => setOpenFAQSupport(false)}
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

import { BottomNavigation } from '@/components/include/BottomNavigation'
import { TopHeader } from '@/components/include/TopHeader'
import { FiLogOut, FiSettings } from 'react-icons/fi'
import { AiOutlineWallet } from 'react-icons/ai'
import { BsSim } from 'react-icons/bs'
import { HiOutlineClipboardList } from 'react-icons/hi'
import { ProfileHeader } from '@/components/account/ProfileHeader'
import { Stats } from '@/components/account/Stats'

export default function Account() {
    return (
        <div className="min-h-screen bg-linear-to-b from-(--from)/30 to-(--to)  md:py-6">
            <TopHeader title="Account" />

            <div className=" max-w-xl mx-auto">
                {/* Profile Header */}
                <ProfileHeader />

                {/* Stats */}
                <Stats />

                {/* Menu */}
                <div className="px-3 mt-5 space-y-3">
                    <MenuItem icon={<HiOutlineClipboardList />} label="My Orders" />
                    <MenuItem icon={<BsSim />} label="My eSIMs" />
                    <MenuItem icon={<AiOutlineWallet />} label="Wallet" />
                    <MenuItem icon={<FiSettings />} label="Settings" />
                    <MenuItem
                        icon={<FiLogOut />}
                        label="Logout"
                        danger
                    />
                </div>

            </div>
            {/* Bottom Nav */}
            <div className="md:hidden">
                <BottomNavigation />
            </div>
        </div>
    )
}

function MenuItem({
    icon,
    label,
    danger,
}: {
    icon: React.ReactNode
    label: string
    danger?: boolean
}) {
    return (
        <button
            className={`w-full flex items-center gap-3 p-3 rounded-md bg-white border border-gray-200 text-left cursor-pointer
            ${danger ? 'text-red-500' : 'text-gray-700'}`}
        >
            <span className="text-xl">{icon}</span>
            <span className="text-sm font-medium">{label}</span>
        </button>
    )
}

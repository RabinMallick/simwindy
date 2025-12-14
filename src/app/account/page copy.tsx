import { BottomNavigation } from '@/components/include/BottomNavigation'
import { TopHeader } from '@/components/include/TopHeader'
import { FiLogOut, FiSettings } from 'react-icons/fi'
import { AiOutlineWallet } from 'react-icons/ai'
import { BsSim } from 'react-icons/bs'
import { HiOutlineClipboardList } from 'react-icons/hi'
import Image from 'next/image'

export default function Page() {
    return (
        <div className="min-h-screen bg-linear-to-b from-(--from)/30 to-(--to) pb-20">
            <TopHeader title="Account" />

            {/* Profile Header */}
            <div className="px-4 mt-4">
                <div className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm">
                    <Image
                        src="/avatar.png"
                        alt="User"
                        width={60}
                        height={60}
                        className="rounded-full"
                    />

                    <div className="flex-1">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Apurbo Kumar
                        </h2>
                        <p className="text-sm text-gray-500">
                            apurbo@email.com
                        </p>
                    </div>

                    <button className="text-sm text-blue-600 font-medium">
                        Edit
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 px-4 mt-4">
                {[
                    { label: 'Balance', value: '$120' },
                    { label: 'Orders', value: '12' },
                    { label: 'eSIMs', value: '5' },
                ].map((item, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-xl p-3 text-center shadow-sm"
                    >
                        <p className="text-sm text-gray-500">{item.label}</p>
                        <p className="text-lg font-semibold text-gray-800">
                            {item.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* Menu */}
            <div className="px-4 mt-5 space-y-3">
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
            className={`w-full flex items-center gap-3 p-4 rounded-xl bg-white shadow-sm text-left
            ${danger ? 'text-red-500' : 'text-gray-700'}`}
        >
            <span className="text-xl">{icon}</span>
            <span className="font-medium">{label}</span>
        </button>
    )
}

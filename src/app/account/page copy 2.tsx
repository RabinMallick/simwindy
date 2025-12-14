'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { BottomNavigation } from '@/components/include/BottomNavigation'
import { TopHeader } from '@/components/include/TopHeader'

import { HiOutlineClipboardList } from 'react-icons/hi'
import { BsSim } from 'react-icons/bs'
import { AiOutlineWallet } from 'react-icons/ai'
import { FiSettings, FiX } from 'react-icons/fi'

type PanelType = 'orders' | 'esim' | 'wallet' | 'settings' | null

export default function Page() {
    const [open, setOpen] = useState(false)
    const [panel, setPanel] = useState<PanelType>(null)

    const openPanel = (type: PanelType) => {
        setPanel(type)
        setOpen(true)
    }

    const closePanel = () => {
        setOpen(false)
        setTimeout(() => setPanel(null), 200)
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-(--from)/30 to-(--to) pb-20">
            <TopHeader title="Account" />

            {/* Profile */}
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
                        <h2 className="text-lg font-semibold">
                            Apurbo Kumar
                        </h2>
                        <p className="text-sm text-gray-500">
                            apurbo@email.com
                        </p>
                    </div>
                </div>
            </div>

            {/* Menu */}
            <div className="px-4 mt-6 space-y-3">
                <MenuItem
                    icon={<HiOutlineClipboardList />}
                    label="My Orders"
                    onClick={() => openPanel('orders')}
                />
                <MenuItem
                    icon={<BsSim />}
                    label="My eSIMs"
                    onClick={() => openPanel('esim')}
                />
                <MenuItem
                    icon={<AiOutlineWallet />}
                    label="Wallet"
                    onClick={() => openPanel('wallet')}
                />
                <MenuItem
                    icon={<FiSettings />}
                    label="Settings"
                    onClick={() => openPanel('settings')}
                />
            </div>

            {/* Offcanvas */}
            <Offcanvas
                open={open}
                title={panelTitle(panel)}
                onClose={closePanel}
            >
                {renderPanel(panel)}
            </Offcanvas>

            <div className="md:hidden">
                <BottomNavigation />
            </div>
        </div>
    )
}

/* ---------------- UI Components ---------------- */

function MenuItem({
    icon,
    label,
    onClick,
}: {
    icon: React.ReactNode
    label: string
    onClick: () => void
}) {
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center gap-3 p-4 rounded-xl bg-white shadow-sm text-left transition active:scale-[0.98]"
        >
            <span className="text-xl">{icon}</span>
            <span className="font-medium">{label}</span>
        </button>
    )
}

function Offcanvas({
    open,
    title,
    onClose,
    children,
}: {
    open: boolean
    title: string
    onClose: () => void
    children: React.ReactNode
}) {
    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                className={`fixed inset-0 bg-black/40 z-40 transition-opacity
                ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            />

            {/* Bottom Sheet */}
            <div
                className={`fixed bottom-0 left-0 w-full bg-white rounded-t-2xl z-99
                transform transition-transform duration-300
                ${open ? 'translate-y-0' : 'translate-y-full'}`}
            >
                <div className="p-4 flex justify-between items-center border-b">
                    <h3 className="font-semibold text-lg">{title}</h3>
                    <button onClick={onClose}>
                        <FiX size={22} />
                    </button>
                </div>

                <div className="p-4 max-h-[70vh] overflow-y-auto">
                    {children}
                </div>
            </div>
        </>
    )
}

/* ---------------- Panel Logic ---------------- */

function panelTitle(type: PanelType) {
    switch (type) {
        case 'orders':
            return 'My Orders'
        case 'esim':
            return 'My eSIMs'
        case 'wallet':
            return 'Wallet'
        case 'settings':
            return 'Settings'
        default:
            return ''
    }
}

function renderPanel(type: PanelType) {
    switch (type) {
        /* -------- ORDERS -------- */
        case 'orders':
            return (
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="p-4 bg-gray-100 rounded-xl space-y-2"
                        >
                            <div className="flex justify-between">
                                <p className="font-medium">
                                    Order #{1200 + i}
                                </p>
                                <span className="text-xs px-2 py-1 rounded-full bg-green-200 text-green-700">
                                    Completed
                                </span>
                            </div>
                            <p className="text-sm text-gray-600">
                                USA eSIM • 5GB • 30 Days
                            </p>
                            <div className="flex justify-between text-sm">
                                <span>Date</span>
                                <span>12 Sep 2025</span>
                            </div>
                            <div className="flex justify-between font-semibold">
                                <span>Total</span>
                                <span>$25</span>
                            </div>
                            <button className="w-full p-2 bg-black text-white rounded-lg text-sm">
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            )

        /* -------- ESIM -------- */
        case 'esim':
            return (
                <div className="space-y-4">
                    <div className="p-4 bg-gray-100 rounded-xl space-y-2">
                        <div className="flex justify-between">
                            <p className="font-medium">USA eSIM</p>
                            <span className="text-xs px-2 py-1 rounded-full bg-blue-200 text-blue-700">
                                Active
                            </span>
                        </div>
                        <p className="text-sm text-gray-600">
                            5GB • 30 Days
                        </p>
                        <div className="flex justify-between text-sm">
                            <span>Used</span>
                            <span>1.2GB / 5GB</span>
                        </div>
                        <div className="w-full h-2 bg-gray-300 rounded-full">
                            <div className="w-[25%] h-full bg-blue-500 rounded-full" />
                        </div>
                        <button className="w-full p-2 bg-black text-white rounded-lg text-sm">
                            View QR Code
                        </button>
                    </div>

                    <div className="p-4 bg-gray-100 rounded-xl">
                        <div className="flex justify-between">
                            <p className="font-medium">Japan eSIM</p>
                            <span className="text-xs px-2 py-1 rounded-full bg-gray-300">
                                Expired
                            </span>
                        </div>
                        <p className="text-sm text-gray-600">
                            3GB • Expired
                        </p>
                    </div>
                </div>
            )

        /* -------- WALLET -------- */
        case 'wallet':
            return (
                <div className="space-y-5">
                    <div className="p-4 rounded-xl bg-black text-white">
                        <p className="text-sm opacity-80">
                            Current Balance
                        </p>
                        <p className="text-2xl font-bold">$120.00</p>
                    </div>

                    <div className="space-y-3">
                        <Transaction
                            title="Top Up"
                            date="10 Sep 2025"
                            amount="+$50"
                            positive
                        />
                        <Transaction
                            title="eSIM Purchase"
                            date="8 Sep 2025"
                            amount="-$10"
                        />
                    </div>

                    <button className="w-full p-3 bg-black text-white rounded-xl">
                        Add Balance
                    </button>
                </div>
            )

        /* -------- SETTINGS -------- */
        case 'settings':
            return (
                <div className="space-y-4">
                    <SettingItem title="Edit Profile" desc="Name, email, photo" />
                    <SettingItem title="Change Password" desc="Update password" />
                    <SettingItem title="Language" desc="English (US)" />
                    <SettingItem title="Notifications" desc="Email & Push" />
                    <SettingItem title="Privacy Policy" desc="Read policy" />
                </div>
            )

        default:
            return null
    }
}

function Transaction({
    title,
    date,
    amount,
    positive,
}: {
    title: string
    date: string
    amount: string
    positive?: boolean
}) {
    return (
        <div className="flex justify-between p-3 bg-gray-100 rounded-xl">
            <div>
                <p className="font-medium">{title}</p>
                <p className="text-xs text-gray-500">{date}</p>
            </div>
            <span
                className={`font-semibold ${
                    positive ? 'text-green-600' : 'text-red-500'
                }`}
            >
                {amount}
            </span>
        </div>
    )
}

function SettingItem({
    title,
    desc,
}: {
    title: string
    desc: string
}) {
    return (
        <button className="w-full p-4 bg-gray-100 rounded-xl text-left">
            <p className="font-medium">{title}</p>
            <p className="text-sm text-gray-500">{desc}</p>
        </button>
    )
}

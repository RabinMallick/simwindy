import { BottomNavigation } from '@/components/include/BottomNavigation'
import { TopHeader } from '@/components/include/TopHeader'
import React from 'react'

export default function page() {
    return (
        <div className="min-h-screen bg-linear-to-b from-(--from)/30 to-(--to) pb-16 md:pb-0">
            <TopHeader title="Account" />

            <div className="md:hidden">
                <BottomNavigation />
            </div>
        </div>
    )
}

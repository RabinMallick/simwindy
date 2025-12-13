'use client'

import { useRouter, usePathname } from 'next/navigation'
import { CiUser } from 'react-icons/ci'
import { HiHome } from 'react-icons/hi'
import { RiSimCard2Line } from 'react-icons/ri'

const navItems = [
  { label: 'Home', path: '/', icon: HiHome },
  { label: 'eSIM', path: '/my-esim', icon: RiSimCard2Line },
  { label: 'Account', path: '/account', icon: CiUser },
]

export const BottomNavigation = () => {
  const router = useRouter()
  const pathname = usePathname()

  const activeIndex = navItems.findIndex(
    item => pathname === item.path || pathname.startsWith(`${item.path}/`)
  )

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-(--to) border-t border-gray-200 z-50">
      <div className="relative grid grid-cols-3 py-2.5">
        {navItems.map(({ label, path, icon: Icon }, index) => {
          const isActive = index === activeIndex

          return (
            <button
              key={path}
              onClick={() => router.push(path)}
              className={`flex flex-col items-center justify-center transition-colors duration-300 ${
                isActive
                  ? 'text-[#FF7F32]'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <span
                className={`${
                  isActive ? 'animate-nav-bounce' : ''
                }`}
              >
                <Icon size={22} />
              </span>

              <span className="text-xs mt-1 font-medium">
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

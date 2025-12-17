'use client';

import { FC, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { toggleUserMenu, closeUserMenu } from '@/store/slice/navbarSlice';
import { FiUser, FiSmartphone, FiLogOut } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

interface UserDropdownProps {
  user?: string;
}

export const UserDropdown: FC<UserDropdownProps> = ({ user }) => {

  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const { userMenuOpen } = useSelector((state: RootState) => state.navbar);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        dispatch(closeUserMenu());
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dispatch]);


  useEffect(() => {
  dispatch(closeUserMenu());
}, [router, dispatch]);

  return (
    <div className="relative" ref={userMenuRef}>
      <button onClick={() => dispatch(toggleUserMenu())}>
        <Image
          src="/assets/user.png"
          alt="User"
          height={35}
          width={35}
          className="rounded-full border border-gray-200"
        />
      </button>

      {userMenuOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-md shadow-lg z-50">
          <Link
            href="/account"
            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
          >
            <FiUser className="text-gray-600" />
            {user ?? 'No User'}
          </Link>

          <Link
            href="/my-esim"
            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
          >
            <FiSmartphone className="text-gray-600" />
            My eSims
          </Link>

          <button
            className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-gray-100"

            onClick={() => {
              try {
                localStorage.removeItem("loginForm");
              } catch (e) {
                console.error("Logout failed", e);
              }

              dispatch(closeUserMenu());
              router.push('/login');
            }}
          >
            <FiLogOut className="text-gray-600" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

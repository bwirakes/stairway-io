// components/ui/UserMenu.tsx
import { useState } from 'react';
import { FiSettings, FiLogOut } from 'react-icons/fi';
import Link from 'next/link';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* User Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
      >
        <img
          className="w-8 h-8 rounded-full"
          src="/placeholder.svg?height=32&width=32"
          alt="User avatar"
        />
        <span className="sr-only">Open user menu</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <Link href="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            <FiSettings className="w-5 h-5 mr-3 text-gray-400" />
            Settings
          </Link>
          <Link href="/logout" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            <FiLogOut className="w-5 h-5 mr-3 text-gray-400" />
            Logout
          </Link>
        </div>
      )}
    </div>
  );
}

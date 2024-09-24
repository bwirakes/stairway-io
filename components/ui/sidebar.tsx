import { useState } from 'react';
import {
  FiChevronDown,
  FiChevronRight,
  FiDollarSign,
  FiCheckSquare,
  FiMessageCircle,
  FiX,
  FiRepeat,
  FiArchive,
  FiInbox,
  FiHome,
} from 'react-icons/fi';
import Link from 'next/link';

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isAssetsOpen, setIsAssetsOpen] = useState(false)

  const menuItems = [
    { name: 'Home', href: '/home', icon: FiHome },
    { name: 'Recurring Transactions', href: '/recurring-transactions', icon: FiRepeat },
    { name: 'Estate Account', href: '/estate-account', icon: FiArchive },
    { name: 'Tasks', href: '/tasks', icon: FiCheckSquare },
    { name: 'AI Assistant', href: '/ai-assistant', icon: FiMessageCircle },
    { name: 'Inbox', href: '/inbox', icon: FiInbox },
  ];

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white p-4 shadow-lg transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
      `}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-600">Stairway.io</h1>
        <button onClick={onClose} className="text-gray-500 md:hidden hover:text-gray-600">
          <FiX className="w-6 h-6" />
          <span className="sr-only">Close sidebar</span>
        </button>
      </div>

      {/* Navigation */}
      <nav>
        <ul className="space-y-2">
          {/* Home Menu Item */}
          <li>
            <Link href="/home" className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
              <FiHome className="w-5 h-5 mr-2" />
              Home
            </Link>
          </li>

          {/* Assets + Liabilities Section */}
          <li>
            <button
              onClick={() => setIsAssetsOpen(!isAssetsOpen)}
              className="flex items-center justify-between w-full px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <span className="flex items-center">
                <FiDollarSign className="w-5 h-5 mr-2" />
                <Link href="/inventory">Assets + Liabilities</Link>
              </span>
              {isAssetsOpen ? <FiChevronDown className="w-5 h-5" /> : <FiChevronRight className="w-5 h-5" />}
            </button>
            {isAssetsOpen && (
              <ul className="pl-6 mt-2 space-y-2">
                <li>
                  <Link href="/assets" className="block px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100">
                    Assets
                  </Link>
                </li>
                <li>
                  <Link href="/liabilities" className="block px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100">
                    Liabilities
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Other Menu Items */}
          {menuItems.slice(1).map((item) => (
            <li key={item.name}>
              <Link href={item.href} className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100">
                <item.icon className="w-5 h-5 mr-2" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
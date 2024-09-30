import { useState } from 'react'
import Link from 'next/link'
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
  FiSettings,
  FiCreditCard,
  FiUser,
  FiUsers,
  FiLogOut,
  FiPlusCircle,
} from 'react-icons/fi'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isAssetsOpen, setIsAssetsOpen] = useState(false)

  const menuItems = [
    { name: 'Home', href: '/home', icon: FiHome },
    { name: 'Recurring Transactions', href: '/recurring-transactions', icon: FiRepeat },
    { name: 'Estate Account', href: '/estate-account', icon: FiArchive },
    { name: 'Tasks', href: '/tasks', icon: FiCheckSquare },
    { name: 'AI Assistant', href: '/ai-assistant', icon: FiMessageCircle },
    { name: 'Inbox', href: '/inbox', icon: FiInbox },
  ]

  const handleItemClick = () => {
    if (window.innerWidth < 768) {
      onClose()
    }
  }

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white p-4 shadow-lg transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
      `}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text">
            Stairway.io
          </h1>
          <button onClick={onClose} className="text-gray-500 md:hidden hover:text-gray-600">
            <FiX className="w-6 h-6" />
            <span className="sr-only">Close sidebar</span>
          </button>
        </div>

        <nav className="flex-grow">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setIsAssetsOpen(!isAssetsOpen)}
                className="flex items-center justify-between w-full px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <span className="flex items-center">
                  <FiDollarSign className="w-5 h-5 mr-2" />
                  <span>Assets + Liabilities</span>
                </span>
                {isAssetsOpen ? <FiChevronDown className="w-5 h-5" /> : <FiChevronRight className="w-5 h-5" />}
              </button>
              {isAssetsOpen && (
                <ul className="pl-6 mt-2 space-y-2">
                  <li>
                    <Link href="/assets" className="block px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100" onClick={handleItemClick}>
                      Assets
                    </Link>
                  </li>
                  <li>
                    <Link href="/liabilities" className="block px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100" onClick={handleItemClick}>
                      Liabilities
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="flex items-center w-full px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
                  onClick={handleItemClick}
                >
                  <item.icon className="w-5 h-5 mr-2" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start px-2 py-1.5">
                <Avatar className="w-8 h-8 mr-2">
                  <AvatarImage src="/placeholder-user.jpg" alt="James Collison" />
                  <AvatarFallback>JC</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-semibold">James Collison</span>
                  <span className="text-xs text-gray-500">Preline@HS</span>
                </div>
                <FiChevronDown className="w-4 h-4 ml-auto" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem>
                <FiCreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FiSettings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FiUser className="mr-2 h-4 w-4" />
                <span>My account</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span className="mr-2">Dark mode</span>
                <Switch className="ml-auto" />
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Customization</span>
                <span className="ml-auto text-xs font-semibold text-blue-500">New</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FiUsers className="mr-2 h-4 w-4" />
                <span>Manage team</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <FiLogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <FiPlusCircle className="mr-2 h-4 w-4" />
                <span>Add team account</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </aside>
  )
}
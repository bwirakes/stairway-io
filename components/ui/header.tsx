import { Bell, HelpCircle, Menu } from 'lucide-react'
import UserMenu from './usermenu'

export default function Header({ onMenuToggle, onNotificationsToggle }: { onMenuToggle: () => void; onNotificationsToggle: () => void }) {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <button onClick={onMenuToggle} className="mr-4 text-gray-500 hover:text-gray-600 md:hidden">
            <Menu className="w-6 h-6" />
            <span className="sr-only">Toggle sidebar</span>
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 hover:text-gray-600">
            <HelpCircle className="w-6 h-6" />
            <span className="sr-only">Help</span>
          </button>
          <button onClick={onNotificationsToggle} className="relative text-gray-500 hover:text-gray-600">
            <Bell className="w-6 h-6" />
            <span className="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            <span className="sr-only">Notifications</span>
          </button>
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
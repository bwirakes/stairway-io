// components/ui/Notifications.tsx
import { FiX } from 'react-icons/fi';
//import Link from 'next/link';

export default function Notifications({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const notifications = [
      { id: 1, title: 'New transaction', message: 'You have a new incoming transaction of $500.', time: '5 minutes ago' },
      { id: 2, title: 'Task completed', message: 'Your task "Update budget" has been marked as complete.', time: '1 hour ago' },
      { id: 3, title: 'AI Assistant update', message: 'New features have been added to the AI Assistant.', time: '2 hours ago' },
    ]
  return (
    <div
      className={`
        fixed inset-y-0 right-0 z-50 w-80 bg-white p-4 shadow-lg transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-600">
          <FiX className="w-6 h-6" />
          <span className="sr-only">Close notifications</span>
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="p-3 rounded-lg bg-gray-50">
            <h3 className="font-semibold">{notification.title}</h3>
            <p className="text-sm text-gray-600">{notification.message}</p>
            <p className="mt-1 text-xs text-gray-400">{notification.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

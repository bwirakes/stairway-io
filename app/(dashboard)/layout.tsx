'use client';

import { useState } from 'react';
import Sidebar from '@/components/ui/sidebar';
import Header from '@/components/ui/header';
import Notifications from '@/components/ui/notifications';

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 w-full">
        {/* Header */}
        <Header onMenuToggle={toggleSidebar} onNotificationsToggle={toggleNotifications} />

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container px-4 py-8 mx-auto sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>

      {/* Notifications Panel */}
      <Notifications isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
    </div>
  );
}
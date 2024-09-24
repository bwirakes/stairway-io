'use client'

import { ProfileSetup } from '@/components/ProfileSetup';
import { TaskList } from '@/components/TaskList';
import { HorizontalTimeline } from '@/components/HorizontalTimeline';
import { EstateProgress } from '@/components/EstateProgress';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="mb-6 text-2xl font-semibold text-gray-800 sm:text-3xl sm:mb-8">Estate Planning Dashboard</h1>
        
        <EstateProgress />
        
        <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
          <ProfileSetup />
          <TaskList />
        </div>
        
        <HorizontalTimeline />
      </div>
    </div>
  )
};
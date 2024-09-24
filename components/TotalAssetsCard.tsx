import React from 'react'

const TotalAssetsCard: React.FC = () => {
  return (
    <div className="p-6 shadow-sm bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
      <div className="flex items-center">
        <div className="flex-shrink-0 p-3 bg-white rounded-full bg-opacity-30">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="ml-5">
          <p className="text-sm font-medium text-white text-opacity-70">Total Assets</p>
          <p className="text-2xl font-bold text-white">$1,234,567</p>
        </div>
      </div>
    </div>
  )
}

export default TotalAssetsCard
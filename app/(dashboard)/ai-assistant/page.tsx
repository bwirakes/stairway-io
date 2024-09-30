'use client';
import { useState } from 'react'
import { Send, Paperclip } from 'lucide-react'
import Image from 'next/image';

export default function Component() {
  const [input, setInput] = useState('')

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-800 bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="font-serif text-2xl text-gray-700">AI Assistant</h1>
          <span className="text-sm text-gray-500">Using limited free plan <a href="#" className="text-blue-600 hover:text-blue-800">Upgrade</a></span>
        </div>
      </header>

      <main className="flex-grow w-full px-4 py-8 mx-auto overflow-y-auto max-w-7xl sm:px-6 lg:px-8">
        <h2 className="mb-8 font-serif text-4xl text-center">
          <span className="mr-2 text-blue-400">✦</span>
          Good morning, Jane Doe
        </h2>

        <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
          <input
            type="text"
            placeholder="How can I help you today?"
            className="w-full p-3 text-gray-800 placeholder-gray-400 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="flex items-center justify-between mt-4">
            <div className="flex space-x-2">
              <button className="p-2 transition-colors bg-gray-200 rounded-full hover:bg-gray-300">
                <Image src="/path/to/image.jpg" alt="Description of the image" width={500} height={300} />
              </button>
              <button className="p-2 transition-colors bg-gray-200 rounded-full hover:bg-gray-300">
                <Paperclip className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <button className="flex items-center px-4 py-2 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700">
              Send <Send className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="mb-2 text-xl font-semibold text-gray-700">Quick actions</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {['Summarize meeting notes', 'Generate excel formulas', 'Extract insights from report'].map((action) => (
              <button key={action} className="p-3 text-left text-gray-700 transition-shadow bg-white rounded-md shadow-sm hover:shadow-md hover:text-blue-600">
                {action}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h3 className="mb-4 text-xl font-semibold text-gray-700">Your recent chats</h3>
          <div className="space-y-4">
            {['AI-Powered Will Execution for Estate...', 'Responsible Handling of Financial Data', 'Pepr Hamburger Startup Landing Page'].map((chat, index) => (
              <div key={index} className="p-4 transition-shadow bg-white rounded-md shadow-sm hover:shadow-md">
                <h4 className="font-medium text-gray-800">{chat}</h4>
                <p className="mt-1 text-sm text-gray-500">{index + 1} month{index !== 0 ? 's' : ''} ago</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
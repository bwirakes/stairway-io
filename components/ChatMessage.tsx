// components/ChatMessage.tsx
'use client';

import React from 'react';
import clsx from 'clsx';
import { FiUser } from 'react-icons/fi';
import { MdOutlineSmartToy } from 'react-icons/md';
import { Card } from './ui/card';
import TransactionDetailsTable from './TransactionDetailsTable';
import { Transaction } from './types';

interface Message {
  sender: 'user' | 'ai';
  content?: string;
  transactions?: Transaction[];
}

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const { sender, content, transactions } = message;

  return (
    <div
      className={clsx(
        'flex',
        sender === 'user' ? 'justify-end' : 'justify-start'
      )}
    >
      {sender === 'ai' && (
        <div className="flex-shrink-0 mr-2">
          <MdOutlineSmartToy className="w-6 h-6 text-gray-600" />
        </div>
      )}
      <Card
        className={clsx(
          'max-w-md px-4 py-2',
          sender === 'user'
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-800'
        )}
      >
        {content && <p>{content}</p>}
        {transactions && transactions.length > 0 && (
          <TransactionDetailsTable transactions={transactions} />
        )}
      </Card>
      {sender === 'user' && (
        <div className="flex-shrink-0 ml-2">
          <FiUser className="w-6 h-6 text-blue-600" />
        </div>
      )}
    </div>
  );
}

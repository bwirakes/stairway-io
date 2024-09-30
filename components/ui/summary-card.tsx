import React from 'react';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import Link from 'next/link';

interface SummaryCardProps {
  title: string;
  value: {
    amount: number;
    gradient: string;
  };
  dropdownItems: Array<{
    label: string;
    href: string;
  }>;
}

export function SummaryCard({ title, value, dropdownItems }: SummaryCardProps) {
  return (
    <Card className="p-6 text-left bg-white shadow-md">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <DotsVerticalIcon className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {dropdownItems.map((item, index) => (
              <DropdownMenuItem key={index} asChild>
                <Link href={item.href}>{item.label}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className={`text-2xl font-bold text-transparent bg-gradient-to-r ${value.gradient} bg-clip-text`}>
        ${value.amount.toLocaleString()}
      </p>
    </Card>
  );
}
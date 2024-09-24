// components/LiabilitiesTable.tsx
'use client'; // Necessary for shadcn/ui components in Next.js

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DotsVerticalIcon } from "@radix-ui/react-icons"

interface Liability {
  id: number;
  accountName: string;
  accountNumber: string;
  accountValue: string;
  accountStatus: string;
  accountType: string;
}

const LiabilitiesData: Liability[] = [
  {
    id: 1,
    accountName: "Primary Mortgage",
    accountNumber: "MORT123456",
    accountValue: "$250,000",
    accountStatus: "Current",
    accountType: "Mortgage"
  },
  {
    id: 2,
    accountName: "Credit Card Debt - Visa",
    accountNumber: "CCVISA7890",
    accountValue: "$5,000",
    accountStatus: "Overdue",
    accountType: "Credit Card"
  },
  {
    id: 3,
    accountName: "Auto Loan",
    accountNumber: "AUTO456789",
    accountValue: "$15,000",
    accountStatus: "Current",
    accountType: "Loan"
  },
  {
    id: 4,
    accountName: "Personal Loan from Bank",
    accountNumber: "PLN321654",
    accountValue: "$10,000",
    accountStatus: "Current",
    accountType: "Personal Loan"
  },
  {
    id: 5,
    accountName: "Medical Bills",
    accountNumber: "MED987654",
    accountValue: "$8,500",
    accountStatus: "Pending",
    accountType: "Medical Debt"
  },
  {
    id: 6,
    accountName: "Home Equity Line of Credit",
    accountNumber: "HELOC654321",
    accountValue: "$50,000",
    accountStatus: "Current",
    accountType: "Line of Credit"
  },
  {
    id: 7,
    accountName: "Student Loan",
    accountNumber: "STU159753",
    accountValue: "$30,000",
    accountStatus: "Deferred",
    accountType: "Student Loan"
  },
  {
    id: 8,
    accountName: "Utility Bills Outstanding",
    accountNumber: "UTIL852963",
    accountValue: "$1,200",
    accountStatus: "Overdue",
    accountType: "Utility Debt"
  },
  {
    id: 9,
    accountName: "Tax Liability",
    accountNumber: "TAX741852",
    accountValue: "$12,000",
    accountStatus: "Pending",
    accountType: "Taxes"
  },
  {
    id: 10,
    accountName: "Legal Fees",
    accountNumber: "LEGAL369258",
    accountValue: "$4,500",
    accountStatus: "In Process",
    accountType: "Legal Debt"
  }
];


const LiabilitiesTable: React.FC = () => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Account Name</TableHead>
            <TableHead>Account Number</TableHead>
            <TableHead>Account Value</TableHead>
            <TableHead>Account Status</TableHead>
            <TableHead>Account Type</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {LiabilitiesData.map((liability) => (
            <TableRow key={liability.id}>
              <TableCell>{liability.accountName}</TableCell>
              <TableCell>{liability.accountNumber}</TableCell>
              <TableCell>{liability.accountValue}</TableCell>
              <TableCell>{liability.accountStatus}</TableCell>
              <TableCell>{liability.accountType}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-700">
                    <DotsVerticalIcon className="w-5 h-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={() => handleViewDetails(liability.id)}>
                      View Account Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleCloseAccount(liability.id)}>
                      Close Account
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleContactOwner(liability.id)}>
                      Contact Owner
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

// Placeholder functions for dropdown actions
const handleViewDetails = (id: number) => {
  console.log(`View details for liability ID: ${id}`);
};

const handleCloseAccount = (id: number) => {
  console.log(`Close account for liability ID: ${id}`);
};

const handleContactOwner = (id: number) => {
  console.log(`Contact owner for liability ID: ${id}`);
};

export default LiabilitiesTable;

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'

interface BalanceBoxProps {
  accountName: string
  balance: number
}

const BalanceBox: React.FC<BalanceBoxProps> = ({ accountName, balance }) => {
  return (
    <Card className="w-full text-white bg-gradient-to-br from-purple-500 to-indigo-600">
      <CardContent className="p-6">
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-xl font-semibold">{accountName}</h2>
            <p className="mt-1 text-sm">Citibank Transactions</p>
          </div>
          <div className="text-right">
            <p className="text-sm">Current Balance</p>
            <p className="text-3xl font-bold">
              {balance >= 0 ? '$' : '-$'}
              {Math.abs(balance).toFixed(2)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default BalanceBox
export interface Transaction {
    id: number
    name: string
    merchant: string
    date: string
    amount: number
    category: string
    recurring: boolean
    transaction_id: string
    notes: string
    time: string
  }
"use client"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"

export type Transaction = { _id: string; description: string; amount: number; date: string; category: string }

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  useEffect(() => {
    fetch("/api/transactions")
      .then(r => r.json())
      .then(setTransactions)
  }, [])

  return (
    <div className="space-y-4">
      {transactions.map((t) => (
        <Card key={t._id} className="p-4 flex justify-between items-center">
          <div>
            <p className="font-semibold">{t.description}</p>
            <p className="text-sm text-gray-500">{new Date(t.date).toDateString()}</p>
            <p className="text-xs text-gray-600">{t.category}</p>
          </div>
          <p className="text-green-600 font-bold">₹{t.amount}</p>
        </Card>
      ))}
    </div>
  )
}

"use client"
import { useEffect, useState } from "react"
import { Transaction } from "./TransactionList"
import { Card } from "@/components/ui/card"

export default function DashboardCards() {
  const [txns, setTxns] = useState<Transaction[]>([])
  useEffect(() => {
    fetch("/api/transactions").then(r => r.json()).then(setTxns)
  }, [])

  const total = txns.reduce((sum, t) => sum + t.amount, 0)
  const recent = txns.slice(0, 3)
  const byCategory: Record<string, number> = {}
  txns.forEach(t => (byCategory[t.category] = (byCategory[t.category] || 0) + t.amount))
  const highest = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0]?.[0] || "None"

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card className="bg-indigo-100 p-4">
        <h3>Total Spent</h3>
        <p className="text-2xl font-bold">₹{total}</p>
      </Card>
      <Card className="bg-green-100 p-4">
        <h3>Top Category</h3>
        <p className="text-2xl font-bold">{highest}</p>
      </Card>
      <Card className="bg-purple-100 p-4">
        <h3>Recent Transactions</h3>
        <ul className="mt-2 space-y-1">
          {recent.map(t => <li key={t._id}>• {t.description}: ₹{t.amount}</li>)}
        </ul>
      </Card>
    </div>
  )
}

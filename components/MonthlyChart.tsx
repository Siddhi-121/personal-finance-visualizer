"use client"
import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Transaction } from "./TransactionList"

type MonthlyData = {
  month: string
  total: number
}

export default function MonthlyChart() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [data, setData] = useState<MonthlyData[]>([])

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await fetch("/api/transactions")
      const txns: Transaction[] = await res.json()
      setTransactions(txns)
    }
    fetchTransactions()
  }, [])

  useEffect(() => {
    const grouped: Record<string, number> = {}

    transactions.forEach((txn: Transaction) => {
      const date = new Date(txn.date)
      const month = date.toLocaleString("default", { month: "short", year: "numeric" })
      grouped[month] = (grouped[month] || 0) + txn.amount
    })

    const chartData: MonthlyData[] = Object.entries(grouped).map(([month, total]) => ({
      month,
      total,
    }))

    setData(chartData)
  }, [transactions])

  return (
    <div className="h-64 bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">📅 Monthly Spending</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

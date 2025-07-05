"use client"
import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Transaction } from "./TransactionList"

type MonthlyData = {
  name: string
  amount: number
}

export default function MonthlyChart() {
  const [data, setData] = useState<MonthlyData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/transactions")
        const transactions: Transaction[] = await res.json()

        const grouped: Record<string, number> = {}

        transactions.forEach((t) => {
          const month = new Date(t.date).toLocaleString("default", { month: "short", year: "numeric" })
          grouped[month] = (grouped[month] || 0) + t.amount
        })

        const chartData: MonthlyData[] = Object.entries(grouped).map(([name, amount]) => ({ name, amount }))
        setData(chartData)
      } catch (error) {
        console.error("Failed to fetch monthly transaction data", error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="h-64 bg-white p-4 rounded shadow">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

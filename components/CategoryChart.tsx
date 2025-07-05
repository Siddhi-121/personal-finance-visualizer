"use client"

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { useEffect, useState } from "react"
import { Transaction } from "./TransactionList"

const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#6b7280"]

export default function CategoryChart() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [data, setData] = useState<Array<{ name: string; value: number }>>([])

  useEffect(() => {
    fetch("/api/transactions")
      .then(async res => {
        const text = await res.text()
        try {
          const data = JSON.parse(text)
          if (Array.isArray(data)) {
            setTransactions(data)
          } else {
            console.error("Unexpected JSON structure:", data)
            setTransactions([])
          }
        } catch (err) {
          console.error("❌ JSON parse failed. Response was:", text)
          setTransactions([])
        }
      })
      .catch(err => {
        console.error("❌ Failed to fetch:", err)
        setTransactions([])
      })
  }, [])

  useEffect(() => {
    const grouped: Record<string, number> = {}
    transactions.forEach(t => {
      grouped[t.category] = (grouped[t.category] || 0) + t.amount
    })
    setData(Object.entries(grouped).map(([name, value]) => ({ name, value })))
  }, [transactions])

  return (
    <div className="h-64 bg-white p-4 rounded shadow">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" label>
            {data.map((_, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

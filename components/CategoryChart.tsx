"use client"
import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Transaction } from "./TransactionList"

const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#6b7280"]

export default function CategoryChart() {
  const [data, setData] = useState<Array<{ name: string; value: number }>>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/transactions")
        const txns: Transaction[] = await res.json()
        const grouped: Record<string, number> = {}
        txns.forEach(t => {
          grouped[t.category] = (grouped[t.category] || 0) + t.amount
        })
        setData(Object.entries(grouped).map(([name, value]) => ({ name, value })))
      } catch {
        console.error("Failed to fetch category data")
      }
    }
    fetchData()
  }, [])

  return (
    <div className="h-64 bg-white p-4 rounded shadow">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" label>
            {data.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

"use client"

import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { useEffect, useState } from "react"

export default function MonthlyChart() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/transactions")
      const txns = await res.json()

      const monthly = txns.reduce((acc: any, txn: any) => {
        const month = new Date(txn.date).toLocaleString("default", { month: "short", year: "numeric" })
        acc[month] = (acc[month] || 0) + txn.amount
        return acc
      }, {})

      const chartData = Object.entries(monthly).map(([month, total]) => ({ month, total }))
      setData(chartData)
    }

    fetchData()
  }, [])

  return (
    <div className="bg-white p-6 shadow rounded">
      <ResponsiveContainer width="100%" height={300}>
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

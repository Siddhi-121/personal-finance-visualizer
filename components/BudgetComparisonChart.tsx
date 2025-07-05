"use client"
import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Transaction } from "./TransactionList"

const COLORS = {
  budget: "#6366f1",   // Indigo
  actual: "#f59e0b",   // Amber
}

export default function BudgetComparisonChart() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const txnsRes = await fetch("/api/transactions")
      const txns: Transaction[] = await txnsRes.json()

      const budgetRes = await fetch("/api/budgets")
      const budgets: Record<string, number> = await budgetRes.json()

      // Group actual spending by category
      const actuals: Record<string, number> = {}
      txns.forEach(t => {
        actuals[t.category] = (actuals[t.category] || 0) + t.amount
      })

      // Build comparison dataset
      const categories = new Set([...Object.keys(budgets), ...Object.keys(actuals)])
      const chartData = Array.from(categories).map(cat => ({
        category: cat,
        Budget: budgets[cat] || 0,
        Actual: actuals[cat] || 0,
      }))

      setData(chartData)
    }

    fetchData()
  }, [])

  return (
    <div className="h-80 bg-white rounded shadow p-4">
      <h2 className="text-lg font-semibold mb-2">📊 Budget vs Actual Spending</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Budget" fill={COLORS.budget} />
          <Bar dataKey="Actual" fill={COLORS.actual} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

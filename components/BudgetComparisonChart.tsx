"use client"
import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Transaction } from "./TransactionList"

type BudgetMap = Record<string, number>

type ChartData = {
  category: string
  spent: number
  budget: number
}

export default function BudgetComparisonChart() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [budgets, setBudgets] = useState<BudgetMap>({})
  const [data, setData] = useState<ChartData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const [txnRes, budgetRes] = await Promise.all([
        fetch("/api/transactions"),
        fetch("/api/budgets"),
      ])
      const txns: Transaction[] = await txnRes.json()
      const budgetData: BudgetMap = await budgetRes.json()

      setTransactions(txns)
      setBudgets(budgetData)
    }

    fetchData()
  }, [])

  useEffect(() => {
    const grouped: Record<string, number> = {}

    transactions.forEach((t) => {
      grouped[t.category] = (grouped[t.category] || 0) + t.amount
    })

    const chart: ChartData[] = Object.entries(budgets).map(([category, budget]) => ({
      category,
      budget,
      spent: grouped[category] || 0,
    }))

    setData(chart)
  }, [transactions, budgets])

  return (
    <div className="h-64 bg-white p-4 rounded shadow">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budget" fill="#4f46e5" name="Budget" />
          <Bar dataKey="spent" fill="#ef4444" name="Spent" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

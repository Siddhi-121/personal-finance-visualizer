"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"

type Transaction = {
  amount: number
  category: string
}

type Budget = {
  category: string
  amount: number
}

export default function BudgetChart() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const txnsRes = await fetch("/api/transactions")
      const txnsData = await txnsRes.json()

      const budgetRes = await fetch("/api/budgets")
      const budgetData = await budgetRes.json()

      setTransactions(txnsData)
      setBudgets(budgetData)
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (!transactions.length || !budgets.length) return

    const spending: Record<string, number> = {}
    transactions.forEach(t => {
      spending[t.category] = (spending[t.category] || 0) + t.amount
    })

    const merged = budgets.map(b => ({
      category: b.category,
      budget: b.amount,
      spent: spending[b.category] || 0,
    }))

    setData(merged)
  }, [transactions, budgets])

  return (
    <div className="h-80 bg-white p-4 rounded shadow">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budget" fill="#4f46e5" name="Budget" />
          <Bar dataKey="spent" fill="#f59e0b" name="Spent" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

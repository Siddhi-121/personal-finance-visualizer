"use client"
import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Transaction } from "./TransactionList"

const CATEGORIES = ["Food", "Transport", "Rent", "Utilities", "Shopping", "Other"]

type BudgetMap = Record<string, number>

type ChartDataItem = {
  category: string
  actual: number
  budget: number
}

export default function BudgetComparisonChart() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [budgets, setBudgets] = useState<BudgetMap>({})

  useEffect(() => {
    const fetchData = async () => {
      const txnRes = await fetch("/api/transactions")
      const txnData: Transaction[] = await txnRes.json()
      setTransactions(txnData)

      const budgetRes = await fetch("/api/budgets")
      const budgetData: BudgetMap = await budgetRes.json()
      setBudgets(budgetData)
    }
    fetchData()
  }, [])

  const data: ChartDataItem[] = CATEGORIES.map(category => {
    const actual = transactions
      .filter(t => t.category === category)
      .reduce((sum, t) => sum + t.amount, 0)
    const budget = budgets[category] || 0
    return { category, actual, budget }
  })

  return (
    <div className="h-64 bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">📊 Budget vs Actual</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="actual" fill="#3b82f6" name="Actual" />
          <Bar dataKey="budget" fill="#10b981" name="Budget" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

"use client"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Transaction } from "./TransactionList"

export default function SpendingInsights() {
  const [insights, setInsights] = useState<string[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const txnsRes = await fetch("/api/transactions")
      const txns: Transaction[] = await txnsRes.json()

      const budgetRes = await fetch("/api/budgets")
      const budgets: Record<string, number> = await budgetRes.json()

      const spent: Record<string, number> = {}
      txns.forEach(t => {
        spent[t.category] = (spent[t.category] || 0) + t.amount
      })

      const messages: string[] = []

      for (const cat in budgets) {
        const budget = budgets[cat] || 0
        const actual = spent[cat] || 0

        if (actual > budget) {
          messages.push(`⚠️ You overspent in **${cat}** by ₹${actual - budget}.`)
        } else if (budget > 0 && actual < budget * 0.5) {
          messages.push(`✅ You're doing well in **${cat}**. Only ₹${actual} used out of ₹${budget}.`)
        }
      }

      if (messages.length === 0) {
        messages.push("🎉 Great job! Your spending is within budget across all categories.")
      }

      setInsights(messages)
    }

    fetchData()
  }, [])

  return (
    <Card className="p-6 bg-amber-50 space-y-2">
      <h2 className="text-xl font-bold mb-2">🔍 Spending Insights</h2>
      <ul className="list-disc list-inside space-y-1 text-sm">
        {insights.map((msg, idx) => (
          <li key={idx} dangerouslySetInnerHTML={{ __html: msg }} />
        ))}
      </ul>
    </Card>
  )
}

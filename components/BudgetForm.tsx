"use client"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const CATEGORIES = ["Food", "Transport", "Rent", "Utilities", "Shopping", "Other"]

export default function BudgetForm() {
  const [budgets, setBudgets] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch("/api/budgets")
      .then(res => res.json())
      .then(setBudgets)
  }, [])

  const handleChange = (category: string, value: string) => {
    setBudgets(prev => ({ ...prev, [category]: parseFloat(value) || 0 }))
  }

  const handleSave = async () => {
    setLoading(true)
    await fetch("/api/budgets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(budgets),
    })
    setLoading(false)
  }

  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-xl font-semibold mb-2">💰 Set Monthly Budgets</h2>
      {CATEGORIES.map(cat => (
        <div key={cat}>
          <Label>{cat}</Label>
          <Input
            type="number"
            value={budgets[cat] || ""}
            onChange={e => handleChange(cat, e.target.value)}
          />
        </div>
      ))}
      <Button onClick={handleSave} disabled={loading}>
        {loading ? "Saving..." : "Save Budgets"}
      </Button>
    </Card>
  )
}

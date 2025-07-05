"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const CATEGORIES = ["Food", "Transport", "Rent", "Utilities", "Shopping", "Other"]

export default function TransactionForm() {
  const [form, setForm] = useState({ description: "", amount: "", date: "", category: "Food" })

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!form.description || !form.amount || !form.date) return

    await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        amount: parseFloat(form.amount),
      }),
    })

    window.location.reload()
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div><Label htmlFor="description">Description</Label><Input name="description" value={form.description} onChange={handleChange} /></div>
        <div><Label htmlFor="amount">Amount</Label><Input name="amount" type="number" value={form.amount} onChange={handleChange} /></div>
        <div><Label htmlFor="date">Date</Label><Input name="date" type="date" value={form.date} onChange={handleChange} /></div>
        <div>
          <Label htmlFor="category">Category</Label>
          <select name="category" value={form.category} onChange={handleChange} className="block w-full border border-border rounded px-3 py-2">
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <Button type="submit">Add Transaction</Button>
      </form>
    </Card>
  )
}

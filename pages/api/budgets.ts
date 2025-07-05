// pages/api/budgets.ts

import type { NextApiRequest, NextApiResponse } from "next"
import mongoose from "mongoose"
import connectDB from "@/lib/mongodb"

const budgetSchema = new mongoose.Schema({
  category: String,
  amount: Number,
})

const Budget = mongoose.models.Budget || mongoose.model("Budget", budgetSchema)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB()

  if (req.method === "GET") {
  const budgets = await Budget.find()
  const response: Record<string, number> = {}
  budgets.forEach(b => (response[b.category] = b.amount))
  return res.status(200).json(response)
}

  if (req.method === "POST") {
    const updates = req.body // Expected format: { Food: 5000, Rent: 10000, ... }

    // Replace all existing with new values
    await Budget.deleteMany()

    const budgetDocs = Object.entries(updates).map(([category, amount]) => ({
      category,
      amount,
    }))

    await Budget.insertMany(budgetDocs)
    return res.status(200).json({ message: "Budgets updated" })
  }

  res.status(405).json({ message: "Method not allowed" })
}

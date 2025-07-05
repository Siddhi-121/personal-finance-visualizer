import type { NextApiRequest, NextApiResponse } from "next"
import connectDB from "@/lib/mongodb"
import mongoose from "mongoose"

const transactionSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  date: Date,
  category: String,
  budget: Number
})

const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB()

  if (req.method === "GET") {
    const data = await Transaction.find().sort({ date: -1 })
    return res.status(200).json(data)
  }

  if (req.method === "POST") {
    const txn = await Transaction.create(req.body)
    return res.status(201).json(txn)
  }

  if (req.method === "DELETE") {
    const { id } = req.query
    await Transaction.findByIdAndDelete(id)
    return res.status(200).json({ message: "Deleted" })
  }

  res.status(405).json({ message: "Method Not Allowed" })
}

"use client"

type Transaction = {
  _id: string
  description: string
  amount: number
  date: string
  category: string
}

export default function SummaryCards({
  transactions
}: {
  transactions: Transaction[]
}) {
  if (!Array.isArray(transactions)) return null

  const total = transactions.reduce((sum, t) => sum + t.amount, 0)
  const byCat: Record<string, number> = {}
  transactions.forEach(
    t => (byCat[t.category] = (byCat[t.category] || 0) + t.amount)
  )
  const topCat = Object.entries(byCat).sort(([, a], [, b]) => b - a)[0]?.[0] || "None"

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
      <div className="bg-indigo-600 rounded-md p-4">
        <h3 className="text-sm font-medium">Total Expenses</h3>
        <p className="text-2xl font-bold">₹{total.toFixed(2)}</p>
      </div>
      <div className="bg-rose-500 rounded-md p-4">
        <h3 className="text-sm font-medium">Top Category</h3>
        <p className="text-xl font-bold">{topCat}</p>
      </div>
      <div className="bg-emerald-600 rounded-md p-4">
        <h3 className="text-sm font-medium">Transactions</h3>
        <p className="text-xl font-bold">{transactions.length}</p>
      </div>
    </div>
  )
}

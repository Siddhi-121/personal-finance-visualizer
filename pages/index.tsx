"use client"
import TransactionForm from "@/components/TransactionForm"
import DashboardCards from "@/components/DashboardCards"
import CategoryChart from "@/components/CategoryChart"
import TransactionList from "@/components/TransactionList"
import BudgetForm from "@/components/BudgetForm"
import BudgetComparisonChart from "@/components/BudgetComparisonChart"
import SpendingInsights from "@/components/SpendingInsights"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">💸 Personal Finance Visualizer – Stage 3</h1>

      {/* ➕ Add Transactions */}
      <TransactionForm />

      {/* 📊 Summary Cards */}
      <DashboardCards />

      {/* 🧾 Budget Form */}
      <BudgetForm />

      {/* 🔍 Budget vs Actual Comparison */}
      <BudgetComparisonChart />

      {/* 💡 Smart Insights */}
      <SpendingInsights />

      {/* 📊 + 📋 Charts + Transactions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h2 className="text-xl font-semibold mb-2">📊 Category Breakdown</h2>
          <CategoryChart />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">📋 Transactions</h2>
          <TransactionList />
        </section>
      </div>
    </main>
  )
}

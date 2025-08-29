import React from "react"
import { dashboardStats, salesData } from "@/utils/mockData"
import StatsCards from "@/components/dashboard/StatsCards"
import SalesTimeChart from "@/components/dashboard/SalesTimeChart"
import CategorySalesChart from "@/components/dashboard/CategorySalesChart"
import PopularItems from "@/components/dashboard/PopularItems"
import RecentSales from "@/components/dashboard/RecentSales"

const Dashboard = () => {
  const salesTimeData = dashboardStats.salesByTime.map(item => ({
    name: item.time,
    amount: item.amount
  }))

  const categorySalesData = dashboardStats.salesByCategory.map(item => ({
    name: item.category,
    amount: item.amount
  }))

  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-2xl font-semibold">Dashboard</h2>

      {/* Stats Cards */}
      <StatsCards dashboardStats={dashboardStats} salesData={salesData} />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SalesTimeChart salesTimeData={salesTimeData} />
        <CategorySalesChart categorySalesData={categorySalesData} />
      </div>

      {/* Popular Items & Recent Sales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PopularItems popularItems={dashboardStats.popularItems} />
        <RecentSales recentSales={dashboardStats.recentSales} />
      </div>
    </div>
  )
}

export default Dashboard

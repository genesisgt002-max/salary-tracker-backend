import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function Dashboard() {

  const [summary, setSummary] = useState(null);

  useEffect(() => {
    api.get("summary/")
      .then(res => setSummary(res.data))
      .catch(err => {
        console.error("Failed to fetch summary:", err);
      });
  }, []);

  const [balance, setBalance] = useState(0);

  const formatCurrency = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value || 0);

  useEffect(() => {
    api.get("balance/").then(res => setBalance(res.data.balance));
  }, []);

  const data = summary
    ? [
        { name: "Income", amount: summary.total_income || summary.salary },
        { name: "Expenses", amount: summary.total_expenses || summary.expenses },
      ]
    : [];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Monthly Summary</h2>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Remaining Balance</h3>
            <p className="text-4xl font-extrabold text-green-600">
              {formatCurrency(balance)}
            </p>
          </div>

          {summary ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-green-50 rounded-lg text-center shadow">
                <p className="text-sm font-medium text-green-700 mb-1">Total Income</p>
                <p className="text-2xl font-semibold text-green-900">
                  {formatCurrency(summary.total_income || summary.salary)}
                </p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg text-center shadow">
                <p className="text-sm font-medium text-red-700 mb-1">Total Expenses</p>
                <p className="text-2xl font-semibold text-red-900">
                  {formatCurrency(summary.total_expenses || summary.expenses)}
                </p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg text-center shadow">
                <p className="text-sm font-medium text-yellow-700 mb-1">Remaining Balance</p>
                <p className="text-2xl font-semibold text-yellow-900">
                  {formatCurrency(summary.remaining_balance || summary.balance)}
                </p>
              </div>
              {/* Chart Section */}
              <div className="mt-10">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Income vs Expenses</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Legend />
                    <Bar dataKey="amount" fill="#4ade80" name="Amount" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Loading summary...</p>
          )}
        </div>
      </div>
    </div>
  );
}

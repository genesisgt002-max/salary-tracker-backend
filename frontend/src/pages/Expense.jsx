import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Expense() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const loadExpenses = () => {
    api.get("expenses/").then(res => setExpenses(res.data));
  };

  useEffect(() => {
    loadExpenses();
  }, []);


  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    api.get("categories/").then(res => setCategories(res.data));
  }, []);


  // const addExpense = async () => {
  //   await api.post("expenses/", { title, amount, date });
  //   setTitle("");
  //   setAmount("");
  //   setDate("");
  //   loadExpenses();
  // };

  const addExpense = async () => {
    await api.post("expenses/", {
      title,
      amount,
      date,
      category: category || null,
    });
    window.location.reload();
  };


  const deleteExpense = async (id) => {
    if (!window.confirm("Delete this expense?")) return;
    await api.delete(`expenses/${id}/`);
    setExpenses(expenses.filter(e => e.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">

        {/* Add Expense */}
        <div className="bg-white p-4 rounded shadow mb-6 max-w-md">
          <h3 className="font-medium mb-3">Add Expense</h3>

          <input
            className="w-full p-2 border rounded mb-2"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <select
            className="w-full p-2 border rounded mb-2"
            onChange={e => setCategory(e.target.value)}
          >
            <option value="">Select category</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>


          <input
            type="number"
            className="w-full p-2 border rounded mb-2"
            placeholder="Amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />

          <input
            type="date"
            className="w-full p-2 border rounded mb-3"
            value={date}
            onChange={e => setDate(e.target.value)}
          />

          <button
            onClick={addExpense}
            className="w-full bg-red-500 text-white py-2 rounded"
          >
            Save
          </button>
        </div>

        {/* Expense Table */}
        <div className="bg-white rounded shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Category</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(exp => (
                <tr key={exp.id} className="border-t">
                  <td className="p-3">{exp.title}</td>
                  <td className="p-3">{exp.amount}</td>
                  <td className="p-2">{exp.category_name || "-"}</td>
                  <td className="p-3">{exp.date}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => deleteExpense(exp.id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {expenses.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">
                    No expenses yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

import { useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Salary() {
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");

  const addSalary = async () => {
    await api.post("salary/", { amount, month });
    alert("Salary saved");
    setAmount("");
    setMonth("");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white p-6 rounded shadow max-w-md">
          <h3 className="font-medium mb-4">Add Salary</h3>

          <input
            type="number"
            className="w-full p-2 border rounded mb-3"
            placeholder="Amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />

          <input
            type="date"
            className="w-full p-2 border rounded mb-4"
            value={month}
            onChange={e => setMonth(e.target.value)}
          />

          <button
            onClick={addSalary}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

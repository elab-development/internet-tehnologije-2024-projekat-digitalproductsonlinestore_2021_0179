import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminCategoryChart from "../components/AdminCategoryChart";
import "../styles/AdminStatsPage.css";

const AdminStatsPage = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [chartData, setChartData] = useState([]);

  const fetchData = () => {
    const token = sessionStorage.getItem("auth_token");
    axios
      .get("/api/admin/purchases-per-category", {
        headers: { Authorization: `Bearer ${token}` },
        params: { month, year },
      })
      .then((res) => setChartData(res.data))
      .catch((err) => console.error("Failed to load chart data:", err));
  };

  useEffect(() => {
    fetchData(); // load initial
  }, []);

  return (
    <div className="admin-stats-page">
      <h2>Purchase Statistics by Category</h2>

      <div className="filter-controls">
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          <option value="">All Months</option>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <button onClick={fetchData}>Apply Filter</button>
      </div>

      {chartData.length === 0 ? (
        <p style={{ textAlign: "center", color: "#aaa", marginTop: "20px" }}>
          No orders for this date.
        </p>
      ) : (
        <AdminCategoryChart data={chartData} />
      )}
    </div>
  );
};

export default AdminStatsPage;

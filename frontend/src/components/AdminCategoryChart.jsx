// src/components/AdminCategoryChart.jsx
import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const AdminCategoryChart = ({ data }) => {
  return (
    <div className="chart-card">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" stroke="#0dcaf0" />
          <YAxis allowDecimals={false} stroke="#0dcaf0" />
          <Tooltip />
          <Bar dataKey="purchase_count" fill="#0dcaf0" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminCategoryChart;

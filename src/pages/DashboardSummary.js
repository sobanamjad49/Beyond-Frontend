import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#root");

const getStatusBadgeColor = (status) => {
  switch (status) {
    case "Pending":
      return "bg-amber-200 text-amber-800";
    case "Processing":
      return "bg-blue-200 text-blue-800";
    case "Delivered":
      return "bg-green-200 text-green-800";
    case "Cancelled":
      return "bg-red-200 text-red-800";
    case "Shipped":
      return "bg-purple-200 text-purple-800";
    default:
      return "bg-gray-200 text-gray-800";
  }
};

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateRange, setDateRange] = useState("week");
  const [detailOrder, setDetailOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const STATUS_COLORS = {
    Delivered: "#00C49F",
    Pending: "#FFBB28",
    Processing: "#8884D8",
    Cancelled: "#FF4C4C",
    Shipped: "#6b21a8",
  };

  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_SUMMARY_URL}/summary/dashboardsummary`)
      .then((res) => setSummary(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchData();
    const ws = new WebSocket(`${process.env.REACT_APP_SUMMARY_URL.replace('http', 'ws')}/alerts`);
    ws.onmessage = () => fetchData();
    return () => ws.close();
  }, []);

  useEffect(() => {
    if (!summary) return;

    let list = [...(summary.orders || [])].sort(
      (a, b) => new Date(b.time) - new Date(a.time)
    );

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayEnd.getDate() + 1);
    const weekAgo = new Date(now);
    weekAgo.setDate(now.getDate() - 6);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    list = list.filter((o) => {
      const orderDate = new Date(o.time);
      if (dateRange === "today") return orderDate >= todayStart && orderDate < todayEnd;
      if (dateRange === "week") return orderDate >= weekAgo;
      if (dateRange === "month") return orderDate >= monthStart;
      return true;
    });

    if (statusFilter) list = list.filter((o) => o.status === statusFilter);

    if (searchTerm) {
      list = list.filter(
        (o) =>
          o.id?.includes(searchTerm) ||
          o.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          o.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          o.products?.some((p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    setFilteredOrders(list);
    setCurrentPage(1);
  }, [summary, searchTerm, statusFilter, dateRange]);

  const updateOrderStatus = (id, newStatus) => {
    axios
      .put(`${process.env.REACT_APP_SUMMARY_URL}/orders/update/${id}`, { status: newStatus })
      .then(() => {
        toast.success("Order status updated!");
        fetchData();
      })
      .catch(() => toast.error("Failed to update status"));
  };

  if (!summary) return <p className="p-4">Loading...</p>;

  const salesTrend =
    summary.salesTrend?.map((el) => ({ date: el.date, sales: el.amount })) || [];
  const statusCounts = Object.entries(summary.statusCounts || {}).map(
    ([key, v]) => ({ name: key, value: v })
  );
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />

      <header className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">📊 Admin Dashboard</h1>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        <Card title="Total Profit" value={`Rs ${summary.totalProfit}`} />
        <Card title="Total Cost" value={`Rs ${summary.totalCost}`} />
        <Card title="Total Sales" value={`Rs ${summary.totalSales}`} />
        <Card title="Total Sold" value={summary.totalSold} />
        <Card title="Today's Sales" value={`Rs ${summary.todaySales}`} />
        <Card title="This Month's Sales" value={`Rs ${summary.monthSales}`} />
        <Card title="Total Orders" value={summary.orders?.length || 0} />
        <Card title="Pending Orders" value={summary.statusCounts?.Pending || 0} />
        <Card title="Delivered Orders" value={summary.statusCounts?.Delivered || 0} />
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded shadow p-4">
          <h2 className="font-semibold mb-2">📈 Sales Trend (Last 30 Days)</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesTrend}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded shadow p-4">
          <h2 className="font-semibold mb-2">📊 Order Status Breakdown</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={statusCounts}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
              >
                {statusCounts.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={STATUS_COLORS[entry.name] || "#ccc"}
                  />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="p-4 bg-white rounded shadow mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <input
            type="text"
            placeholder="Search by ID, name, or product"
            className="border p-2 flex-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border p-2"
          >
            <option value="">All Status</option>
            {statusCounts.map((s) => (
              <option key={s.name} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="border p-2"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>

        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Sr #</th>
              <th className="border p-2">ID</th>
              <th className="border p-2">Time</th>
              <th className="border p-2">Customer</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((o, index) => (
              <tr key={o.id} className="hover:bg-gray-100">
                <td className="border p-2">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="border p-2">{o.id}</td>
                <td className="border p-2">{o.time}</td>
                <td className="border p-2">{o.user?.name}</td>
                <td
                  className={`border p-2 font-medium ${getStatusBadgeColor(
                    o.status
                  )} rounded text-center`}
                >
                  {o.status}
                </td>
                <td className="border p-2">{o.amount}</td>
                <td className="border p-2">
                  <button
                    className="text-blue-500"
                    onClick={() => setDetailOrder(o)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>

        <Modal
          isOpen={!!detailOrder}
          onRequestClose={() => setDetailOrder(null)}
          style={{ content: { maxWidth: "600px", margin: "auto" } }}
        >
          {detailOrder && (
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Order Details: {detailOrder.id}
              </h2>
              <p>
                <strong>Customer:</strong> {detailOrder.user?.name}
              </p>
              <p>
                <strong>Email:</strong> {detailOrder.user?.email}
              </p>
              <p>
                <strong>Phone:</strong> {detailOrder.user?.phone}
              </p>
              <p>
                <strong>Amount:</strong> Rs {detailOrder.amount}
              </p>
              <p>
                <strong>Status:</strong> {detailOrder.status}
              </p>
              <h3 className="mt-4 font-semibold">Items:</h3>
              <ul>
                {detailOrder.products?.map((p, idx) => (
                  <li key={idx}>
                    {p.name} – Qty: {p.quantity}, Size: {p.size}, Price: Rs {p.price}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setDetailOrder(null)}
                className="mt-4 p-2 border rounded"
              >
                Close
              </button>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}

const Card = ({ title, value }) => (
  <div className="bg-white p-4 rounded shadow">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-xl font-bold">{value}</p>
  </div>
);


import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const Dashboard = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [orderStatusData, setOrderStatusData] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const usersRes = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/getusers`);
      const productsRes = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/products/getproducts`);
      const ordersRes = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/orders/allorders`);

      const users = usersRes.data;
      const products = productsRes.data;
      const orders = ordersRes.data;

      setUsersCount(users.length);
      setProductsCount(products.length);
      setOrdersCount(orders.length);

      const total = orders.reduce((sum, order) => sum + (order.total || order.totalAmount || 0), 0);
      setTotalRevenue(total);

      const pending = orders.filter(
        (order) => (order.status || order.orderStatus || "").toLowerCase() === "pending"
      ).length;
      setPendingOrders(pending);

      const statusCount = {};
      orders.forEach((order) => {
        const status = (order.status || order.orderStatus || "Unknown").toLowerCase();
        statusCount[status] = (statusCount[status] || 0) + 1;
      });

      const chartData = Object.keys(statusCount).map((status) => ({
        name: status.charAt(0).toUpperCase() + status.slice(1),
        count: statusCount[status],
      }));
      setOrderStatusData(chartData);

      // ✅ Show all orders instead of only 5
      const sorted = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setRecentOrders(sorted);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">📊 Admin Dashboard</h2>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <MetricBox label="👤 Users" value={usersCount} color="text-indigo-600" />
        <MetricBox label="🛍️ Products" value={productsCount} color="text-indigo-600" />
        <MetricBox label="📦 Orders" value={ordersCount} color="text-indigo-600" />
        <MetricBox
          label="💰 Revenue"
          value={`Rs ${Number(totalRevenue).toLocaleString()}`}
          color="text-green-600"
        />
        <MetricBox label="⏳ Pending" value={pendingOrders} color="text-yellow-500" />
      </div>

      {/* Chart */}
      <div className="bg-white shadow rounded p-6 mb-10">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">📈 Order Status Overview</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={orderStatusData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#4f46e5">
              <LabelList dataKey="count" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Orders */}
      <div className="bg-white shadow rounded p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">📝 All Orders</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4">#</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Email/Phone</th>
                <th className="py-2 px-4">Phone</th>
                <th className="py-2 px-4">Amount</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Payment</th>
                <th className="py-2 px-4">Items</th>
                <th className="py-2 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length > 0 ? (
                recentOrders.map((order, index) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">
                      {order.shippingAddress?.firstName || ""}{" "}
                      {order.shippingAddress?.lastName || "N/A"}
                    </td>
                    <td className="py-2 px-4">{order.contact?.emailOrPhone || "N/A"}</td>
                    <td className="py-2 px-4">{order.shippingAddress?.phone || "N/A"}</td>
                    <td className="py-2 px-4">
                      Rs{" "}
                      {order.total || order.totalAmount
                        ? Number(order.total || order.totalAmount).toLocaleString()
                        : "0"}
                    </td>
                    <td className="py-2 px-4 capitalize">
                      {order.status || order.orderStatus || "N/A"}
                    </td>
                    <td className="py-2 px-4">
                      {order.payment?.method === "cod"
                        ? "Cash on Delivery"
                        : order.payment?.method?.toUpperCase() || "Unpaid"}
                    </td>
                    <td className="py-2 px-4">{order.cartItems?.length || 0}</td>
                    <td className="py-2 px-4">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-4 text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const MetricBox = ({ label, value, color }) => (
  <div className="p-4 bg-white shadow rounded text-center">
    <div className="text-lg font-semibold">{label}</div>
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
  </div>
);

export default Dashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";

function DashboardOrders() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/orders/allorders`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Fetch Error:", err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      axios
        .delete(`${process.env.REACT_APP_BACKEND_URL}/orders/delete/${id}`)
        .then(() => setOrders((prev) => prev.filter((order) => order._id !== id)))
        .catch((err) => console.error("Error deleting order:", err));
    }
  };

  const filteredOrders = orders.filter((order) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      order.shippingAddress?.firstName?.toLowerCase().includes(search) ||
      order.shippingAddress?.lastName?.toLowerCase().includes(search) ||
      order.contact?.emailOrPhone?.toLowerCase().includes(search) ||
      order._id?.includes(search) ||
      order.user?.includes(search);
    const matchesStatus = statusFilter ? order.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  const indexOfLast = currentPage * ordersPerPage;
  const indexOfFirst = indexOfLast - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <div className="min-h-screen w-full bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard Orders</h1>

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name/email/order ID"
          className="px-4 py-2 w-full md:w-1/2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select
          className="px-4 py-2 w-full md:w-1/4 border border-gray-300 rounded"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">Filter by Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Shipping</th>
              <th className="p-3 text-left">Items</th>
              <th className="p-3 text-left">Payment</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="p-3 text-blue-600 font-medium break-all">{order._id}</td>
                <td className="p-3">
                  <div className="font-semibold">
                    {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}
                  </div>
                  <div className="text-xs text-gray-500">{order.contact?.emailOrPhone}</div>
                </td>
                <td className="p-3 text-xs text-gray-600">
                  {order.shippingAddress?.address}<br />
                  {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}<br />
                  Phone: {order.shippingAddress?.phone}
                </td>
                <td className="p-3">
                  {(order.cartItems || []).length > 0 ? (
                    order.cartItems.map((item, idx) => (
                      <div key={idx} className="flex gap-2 mb-2">
                        <img
                          src={item.image || "https://via.placeholder.com/40"}
                          alt={item.name}
                          className="w-10 h-10 object-cover border rounded"
                        />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs">Qty: {item.quantity} | Rs {item.price}</p>
                          {item.size && <p className="text-xs text-gray-500">Size: {item.size}</p>}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-red-400">No items</p>
                  )}
                </td>
  <td className="p-3 text-xs text-gray-700">
  {order.payment?.method && (
    <p className="font-medium mb-1">
      Method: {order.payment.method === "cod" ? "Cash on Delivery" : order.payment.method.toUpperCase()}
    </p>
  )}

  {order.payment?.method === "card" && (
    <>
      <p>Card:{order.payment.cardNumber}</p>
      <p>Expiry: {order.payment.cardExpiry}</p>
    </>
  )}

  {order.payment?.method === "wallet" && order.payment.walletName && (
    <>
      <p>Wallet: {order.payment.walletName}</p>
      <p>Wallet #: {order.payment.walletNumber}</p>
    </>
  )}

  {order.payment?.method === "bank" && order.payment.bankName && (
    <>
      <p>Bank: {order.payment.bankName}</p>
      <p>Account #: {order.payment.bankAccount}</p>
      <p>CNIC: {order.payment.cnic}</p>
    </>
  )}

  {order.payment?.method === "gpay" && order.payment.gpayId && (
    <p>GPay ID: {order.payment.gpayId}</p>
  )}
</td>


                <td className="p-3 font-bold text-green-700">Rs {Number(order.total).toLocaleString()}</td>
                <td className="p-3 capitalize">{order.status}</td>
                <td className="p-3 text-xs text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded text-sm ${
              currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DashboardOrders;

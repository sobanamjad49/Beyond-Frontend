import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const { state: order } = useLocation();
  const navigate = useNavigate();

  if (!order) {
    return (
      <div className="p-10 text-center text-xl">
        No order found.{" "}
        <button
          onClick={() => navigate("/")}
          className="text-blue-600 underline"
        >
          Go back
        </button>
      </div>
    );
  }

  const {
    _id,
    shippingAddress,
    billingAddress,
    cartItems,
    payment,
    total,
    discount,
    subtotal,
    createdAt,
  } = order;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded mt-10">
      <h1 className="text-2xl font-bold text-green-700 mb-4">
        🎉 Order Placed Successfully!
      </h1>

      <div className="text-gray-800 space-y-3">
        <p>
          <strong>Order ID:</strong> {_id}
        </p>
        <p>
          <strong>Order Date:</strong>{" "}
          {new Date(createdAt).toLocaleString()}
        </p>

        <hr className="my-4" />

        <div>
          <h2 className="font-semibold text-lg">Customer Info:</h2>
          <p>
            {shippingAddress.firstName} {shippingAddress.lastName}
          </p>
          <p>Phone: {shippingAddress.phone}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 my-4">
          <div>
            <h2 className="font-semibold text-lg">Shipping Address</h2>
            <p>{shippingAddress.address}</p>
            <p>
              {shippingAddress.city}, {shippingAddress.postalCode}
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-lg">Billing Address</h2>
            {billingAddress.sameAsShipping ? (
              <p>Same as shipping address</p>
            ) : (
              <>
                <p>
                  {billingAddress.firstName} {billingAddress.lastName}
                </p>
                <p>{billingAddress.address}</p>
                <p>
                  {billingAddress.city}, {billingAddress.postalCode}
                </p>
              </>
            )}
          </div>
        </div>

        <hr className="my-4" />

        <h2 className="font-semibold text-lg">Items:</h2>
        <div className="space-y-2">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                {item.size && (
                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                )}
                <p className="text-sm">Qty: {item.quantity}</p>
              </div>
              <div className="font-bold">
                Rs {item.price.toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        <hr className="my-4" />

        <h2 className="font-semibold text-lg">Payment Info:</h2>
        <p>
          <strong>Payment Method:</strong>{" "}
          {payment.method === "cod" ? "Cash on Delivery" : "Online Payment"}
        </p>

        <div className="mt-3 space-y-2">
          {payment.cardNumber ? (
            <>
              <p>
                <strong>Paid via:</strong> Credit/Debit Card
              </p>
              <p>
                <strong>Card Number:</strong> {payment.cardNumber}
              </p>
              <p>
                <strong>Card Expiry:</strong> {payment.cardExpiry}
              </p>
              <p>
                <strong>CVV:</strong> {payment.cardCVV}
              </p>
            </>
          ) : payment.walletName ? (
            <>
              <p>
                <strong>Paid via:</strong> Wallet
              </p>
              <p>
                <strong>Wallet:</strong> {payment.walletName}
              </p>
              <p>
                <strong>Wallet Number:</strong> {payment.walletNumber}
              </p>
            </>
          ) : payment.bankName ? (
            <>
              <p>
                <strong>Paid via:</strong> Bank Transfer
              </p>
              <p>
                <strong>Bank Name:</strong> {payment.bankName}
              </p>
              <p>
                <strong>Account Number:</strong> {payment.bankAccount}
              </p>
              <p>
                <strong>CNIC:</strong> {payment.cnic}
              </p>
            </>
          ) : payment.gpayId ? (
            <>
              <p>
                <strong>Paid via:</strong> Google Pay
              </p>
              <p>
                <strong>GPay ID:</strong> {payment.gpayId}
              </p>
            </>
          ) : (
            <p>No payment details found.</p>
          )}
        </div>

        <hr className="my-4" />

        <div className="text-right space-y-1">
          <p>
            <strong>Subtotal:</strong> Rs {subtotal.toLocaleString()}
          </p>
          <p>
            <strong>Discount:</strong> -Rs {discount.toLocaleString()}
          </p>
          <p className="text-xl font-bold text-green-700">
            Total: Rs {total.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;

import React, { useState, useEffect } from "react";
import { useCart } from "./context/CartContext";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Button from '@mui/material/Button';


function Checkout() {
  const [mainPayment, setMainPayment] = useState("cod");
  const [paymentTab, setPaymentTab] = useState("card");
  const [billingType, setBillingType] = useState("same");
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    contact: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    postalCode: "",
    phone: "",
    billingFullName: "",
    billingAddress: "",
    billingCity: "",
    billingPostalCode: "",
    billingPhone: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
    walletName: "",
    walletNumber: "",
    bankName: "",
    bankAccount: "",
    cnic: "",
    gpayId: "",
  });

  const wallets = [
    { name: "Easypaisa", icon: "📱" },
    { name: "JazzCash", icon: "📱" },
  ];

  const banks = [
    { name: "Habib Metro Bank", icon: "🏦" },
    { name: "Summit Bank", icon: "🏦" },
    { name: "Askari Bank", icon: "🏦" },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    const user = localStorage.getItem("user");
    if (!user) {
      const toastShown = sessionStorage.getItem("checkoutToastShown");
      if (!toastShown) {
        toast.error("Please register first to proceed to checkout!");
        sessionStorage.setItem("checkoutToastShown", "true");
        setTimeout(() => {
          sessionStorage.removeItem("checkoutToastShown");
        }, 1000);
      }
      navigate("/register", { state: { from: location.pathname } });
    }
  }, [navigate, location]);

  const subtotal = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  const discount = mainPayment === "online" ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

const isFormValid =
  form.contact.trim() &&
  form.firstName.trim() &&
  form.lastName.trim() &&
  form.address.trim() &&
  form.city.trim() &&
  form.postalCode.trim() &&
  form.phone.trim() &&
  (billingType === "same" || (
    form.billingFullName.trim() &&
    form.billingAddress.trim() &&
    form.billingCity.trim() &&
    form.billingPostalCode.trim() &&
    form.billingPhone.trim()
  )) &&
  cart.length > 0 &&
  (
    mainPayment === "cod" || (
      paymentTab === "card"
        ? form.cardNumber.trim() && form.cardExpiry.trim() && form.cardCVV.trim()
        : paymentTab === "wallet"
        ? form.walletName.trim() && form.walletNumber.trim()
        : paymentTab === "bank"
        ? form.bankName.trim() && form.bankAccount.trim() && form.cnic.trim()
        : paymentTab === "gpay"
        ? form.gpayId.trim()
        : false
    )
  );

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const orderData = {
        user: user._id,
        contact: {
          emailOrPhone: form.contact,
          subscribeToOffers: true,
        },
        shippingAddress: {
          firstName: form.firstName,
          lastName: form.lastName,
          address: form.address,
          city: form.city,
          postalCode: form.postalCode,
          phone: form.phone,
        },
        billingAddress:
          billingType === "same"
            ? { sameAsShipping: true }
            : {
                sameAsShipping: false,
                firstName: form.billingFullName.split(" ")[0],
                lastName: form.billingFullName.split(" ")[1] || "",
                address: form.billingAddress,
                city: form.billingCity,
                postalCode: form.billingPostalCode,
                phone: form.billingPhone,
              },
        cartItems: cart.map((item) => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          image: Array.isArray(item.images) ? item.images[0] : item.image,
        })),
        payment: {
          method: mainPayment === "online" ? paymentTab : "cod", // ✅ Fixed this line
          walletName: form.walletName,
          walletNumber: form.walletNumber,
          bankName: form.bankName,
          bankAccount: form.bankAccount,
          cnic: form.cnic,
          cardNumber: form.cardNumber,
          cardExpiry: form.cardExpiry,
          cardCVV: form.cardCVV,
          gpayId: form.gpayId,
        },
        shippingMethod: "Free Shipping",
        subtotal: subtotal,
        discount: discount,
        total: total,
      };

      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/orders/new`, orderData, {
        headers: { "Content-Type": "application/json" },
      });

      navigate("/OrderSuccess", { state: response.data });
      toast.success("Order placed successfully!");
      clearCart();
    } catch (err) {
      toast.error("Order failed. Try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-gray-50">
      <div className="max-w-6xl mx-auto py-10 px-4 flex flex-col md:flex-row">
        {/* LEFT SIDE - FORM */}
        <form className="w-full bg-white p-8 rounded shadow" onSubmit={handleOrder}>
          {/* Contact */}
          <h2 className="text-lg font-semibold mb-2">Contact</h2>
          <input type="text" name="contact" placeholder="Email or phone" className="w-full border p-2 mb-4 rounded" value={form.contact} onChange={handleInputChange} />
          <div className="mb-6">
            <label className="inline-flex items-center">
              <input type="checkbox" className="mr-2" />
              Email me with news and offers
            </label>
          </div>

          {/* Delivery */}
          <h2 className="text-lg font-semibold mb-2">Delivery</h2>
          <select className="border p-2 rounded w-full mb-2" disabled>
            <option>Pakistan</option>
          </select>
          <div className="flex gap-2 mb-2">
            <input type="text" name="firstName" placeholder="First name" className="w-1/2 border p-2 rounded" value={form.firstName} onChange={handleInputChange} />
            <input type="text" name="lastName" placeholder="Last name" className="w-1/2 border p-2 rounded" value={form.lastName} onChange={handleInputChange} />
          </div>
          <input type="text" name="address" placeholder="Address" className="w-full border p-2 mb-2 rounded" value={form.address} onChange={handleInputChange} />
          <input type="text" name="apartment" placeholder="Apartment (optional)" className="w-full border p-2 mb-2 rounded" value={form.apartment} onChange={handleInputChange} />
          <div className="flex gap-2 mb-2">
            <input type="text" name="city" placeholder="City" className="w-1/2 border p-2 rounded" value={form.city} onChange={handleInputChange} />
            <input type="text" name="postalCode" placeholder="Postal code" className="w-1/2 border p-2 rounded" value={form.postalCode} onChange={handleInputChange} />
          </div>
          <input type="text" name="phone" placeholder="Phone" className="w-full border p-2 mb-4 rounded" value={form.phone} onChange={handleInputChange} />

          {/* Shipping */}
          <h2 className="text-lg font-semibold mb-2">Shipping method</h2>
          <input type="text" value="Free" readOnly className="w-full border p-2 mb-6 bg-gray-100 rounded" />

          {/* Payment */}
          <h2 className="text-lg font-semibold mb-2">Payment</h2>
          <div className="border rounded p-4 bg-gray-50 mb-6">
            <div className="flex gap-6 mb-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="mainPayment"
                  value="cod"
                  checked={mainPayment === "cod"}
                  onChange={() => setMainPayment("cod")}
                  className="mr-2"
                />
                Cash on Delivery (COD)
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="mainPayment"
                  value="online"
                  checked={mainPayment === "online"}
                  onChange={() => setMainPayment("online")}
                  className="mr-2"
                />
                Online Payment
              </label>
            </div>

            {/* Tabs for Online Payment */}
            {mainPayment === "online" && (
              <>
                <div className="flex gap-2 mb-6">
                  {["gpay", "card", "wallet", "bank"].map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setPaymentTab(tab)}
                      className={`flex-1 border rounded py-2 px-3 flex flex-col items-center ${
                        paymentTab === tab ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"
                      }`}
                    >
                      <span className="text-2xl mb-1">
                        {tab === "gpay" && "G"}
                        {tab === "card" && "💳"}
                        {tab === "wallet" && "📱"}
                        {tab === "bank" && "🏦"}
                      </span>
                      <span className="text-xs capitalize">
                        {tab === "gpay"
                          ? "Google Pay"
                          : tab === "card"
                          ? "Card"
                          : tab === "wallet"
                          ? "Wallet"
                          : "Bank"}
                      </span>
                    </button>
                  ))}
                </div>

            {/* Conditional Payment Inputs */}
{paymentTab === "card" && (
  <div>
    <label className="block mb-2">Card Number</label>
    <input
      type="text"
      name="cardNumber"
      placeholder="1234 5678 9012 3456"
      className="w-full border p-2 rounded mb-4"
      value={form.cardNumber}
      onChange={handleInputChange}
    />
    <div className="flex gap-2">
      <input
        type="text"
        name="cardExpiry"
        placeholder="MM/YY"
        className="w-1/2 border p-2 rounded"
        value={form.cardExpiry}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="cardCVV"
        placeholder="CVV"
        className="w-1/2 border p-2 rounded"
        value={form.cardCVV}
        onChange={handleInputChange}
      />
    </div>
  </div>
)}

{paymentTab === "wallet" && (
  <div>
    <select
      name="walletName"
      className="w-full border p-2 mb-4 rounded"
      value={form.walletName}
      onChange={handleInputChange}
    >
      <option value="">Select Wallet</option>
      {wallets.map((w) => (
        <option key={w.name} value={w.name}>
          {w.icon} {w.name}
        </option>
      ))}
    </select>
    <input
      type="text"
      name="walletNumber"
      placeholder="03XX-XXXXXXX"
      className="w-full border p-2 rounded mb-2"
      value={form.walletNumber}
      onChange={handleInputChange}
    />
  </div>
)}

{paymentTab === "bank" && (
  <div>
    <select
      name="bankName"
      className="w-full border p-2 mb-4 rounded"
      value={form.bankName}
      onChange={handleInputChange}
    >
      <option value="">Select Bank</option>
      {banks.map((b) => (
        <option key={b.name} value={b.name}>
          {b.icon} {b.name}
        </option>
      ))}
    </select>
    <input
      type="text"
      name="bankAccount"
      placeholder="Account Number"
      className="w-full border p-2 rounded mb-2"
      value={form.bankAccount}
      onChange={handleInputChange}
    />
    <input
      type="text"
      name="cnic"
      placeholder="CNIC"
      className="w-full border p-2 rounded mb-2"
      value={form.cnic}
      onChange={handleInputChange}
    />
  </div>
)}

{paymentTab === "gpay" && (
  <div>
    <input
      type="text"
      name="gpayId"
      placeholder="Google Pay ID"
      className="w-full border p-2 rounded mb-2"
      value={form.gpayId}
      onChange={handleInputChange}
    />
  </div>
)}

              </>
            )}

            {mainPayment === "cod" && (
              <div className="text-green-600 text-center font-semibold py-4">
                Cash on Delivery selected.
              </div>
            )}
          </div>

          {/* Billing Address */}
          <h2 className="text-lg font-semibold mb-2">Billing address</h2>
          <div className="mb-6">
            <label>
              <input
                type="radio"
                checked={billingType === "same"}
                onChange={() => setBillingType("same")}
                className="mr-2"
              />
              Same as shipping
            </label>
            <label className="block mt-2">
              <input
                type="radio"
                checked={billingType === "different"}
                onChange={() => setBillingType("different")}
                className="mr-2"
              />
              Use different address
            </label>
          </div>

          {billingType === "different" && (
            <div className="bg-gray-100 p-4 rounded mb-6">
              <input type="text" name="billingFullName" placeholder="Full Name" className="w-full border p-2 mb-2 rounded" value={form.billingFullName} onChange={handleInputChange} />
              <input type="text" name="billingAddress" placeholder="Address" className="w-full border p-2 mb-2 rounded" value={form.billingAddress} onChange={handleInputChange} />
              <div className="flex gap-2 mb-2">
                <input type="text" name="billingCity" placeholder="City" className="w-1/2 border p-2 rounded" value={form.billingCity} onChange={handleInputChange} />
                <input type="text" name="billingPostalCode" placeholder="Postal Code" className="w-1/2 border p-2 rounded" value={form.billingPostalCode} onChange={handleInputChange} />
              </div>
              <input type="text" name="billingPhone" placeholder="Phone" className="w-full border p-2 mb-2 rounded" value={form.billingPhone} onChange={handleInputChange} />
            </div>
          )}

          <button
            className="w-full bg-black text-white py-3 rounded font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={!isFormValid || loading}
          >
            {loading ? "Placing Order..." : "Complete Order"}
          </button>
        </form>

        {/* RIGHT SIDE - SUMMARY */}
        <div className="w-full bg-gray-100 p-8 rounded shadow sticky top-0 h-fit mt-10 md:mt-0 md:ml-8">
          {cart.length > 0 ? (
            <>
              <div className="max-h-96 overflow-y-auto divide-y divide-gray-200 mb-4">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 py-4">
                    <img
                      src={Array.isArray(item.images) ? item.images[0] : item.image}
                      alt="Product"
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <div className="font-semibold truncate">{item.name}</div>
                      <div className="text-sm text-gray-500">Size: {item.size}</div>
                      <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                      <div>Rs. {Number(item.price).toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between py-2">
                <span>Subtotal</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Shipping</span>
                <span className="font-semibold">FREE</span>
              </div>
              {mainPayment === "online" && (
                <div className="flex justify-between py-2 text-green-600">
                  <span>10% Online Discount</span>
                  <span>- Rs. {discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between py-2 border-t font-bold">
                <span>Total</span>
                <span>Rs. {total.toLocaleString()}</span>
              </div>
            </>
          ) : (
            
            <div className="text-center text-gray-500 mt-10"><p>No product selected.</p>   <Button
                      fullWidth
                      variant="outlined"
                      sx={{ mt: 2 }}
                      onClick={() => navigate("/")}
                    >
                      Return to Store
                    </Button></div>
           
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;

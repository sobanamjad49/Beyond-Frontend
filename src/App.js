import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./ProductContext";
import { Toaster } from "react-hot-toast";

// Public Layout Components
import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Public Pages
import BeyondEast from "./BeyondEast";
import Register from "./Register";
import Login from "./Login";

import FestivePret from "./FestivePret";
import EmborideredPret from "./EmborideredPret";
import PrintedPret from "./PrintedPret";
import PrintedUnstitched from "./PrintedUnstitched";
import EmborideredUnstitched from "./EmborideredUnstitched";
import Abayas from "./Abayas";
import Jewellery from "./Jewellery";
import Bags from "./Bags";
import FestiveUnstitched from "./FestiveUnstitched";
import MonochromeUnstitched from "./MonochromeUnstitched";
import SummerPret from "./Summerpret";
import Modestwear from "./Modestwear";
import Accessories from "./Accessories";
import Fragrances from "./Fragrances";
import Lastchance from "./Lastchance";
import ProductDetails from "./ProductDetails";
import Checkout from "./Checkout";

// Footer Pages
import About from "./Footer/About";
import StoreLocator from "./Footer/StoreLocator";
import RefundPolicy from "./Footer/RefundPolicy";
import OrdersReturns from "./Footer/OrdersReturns";
import ShippingDelivery from "./Footer/ShippingDelivery";
import Terms from "./Footer/Terms";
import HowToPlaceOrder from "./Footer/HowToPlaceOrder";
import EditOrders from "./Footer/EditOrders";
import ItemAvailability from "./Footer/ItemAvailability";
import PaymentMethods from "./Footer/PaymentMethods";
import VoucherCodes from "./Footer/VoucherCodes";

// Admin Components
import AdminLogin from "./pages/AdminLogin";
import Sidebar from "./components/Sidebar";
import AdminNavbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import DashboardUsers from "./pages/DashboardUsers";
import DashboardProducts from "./pages/DashboardProducts";
import DashboardOrders from "./pages/DashboardOrders";
import DashboardSummary from "./pages/DashboardSummary";
import OrderSuccess from "./OrderSuccess";

// 🔐 Admin Protected Route
const AdminProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user || user.role !== "admin") {
    return <Navigate to="/adminlogin" replace />;
  }
  return children;
};
// 🧱 Admin Layout
const AdminLayout = ({ children }) => (
  <div className="flex h-screen bg-gray-100">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <AdminNavbar />
      <main className="p-4 overflow-y-auto">{children}</main>
    </div>
  </div>
);

// 🌐 Public Layout
const PublicLayout = ({ children }) => (
  <>
    <Header />
    <Navbar />
    {children}
    <Footer />
  </>
);

// Main App
function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <Router>
            <Toaster position="top-center" reverseOrder={false} />
            <Routes>
              {/* ✅ Public Pages */}
              <Route
                path="/"
                element={
                  <PublicLayout>
                    <BeyondEast />
                  </PublicLayout>
                }
              />

              <Route path="/OrderSuccess" element={<OrderSuccess />} />
              <Route
                path="/register"
                element={
                  <PublicLayout>
                    <Register />
                  </PublicLayout>
                }
              />
              <Route
                path="/login"
                element={
                  <PublicLayout>
                    <Login />
                  </PublicLayout>
                }
              />

              <Route
                path="/FestivePret"
                element={
                  <PublicLayout>
                    <FestivePret />
                  </PublicLayout>
                }
              />
              <Route
                path="/EmborideredPret"
                element={
                  <PublicLayout>
                    <EmborideredPret />
                  </PublicLayout>
                }
              />
              <Route
                path="/PrintedPret"
                element={
                  <PublicLayout>
                    <PrintedPret />
                  </PublicLayout>
                }
              />
              <Route
                path="/PrintedUnstitched"
                element={
                  <PublicLayout>
                    <PrintedUnstitched />
                  </PublicLayout>
                }
              />
              <Route
                path="/EmborideredUnstitched"
                element={
                  <PublicLayout>
                    <EmborideredUnstitched />
                  </PublicLayout>
                }
              />
              <Route
                path="/Abayas"
                element={
                  <PublicLayout>
                    <Abayas />
                  </PublicLayout>
                }
              />
              <Route
                path="/Jewellery"
                element={
                  <PublicLayout>
                    <Jewellery />
                  </PublicLayout>
                }
              />
              <Route
                path="/Bags"
                element={
                  <PublicLayout>
                    <Bags />
                  </PublicLayout>
                }
              />
              <Route
                path="/FestiveUnstitched"
                element={
                  <PublicLayout>
                    <FestiveUnstitched />
                  </PublicLayout>
                }
              />
              <Route
                path="/MonochromeUnstitched"
                element={
                  <PublicLayout>
                    <MonochromeUnstitched />
                  </PublicLayout>
                }
              />
              <Route
                path="/SummerPret"
                element={
                  <PublicLayout>
                    <SummerPret />
                  </PublicLayout>
                }
              />
              <Route
                path="/Modestwear"
                element={
                  <PublicLayout>
                    <Modestwear />
                  </PublicLayout>
                }
              />
              <Route
                path="/Accessories"
                element={
                  <PublicLayout>
                    <Accessories />
                  </PublicLayout>
                }
              />
              <Route
                path="/Fragrances"
                element={
                  <PublicLayout>
                    <Fragrances />
                  </PublicLayout>
                }
              />
              <Route
                path="/Lastchance"
                element={
                  <PublicLayout>
                    <Lastchance />
                  </PublicLayout>
                }
              />
              <Route
                path="/productdetails/:id"
                element={
                  <PublicLayout>
                    <ProductDetails />
                  </PublicLayout>
                }
              />
              <Route
                path="/Checkout"
                element={
                  <PublicLayout>
                    <Checkout />
                  </PublicLayout>
                }
              />

              {/* ✅ Footer Pages */}
              <Route
                path="/About"
                element={
                  <PublicLayout>
                    <About />
                  </PublicLayout>
                }
              />
              <Route
                path="/StoreLocator"
                element={
                  <PublicLayout>
                    <StoreLocator />
                  </PublicLayout>
                }
              />
              <Route
                path="/RefundPolicy"
                element={
                  <PublicLayout>
                    <RefundPolicy />
                  </PublicLayout>
                }
              />
              <Route
                path="/OrdersReturns"
                element={
                  <PublicLayout>
                    <OrdersReturns />
                  </PublicLayout>
                }
              />
              <Route
                path="/ShippingDelivery"
                element={
                  <PublicLayout>
                    <ShippingDelivery />
                  </PublicLayout>
                }
              />
              <Route
                path="/Terms"
                element={
                  <PublicLayout>
                    <Terms />
                  </PublicLayout>
                }
              />
              <Route
                path="/HowToPlaceOrder"
                element={
                  <PublicLayout>
                    <HowToPlaceOrder />
                  </PublicLayout>
                }
              />
              <Route
                path="/EditOrders"
                element={
                  <PublicLayout>
                    <EditOrders />
                  </PublicLayout>
                }
              />
              <Route
                path="/ItemAvailability"
                element={
                  <PublicLayout>
                    <ItemAvailability />
                  </PublicLayout>
                }
              />
              <Route
                path="/PaymentMethods"
                element={
                  <PublicLayout>
                    <PaymentMethods />
                  </PublicLayout>
                }
              />
              <Route
                path="/VoucherCodes"
                element={
                  <PublicLayout>
                    <VoucherCodes />
                  </PublicLayout>
                }
              />

              {/* ✅ Admin Login */}
              <Route path="/adminlogin" element={<AdminLogin />} />

              {/* ✅ Admin Dashboard Routes (Protected) */}
              <Route
                path="/dashboard"
                element={
                  <AdminProtectedRoute>
                    <AdminLayout>
                      <Dashboard />
                    </AdminLayout>
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="/DashboardUsers"
                element={
                  <AdminProtectedRoute>
                    <AdminLayout>
                      <DashboardUsers />
                    </AdminLayout>
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="/DashboardProducts"
                element={
                  <AdminProtectedRoute>
                    <AdminLayout>
                      <DashboardProducts />
                    </AdminLayout>
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="/DashboardOrders"
                element={
                  <AdminProtectedRoute>
                    <AdminLayout>
                      <DashboardOrders />
                    </AdminLayout>
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="/DashboardSummary"
                element={
                  <AdminProtectedRoute>
                    <AdminLayout>
                      <DashboardSummary />
                    </AdminLayout>
                  </AdminProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;

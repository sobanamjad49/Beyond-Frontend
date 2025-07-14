
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartKey, setCartKey] = useState("cart_guest");

  // ✅ Get cart key from current user
  const getUserKey = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.email ? `cart_${user.email}` : "cart_guest";
  };

  // ✅ Load cart based on user
  const loadCart = () => {
    const key = getUserKey();
    const storedCart = localStorage.getItem(key);
    setCartKey(key);
    setCart(storedCart ? JSON.parse(storedCart) : []);
  };

  // ✅ Initial load
  useEffect(() => {
    loadCart();
  }, []);

  // ✅ Listen to login/logout/user change
  useEffect(() => {
    const handler = () => loadCart();
    window.addEventListener("login", handler);
    window.addEventListener("logout", handler);
    window.addEventListener("userChanged", handler);
    return () => {
      window.removeEventListener("login", handler);
      window.removeEventListener("logout", handler);
      window.removeEventListener("userChanged", handler);
    };
  }, []);

  // ✅ Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }, [cart, cartKey]);

  // ✅ Cart operations
  const addToCart = (item) => {
    const index = cart.findIndex(
      (i) => i._id === item._id && i.size === item.size
    );
    let updatedCart = [...cart];
    if (index !== -1) {
      updatedCart[index].quantity += item.quantity;
    } else {
      updatedCart.push(item);
    }
    setCart(updatedCart);
    toast.success("Item added to cart");
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    toast.success("Item removed");
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const updateCartQuantity = (index, quantity) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = quantity;
    setCart(updatedCart);
    toast.success("Quantity updated");
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const clearCart = (removeStorage = true) => {
    setCart([]);
    if (removeStorage) {
      localStorage.removeItem(cartKey);
    }
    toast.success("Cart cleared");
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        totalItems,
        totalAmount,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

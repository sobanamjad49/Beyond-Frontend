import React, { createContext, useContext, useEffect, useState } from "react";

const ProductContext = createContext();

export function useProducts() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   fetch(`${process.env.REACT_APP_BACKEND_URL}/products/getproducts`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched products:", data); // ✅ helpful debug
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products", err);
        setLoading(false);
      });
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading }}>
      {children}
    </ProductContext.Provider>
  );
}

import axios from "axios";
import React, { useEffect, useState } from "react";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
  axios.get(`${process.env.REACT_APP_BASE_URL}/products/getproducts`)
.then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          {/* Show all images */}
          {product.images && product.images.length > 0 ? (
            product.images.map((img, idx) => (
              <img key={idx} src={img} alt="" width={100} />
            ))
          ) : (
            product.src && <img src={product.src} alt="" width={100} />
          )}
          <div>{product.description || product.category}</div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;

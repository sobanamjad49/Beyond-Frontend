import React, { useEffect, useRef, useState } from "react";
import { useProducts } from "./ProductContext"; // ✅ use shared context
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCart } from "./context/CartContext";
import toast from "react-hot-toast";
function ProductDetails() {
   const navigate = useNavigate();
  const { id } = useParams();
  const { products, loading } = useProducts(); // ✅ use global context
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const scrollAmount = 320;
  const ref2 = useRef(null);
 const { addToCart } = useCart();
   const product = products.find((item) => item._id?.toString() === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product?.images?.length > 0) {
      setMainImage(product.images[0]);
    }
  }, [product]);

  const scroll = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };
const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }
  const item = {
  ...product,
  quantity,
  size: selectedSize,
  price: Number(product.price),
  name: product.description,
};

    addToCart(item);


  };

  const handleBuyNow = () => {
    if (!selectedSize) {
    

      alert("Please select a size before proceeding to checkout.");
      return;
    }
    handleAddToCart();
    const selectedProduct = {
    id: product._id,
    name: product.description,
    price: Number(product.price),  
    image: product.images[0],
  size: selectedSize, 
    quantity,
  };

  localStorage.setItem("checkoutProduct", JSON.stringify(selectedProduct));
  navigate("/Checkout");
  };
  if (loading || !product) {
    return (
      <div className="text-center py-10 text-lg font-semibold text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <div>
      {/* Mobile image slider buttons */}
      <button
        onClick={() => scroll(ref2, "left")}
        className="sm:hidden block absolute mt-4 left-0 -translate-y-1/2 bg-black text-white px-3 py-1 rounded shadow z-10"
      >
        ⬅
      </button>
      <button
        onClick={() => scroll(ref2, "right")}
        className="sm:hidden block absolute right-0 mt-4 -translate-y-1/2 bg-black text-white px-3 py-1 rounded shadow z-10"
      >
        ➡
      </button>

      {/* Mobile images row */}
      <div className="w-full mt-2 sm:hidden block">
        <div
          ref={ref2}
          className="flex overflow-x-auto scroll-smooth space-x-4 scrollbar-hide px-4"
        >
          {product.images.map((item, index) => (
            <img key={index} src={item} alt={`img-${index}`} />
          ))}
        </div>
      </div>

      {/* Main Product Section */}
      <div className="flex mt-8 gap-4">
        {/* Side thumbnails (desktop) */}
        <div className="flex flex-col hidden sm:block space-y-1">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index}`}
              className={`w-20 h-20 ml-[10px] object-cover cursor-pointer border-2 ${
                mainImage === img ? "border-black" : "border-gray-200"
              }`}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>

        {/* Main image (desktop) */}
        <div className="hidden sm:block">
          <img
            src={mainImage}
            alt="Main Product"
            className="w-full sm:max-w-[600px] md:max-w-[600px] lg:max-w-[400px] xl:max-w-[700px] 2xl:max-w-[1000px] max-w-[1200px] mx-auto shadow"
          />
        </div>

        {/* Product details */}
        <div>
          <div className="space-y-1 text-left ml-4">
            <p className="text-4xl font-semibold">{product.description}</p>
            <p className="text-lg font-medium mt-5">PKR {product.price}</p>

            {/* Size buttons */}
            <div
              className="flex flex-wrap gap-3 mt-5"
              style={{ marginTop: "20px" }}
            >
              {product.Size?.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`text-lg px-3 py-1 border rounded ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "bg-white text-black border-black"
                  }`}
                >
                 {size}
                </button>
              ))}
            </div>

            {/* Quantity selector */}
             <div className="mt-5 flex items-center border w-fit px-3 py-1 gap-3"  style={{ marginTop: "20px" }}>
            <button
              onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
              className="px-2 py-1 text-lg hover:bg-black hover:text-white"
            >
              −
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-2 py-1 text-lg hover:bg-black hover:text-white"
            >
              +
            </button>
          </div>

            {/* Discount notice */}
            <div
              className="border border-black p-4 bg-[#fdf7f1] space-y-2 mt-5"
              style={{ marginTop: "20px" }}
            >
              <p className="text-sm font-semibold text-center">
                PAY ONLINE & GET A 10% DISCOUNT!
              </p>
              <p className="text-sm text-center">
                USE CODE: <b>PREPAID10%</b>
              </p>
              <div className="text-center text-gray-800 text-base font-semibold ">
              PKR {(product.price * 0.9).toFixed(0)}
                <span className="line-through text-sm  ml-3">
          PKR {product.price}
                </span>
              </div>

              {/* Payment Icons */}
              <div className="flex justify-center gap-4 mt-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
                  alt="MasterCard"
                  className="h-5"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                  alt="Visa"
                  className="h-5"
                />
                <img
                  src="https://crystalpng.com/wp-content/uploads/2024/10/Easypaisa-logo.png"
                  alt="Easypaisa"
                  className="h-6 w-6"
                />
                <img
                  src="https://vectorseek.com/wp-content/uploads/2024/12/JazzCash-2025-Logo-PNG-Vector.png"
                  alt="JazzCash"
                  className="h-5"
                />
              </div>
            </div>

            {/* Size chart modal trigger */}
            <button
              style={{ marginTop: "20px" }}
              onClick={() => setIsOpen(true)}
              className="underline text-sm font-medium cursor-pointer mt-5"
            >
              SIZE CHART
            </button>

            {/* Size Chart Modal */}
            {isOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="bg-white max-w-4xl w-full p-6 rounded-lg shadow-lg relative overflow-auto max-h-[90vh]">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-3 right-4 text-xl font-bold text-gray-600 hover:text-black"
                  >
                    &times;
                  </button>
                  <h2 className="text-xl font-semibold mb-4">Size Chart</h2>
                  <h3 className="text-sm font-semibold mb-1">SHIRT</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-xs border border-gray-300">
                      <thead className="bg-gray-100">
                        <tr>
                          {[
                            "Sizes",
                            "NECK WIDTH",
                            "SHOULDER",
                            "CHEST",
                            "LENGTH",
                            "ARMHOLE",
                            "SLEEVE LENGTH",
                          ].map((head, i) => (
                            <th key={i} className="border px-2 py-1">
                              {head}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["XS", "7", "14", "18", "44", "9", "22"],
                          ["S", "7", "14.5", "19", "45", "9.5", "22"],
                          ["M", "7.25", "15.25", "20", "46", "10", "23"],
                          ["L", "7.25", "16", "21.5", "47", "10.75", "23"],
                        ].map((row, idx) => (
                          <tr key={idx} className="text-center">
                            {row.map((cell, i) => (
                              <td key={i} className="border px-2 py-1">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-sm font-semibold mt-6 mb-1">BOTTOM</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-xs border border-gray-300">
                      <thead className="bg-gray-100">
                        <tr>
                          {["Sizes", "LENGTH", "WAIST"].map((head, i) => (
                            <th key={i} className="border px-2 py-1">
                              {head}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["XS", "35", "20.5"],
                          ["S", "36", "21.5"],
                          ["M", "36", "22.5"],
                          ["L", "37", "23.5"],
                        ].map((row, idx) => (
                          <tr key={idx} className="text-center">
                            {row.map((cell, i) => (
                              <td key={i} className="border px-2 py-1">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {/* Add/Buy buttons */}
          <div className="mt-5 space-y-3"  style={{ marginTop: "20px" }}>
            <button
              className="w-full bg-white border border-black text-black font-semibold py-3 rounded hover:bg-black hover:text-white"
              onClick={handleAddToCart}
            >
              ADD TO CART • PKR {product.price}
            </button>
            <button
              className="w-full bg-[#c7744c] text-white font-semibold py-3 rounded hover:bg-[#aa5a34]"
              onClick={handleBuyNow}
            >
              BUY IT NOW
            </button>
          </div>

            {/* Delivery Info */}
          <div
  className="text-xs text-gray-600 space-y-2 mt-5"
  style={{ marginTop: "20px", marginBottom: "10px" }}
>
  <p>
    <b>🚚 Delivery:</b> Standard delivery in 3–5 business days.
  </p>
  <p>
    <b>🔁 Return:</b> Easy 7-days return & exchange policy.
  </p>
  <p>
    <b>📦 Note:</b> All orders are carefully quality-checked and packed with care before dispatch.
  </p>
  <p>
    <b>📞 Support:</b> 24/7 customer support available for any queries or assistance.
  </p>
  <p>
    <b>✔️ Guarantee:</b> 100% original products – trusted by thousands of happy customers.
  </p>
  <p>
    <b>🎁 Packaging:</b> Premium eco-friendly packaging for every order.
  </p>
  <p>
    <b>💳 Payment:</b> Secure online payments via Card, Wallets, Bank Transfer & COD.
  </p>
  <p>
    <b>📧 Confirmation:</b> Instant order confirmation via email & SMS.
  </p>
  <p>
    <b>📍 Tracking:</b> Live order tracking available after dispatch.
  </p>
  <p>
    <b>🛡️ Privacy:</b> Your personal information is safe and never shared.
  </p>
</div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./context/CartContext";
import toast from "react-hot-toast";

const HoverSlideshowCard = ({
  _id,
  images = [],
  description,
  description1,
  price,
  ...product
}) => {
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [cycleId, setCycleId] = useState(0);
  const duration = 1500;
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Preload images
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  useEffect(() => {
    let interval;
    if (hovering && images.length > 1) {
      setAnimate(true);
      interval = setInterval(() => {
        setIndex((prev) => {
          const next = (prev + 1) % images.length;
          if (next === 0) setCycleId((id) => id + 1);
          return next;
        });
      }, duration);
    } else {
      setIndex(0);
      setAnimate(false);
      setCycleId(0);
    }
    return () => clearInterval(interval);
  }, [hovering, images.length]);

  useEffect(() => {
    if (hovering) {
      setAnimate(false);
      const timeout = setTimeout(() => setAnimate(true), 50);
      return () => clearTimeout(timeout);
    }
  }, [index, hovering]);

  // Add to cart handler
  const handleAddToCart = (e) => {
    e.stopPropagation(); // prevent navigation
    const item = {
      ...product,
      _id,
      images,
      name: description,
      price: Number(price),
      quantity: 1,
      size: product?.Size?.[0] || "",
    };
    addToCart(item);
    
  };

  return (
    <div className="flex flex-col">
      {/* Image and hover area */}
      <div
        className="relative group h-[24rem] w-[320px] flex-shrink-0 overflow-hidden transition duration-300 border border-gray-200 mr-4 cursor-pointer"
        onClick={() => navigate(`/productdetails/${_id}`)}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {/* Progress Bars */}
        {hovering && (
          <div className="absolute top-0 left-0 w-full h-full flex space-x-[2px] px-2 pt-1 z-10">
            {images.map((_, i) => (
              <div key={i} className="flex-1 h-[3px] bg-gray-300 overflow-hidden rounded">
                <div
                  key={`${i}-${index === i ? cycleId : 0}`}
                  className={`h-full bg-black transition-all ease-linear ${
                    animate && index === i ? "w-full" : i < index ? "w-full" : "w-0"
                  }`}
                  style={{ transitionDuration: `${duration}ms` }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Main image */}
        <img
          src={images[index]}
          alt={`Slide ${index + 1}`}
          className="w-full h-full object-cover object-contain bg-gray-100"
        />

        {/* Add to Cart Button */}
        {hovering && (
          <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-100 transition-opacity duration-300 z-20">
            <button
              className="px-4 py-2 text-sm font-semibold text-white rounded transition bg-green-600 hover:bg-white hover:text-green-600 shadow-lg"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        )}
      </div>

      {/* Product Description */}
      <div className="mt-2 text-center space-y-1">
        <p className="text-base font-medium">{description || "No Description"}</p>
        <p className="text-xs">{description1 || "No Additional Info"}</p>
        <p className="text-sm font-medium">PKR {price || 0}</p>
      </div>
    </div>
  );
};

export default HoverSlideshowCard;

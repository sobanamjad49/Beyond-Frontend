
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./context/CartContext";
import toast from "react-hot-toast";

const HoverSlideshowCardGrid = ({
  images = [],
  _id,
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
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Preload images
  useEffect(() => {
    images.forEach((img) => {
      const preload = new Image();
      preload.src = img;
    });
  }, [images]);

  // Cycle images on hover
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
    e.stopPropagation();
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
    <div className="flex flex-col w-full">
      {/* Card container */}
      <div
        className="relative group w-full h-full overflow-hidden border border-gray-200 bg-gray-100 cursor-pointer"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onClick={() => navigate(`/productdetails/${_id}`)}
      >
        {/* Progress Bars */}
        {hovering && (
          <div className="absolute top-0 left-0 w-full flex space-x-[2px] px-2 pt-1 z-10">
            {images.map((_, i) => (
              <div
                key={i}
                className="flex-1 h-[3px] bg-gray-300 overflow-hidden rounded"
              >
                <div
                  key={`${i}-${index === i ? cycleId : 0}`}
                  className={`h-full bg-black transition-all ease-linear ${
                    animate && index === i
                      ? "w-full"
                      : i < index
                      ? "w-full"
                      : "w-0"
                  }`}
                  style={{ transitionDuration: `${duration}ms` }}
                ></div>
              </div>
            ))}
          </div>
        )}

        {/* Image */}
        <img
          src={images[index]}
          alt={`Slide ${index + 1}`}
          className="w-full object-cover"
        />

        {/* Hover Add to Cart Button */}
        <div
          className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
        >
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 text-sm font-semibold text-white rounded transition bg-green-600 hover:bg-white hover:text-green-600"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Descriptions */}
      <p className="text-sm mt-2 font-medium">{description}</p>
      <p className="text-xs text-gray-600">{description1}</p>
      <p className="text-sm font-medium">PKR {price}</p>
    </div>
  );
};

export default HoverSlideshowCardGrid;

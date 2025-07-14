import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./context/CartContext";

const HoverSlideshowCard1 = ({
  images,
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
  const { addToCart } = useCart();
  const navigate = useNavigate();
  // ✅ Preload images
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  useEffect(() => {
    let interval;
    if (hovering) {
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
    <div className="flex flex-col ">
      {/* Card */}
      <div
        className="relative group w-40 h-60 lg:w-[18rem] lg:h-96  flex-shrink-0 overflow-hidden transition duration-300 border border-gray-200 mr-5 cursor-pointer"
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
          className=" w-40 h-60  lg:w-[18rem] lg:h-96 object-cover object-contain   bg-gray-100"
        />

        {/* Add to Cart Button on Hover */}
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

      {/* Description below card */}
      <p className="text-sm mt-2 font-medium ">{description}</p>
      <p className="text-xs ">{description1}</p>
      <p className="text-sm  font-medium ">PKR {price}</p>
    </div>
  );
};

export default HoverSlideshowCard1;

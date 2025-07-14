import React, { useEffect, useState } from "react";

const ImageSlideshow = ({ images = [], interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    if (images.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (images.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden">
      {/* Slide Image */}
      <div className="w-full">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-contain  transition-all duration-500"
        />
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full border border-white ${
              index === currentIndex ? "bg-white" : "bg-transparent"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ImageSlideshow;

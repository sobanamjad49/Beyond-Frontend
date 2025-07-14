import React, { useEffect } from "react";

function About() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on load
  }, []);

  return (
    <div className="bg-white text-gray-900 px-4 sm:px-8 py-10 max-w-4xl mx-auto">
      {/* ABOUT US */}
      <h1 className="text-2xl sm:text-3xl font-semibold mb-4">ABOUT US</h1>

      {/* WHO WE ARE */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-2 mt-8">WHO WE ARE</h2>
      <p className="text-base leading-7 mb-6">
        Founded in 2020, Beyond East celebrates the timeless elegance of Eastern fashion while embracing the dynamism of global trends. In just a few years, we have become a trusted name in the industry, offering designs that seamlessly blend traditional craftsmanship with modern aesthetics. Whether you're seeking classic Eastern wear or Western-inspired pieces, Beyond East is your destination for fashion that goes beyond limits.
      </p>

      {/* OUR MISSION */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-2 mt-8">OUR MISSION</h2>
      <p className="text-base leading-7 mb-6">
        To redefine fashion by seamlessly blending Eastern traditions with contemporary styles, offering premium-quality apparel that inspires confidence and creativity.
      </p>

      {/* OUR VISION */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-2 mt-8">OUR VISION</h2>
      <p className="text-base leading-7 mb-6">
        As envisioned by CEO Jawad Khawaja, Beyond East strives to become the go-to brand for the new generation, bringing quality, style, and innovation to every wardrobe. We aim to expand our presence across all major cities of Pakistan and take Beyond East to the global stage, showcasing our unique designs and craftsmanship to the world.
      </p>

      {/* WHAT WE DO */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-2 mt-8">WHAT WE DO</h2>
      <p className="text-base leading-7 mb-3">
        We offer a diverse range of fashion choices tailored to fit every occasion and style:
      </p>
      <ul className="list-disc pl-5 space-y-2 text-base mb-6">
        <li>
          <strong>Eastern Wear:</strong> A curated selection of pret (ready-to-wear) and unstitched fabrics. Featuring intricate embroidered and printed designs that honor our rich heritage.
        </li>
        <li>
          <strong>Western Wear:</strong> A wide range of collection inspired by global trends. Designed to meet the style preferences of the modern fashion enthusiast.
        </li>
      </ul>

      {/* WHY CHOOSE US */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-2 mt-8">WHY CHOOSE US</h2>
      <ul className="list-disc pl-5 space-y-2 text-base mb-6">
        <li><strong>Founded on Excellence:</strong> Since 2020, we have built a reputation for delivering timeless designs and unparalleled quality.</li>
        <li><strong>Proudly Made with Care:</strong> Every piece is expertly crafted with precision and attention to detail, ensuring the highest & premium quality standards.</li>
        <li><strong>Inclusive Fashion:</strong> From casual ensembles to formal attire, we offer something for every occasion and individual taste.</li>
      </ul>

      {/* OUR VALUES */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-2 mt-8">OUR VALUES</h2>
      <ul className="list-disc pl-5 space-y-2 text-base mb-6">
        <li><strong>Craftsmanship:</strong> Preserving the art of traditional design while embracing modern techniques.</li>
        <li><strong>Innovation:</strong> Constantly evolving to meet the needs of our diverse and dynamic clientele.</li>
        <li><strong>Excellence:</strong> Delivering high-quality products that reflect our commitment to style and durability.</li>
      </ul>

      {/* OUR OUTLETS */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-2 mt-8">OUR OUTLETS</h2>
      <p className="text-base leading-7 mb-6">
        Visit us at our exclusive locations to experience the style and quality of Beyond East in person.
      </p>


      {/* CONTACT */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-2 mt-8">CONTACT US</h2>
      <p className="text-base leading-7 mb-1">
        Immerse yourself in the essence of Beyond East, where every thread tells a story, and every design celebrates individuality.
      </p>
    
    </div>
  );
}

export default About;

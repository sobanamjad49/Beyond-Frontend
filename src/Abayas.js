import React, { useEffect, useState } from "react";
import HoverSlideshowCardGrid from "./HoverSlideshowCardGrid";
import {
  ViewColumnsIcon,
  Squares2X2Icon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import { useProducts } from "./ProductContext"; // ✅ dynamic shared context

function Abayas() {
  const { products, loading } = useProducts(); // fetch from global context
  const [columns, setColumns] = useState(2);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const filtered = products.filter(
      (product) => product.category === "Abayasimages"
    );
    setFilteredProducts(filtered);
  }, [products]);

  let gridClass = "grid-cols-3";
  if (columns === 2) gridClass = "grid-cols-2";
  if (columns === 3) gridClass = "grid-cols-3";
  if (columns === 4) gridClass = "grid-cols-4";

  if (loading) {
    return <div className="text-center py-10 text-xl">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-center text-4xl font-medium mb-4 uppercase">
        Modest Wear
      </h2>

      <div className="flex justify-end gap-2 mb-4">
        <button
          onClick={() => setColumns(2)}
          className={`p-2 border rounded ${columns === 2 ? "bg-black text-white" : ""}`}
          title="2 Columns"
        >
          <ViewColumnsIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => setColumns(3)}
          className={`p-2 border rounded ${columns === 3 ? "bg-black text-white" : ""}`}
          title="3 Columns"
        >
          <Squares2X2Icon className="w-5 h-5" />
        </button>
        <button
          onClick={() => setColumns(4)}
          className={`p-2 border rounded ${columns === 4 ? "bg-black text-white" : ""}`}
          title="4 Columns"
        >
          <TableCellsIcon className="w-5 h-5" />
        </button>
      </div>

      <div className={`grid ${gridClass} gap-4`}>
        {filteredProducts.map((item, index) => (
          <HoverSlideshowCardGrid
            key={index}
            images={item.images}
           _id={item._id}
            description={item.description}
            description1={item.description1}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}

export default Abayas;

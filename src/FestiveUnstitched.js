import React, { useEffect, useState } from "react";
import HoverSlideshowCardGrid from "./HoverSlideshowCardGrid";
import {
  ViewColumnsIcon,
  Squares2X2Icon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import { useProducts } from "./ProductContext"; // ✅ shared context

function FestiveUnstitched() {
  const { products, loading } = useProducts();
  const [columns, setColumns] = useState(2);
  const [festiveUnstitchedItems, setFestiveUnstitchedItems] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const filtered = products.filter(
      (item) => item.category === "FestiveUnstitchedimages"
    );
    setFestiveUnstitchedItems(filtered);
  }, [products]);

  let gridClass = "grid-cols-3";
  if (columns === 2) gridClass = "grid-cols-2";
  if (columns === 3) gridClass = "grid-cols-3";
  if (columns === 4) gridClass = "grid-cols-4";

  // ✅ Show loader while fetching data
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="text-lg text-gray-600 font-medium animate-pulse">
          Loading ...
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-center text-4xl font-medium mb-4 uppercase">
        Festive Unstitched
      </h2>

      {/* Grid switcher buttons */}
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

      {/* Product grid */}
    {festiveUnstitchedItems.length === 0 ? (
  <div className="text-center py-20 text-gray-500 text-lg">
    No festive unstitched items found.
  </div>
) : (
  <div className={`grid ${gridClass} gap-4`}>
    {festiveUnstitchedItems.map((item) => (
      <HoverSlideshowCardGrid key={item.id} {...item} />
    ))}
  </div>
)}

    </div>
  );
}

export default FestiveUnstitched;

import React, { useEffect, useState } from "react";
import HoverSlideshowCardGrid from "./HoverSlideshowCardGrid";
import {
  ViewColumnsIcon,
  Squares2X2Icon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import { useProducts } from "./ProductContext"; // ✅ Use shared product context

function PrintedUnstitched() {
  const { products, loading } = useProducts(); // ✅ Get products & loading from context
  const [columns, setColumns] = useState(2);
  const [printedUnstitchedItems, setPrintedUnstitchedItems] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const filtered = products.filter(
      (item) => item.category === "PrintedUnstitchedimages"
    );
    setPrintedUnstitchedItems(filtered);
  }, [products]);

  const gridClass =
    columns === 2 ? "grid-cols-2" :
    columns === 3 ? "grid-cols-3" :
    "grid-cols-4";

  if (loading) {
    return (
      <div className="text-center py-10 text-lg font-semibold text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-center text-4xl font-medium mb-4 uppercase">
        Printed Unstitched
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
      <div className={`grid ${gridClass} gap-4`}>
        {printedUnstitchedItems.map((item, index) => (
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

export default PrintedUnstitched;

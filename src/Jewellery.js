// import React, { useEffect, useState } from "react";
// import HoverSlideshowCardGrid from "./HoverSlideshowCardGrid";
// import {
//   ViewColumnsIcon,
//   Squares2X2Icon,
//   TableCellsIcon,
// } from "@heroicons/react/24/outline";
// import { allProducts } from "./productList";

// function Jewellery() {
//   const [columns, setColumns] = useState(2);
//   const [jewelleryItems, setJewelleryItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     setLoading(true);

//     // Simulate async data load
//     setTimeout(() => {
//       const filtered = allProducts.filter(
//         (item) => item.category === "jewelleryimages"
//       );
//       setJewelleryItems(filtered);
//       setLoading(false);
//     }, 200); // Simulated delay (optional)
//   }, []);

//   let gridClass = "grid-cols-3";
//   if (columns === 2) gridClass = "grid-cols-2";
//   if (columns === 3) gridClass = "grid-cols-3";
//   if (columns === 4) gridClass = "grid-cols-4";

//   if (loading) {
//     return (
//       <div className="text-center py-10 text-xl font-medium text-gray-700">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div className="p-4">
//       <h2 className="text-center text-4xl font-medium mb-4 uppercase">
//         Jewellery
//       </h2>

//       {/* Grid switcher buttons */}
//       <div className="flex justify-end gap-2 mb-4">
//         <button
//           onClick={() => setColumns(2)}
//           className={`p-2 border rounded ${
//             columns === 2 ? "bg-black text-white" : ""
//           }`}
//           title="2 Columns"
//         >
//           <ViewColumnsIcon className="w-5 h-5" />
//         </button>
//         <button
//           onClick={() => setColumns(3)}
//           className={`p-2 border rounded ${
//             columns === 3 ? "bg-black text-white" : ""
//           }`}
//           title="3 Columns"
//         >
//           <Squares2X2Icon className="w-5 h-5" />
//         </button>
//         <button
//           onClick={() => setColumns(4)}
//           className={`p-2 border rounded ${
//             columns === 4 ? "bg-black text-white" : ""
//           }`}
//           title="4 Columns"
//         >
//           <TableCellsIcon className="w-5 h-5" />
//         </button>
//       </div>

//       {/* Product grid */}
//       <div className={`grid ${gridClass} gap-4`}>
//         {jewelleryItems.map((item, index) => (
//           <HoverSlideshowCardGrid
//             key={index}
//             images={item.images}
//           
//             description={item.description}
//             description1={item.description1}
//             price={item.price}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Jewellery;
import React, { useEffect, useState } from "react";
import HoverSlideshowCardGrid from "./HoverSlideshowCardGrid";
import {
  ViewColumnsIcon,
  Squares2X2Icon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import { useProducts } from "./ProductContext"; // ✅ use shared context

function Jewellery() {
  const { products, loading } = useProducts();
  const [columns, setColumns] = useState(2);
  const [jewelleryItems, setJewelleryItems] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const filtered = products.filter(
      (item) => item.category === "jewelleryimages"
    );
    setJewelleryItems(filtered);
  }, [products]);

  let gridClass = "grid-cols-3";
  if (columns === 2) gridClass = "grid-cols-2";
  if (columns === 3) gridClass = "grid-cols-3";
  if (columns === 4) gridClass = "grid-cols-4";

  if (loading) {
    return (
      <div className="text-center py-10 text-xl font-medium text-gray-700">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-center text-4xl font-medium mb-4 uppercase">
        Jewellery
      </h2>

      {/* Grid switcher buttons */}
      <div className="flex justify-end gap-2 mb-4">
        <button
          onClick={() => setColumns(2)}
          className={`p-2 border rounded ${columns === 2 ? "bg-black text-white" : ""}`}
        >
          <ViewColumnsIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => setColumns(3)}
          className={`p-2 border rounded ${columns === 3 ? "bg-black text-white" : ""}`}
        >
          <Squares2X2Icon className="w-5 h-5" />
        </button>
        <button
          onClick={() => setColumns(4)}
          className={`p-2 border rounded ${columns === 4 ? "bg-black text-white" : ""}`}
        >
          <TableCellsIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Product grid */}
      <div className={`grid ${gridClass} gap-4`}>
        {jewelleryItems.map((item, index) => (
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

export default Jewellery;

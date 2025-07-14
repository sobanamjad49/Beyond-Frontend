import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const initialForm = {
  id: "",
  description: "",
  description1: "",
  price: "",
  images: [""],
  Size: [],
  category: "",
 
};

const SizesInput = ({ sizes, setSizes }) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "," || e.key === " ") {
      e.preventDefault();
      const value = input.trim().toUpperCase();
      if (value && !sizes.includes(value)) {
        setSizes([...sizes, value]);
      }
      setInput("");
    }
  };

  const removeSize = (sizeToRemove) => {
    setSizes(sizes.filter((size) => size !== sizeToRemove));
  };

  return (
    <div>
      <label className="block mb-1 font-semibold">Sizes:</label>
      <div
        className="flex flex-wrap gap-2 p-2 border rounded min-h-[40px] items-center cursor-text"
        onClick={() => document.getElementById("sizeInput").focus()}
      >
        {sizes.map((size) => (
          <div
            key={size}
            className="flex items-center bg-gray-200 text-black rounded px-3 py-1 text-sm"
          >
            {size}
            <button
              type="button"
              onClick={() => removeSize(size)}
              className="ml-2 font-bold text-red-600 hover:text-red-800"
            >
              ×
            </button>
          </div>
        ))}
        <input
          id="sizeInput"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type size and press Enter"
          className="flex-grow outline-none border-none p-1 text-sm"
        />
      </div>
    </div>
  );
};

const DashboardProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const formRef = useRef(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/products/getproducts`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const isDuplicateId = products.some(
    (p) => String(p.id) === String(form.id) && p._id !== editingId
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isDuplicateId) {
      alert("Product with this ID already exists!");
      return;
    }

    try {
      if (editingId) {
        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/products/updateproduct/${editingId}`, form);
      } else {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/products/addproduct`, form);
      }
      setForm(initialForm);
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error("Submission failed:", err);
    }
  };

  const handleEdit = (product) => {
    setForm({
      id: product.id,
      description: product.description,
      description1: product.description1,
      price: product.price,
      images: product.images?.length ? product.images : [""],
      Size: product.Size || [],
      category: product.category,
  
    });
    setEditingId(product._id);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/products/deleteproduct/${id}`);
        fetchProducts();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleImageChange = (index, value) => {
    const newImages = [...form.images];
    newImages[index] = value;
    setForm({ ...form, images: newImages });
  };

  const addImageField = () => {
    setForm({ ...form, images: [...form.images, ""] });
  };

  const removeImageField = (index) => {
    const newImages = form.images.filter((_, i) => i !== index);
    setForm({ ...form, images: newImages.length ? newImages : [""] });
  };

  const categoryCounts = products.reduce((acc, product) => {
    if (product.category) {
      acc[product.category] = (acc[product.category] || 0) + 1;
    }
    return acc;
  }, {});
  const uniqueCategories = Object.keys(categoryCounts);

  const filteredProducts = products.filter((p) => {
    const term = searchTerm.toLowerCase();
    return (
      (!categoryFilter || p.category === categoryFilter) &&
      (String(p.id).toLowerCase().includes(term) ||
        (p.description || "").toLowerCase().includes(term) ||
        (p.category || "").toLowerCase().includes(term))
    );
  });

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">
        Products Dashboard ({products.length} total)
      </h2>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by ID, Description or Category"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Categories</option>
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat} ({categoryCounts[cat]})
            </option>
          ))}
        </select>
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10"
      >
        <input
          type="text"
          placeholder="Product ID"
          value={form.id}
          onChange={(e) => setForm({ ...form, id: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="p-2 border rounded"
          required
        />
       
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="">Select Category</option>
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="p-2 border rounded col-span-1 md:col-span-2"
        />
        <textarea
          placeholder="Additional Description"
          value={form.description1}
          onChange={(e) => setForm({ ...form, description1: e.target.value })}
          className="p-2 border rounded col-span-1 md:col-span-2"
        />

        <div className="col-span-1 md:col-span-2">
          <label className="block font-semibold mb-1">Image URLs:</label>
          {form.images.map((img, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                placeholder={`Image URL ${i + 1}`}
                value={img}
                onChange={(e) => handleImageChange(i, e.target.value)}
                className="p-2 border rounded w-full"
              />
              <button
                type="button"
                onClick={() => removeImageField(i)}
                className="text-red-600 font-bold px-2"
              >
                ×
              </button>
              {img && (
                <img
                  src={img}
                  alt={`Preview ${i + 1}`}
                  className="w-16 h-16 object-cover border rounded"
                />
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addImageField}
            className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Add Image Field
          </button>
        </div>

        <div className="col-span-1 md:col-span-2">
          <SizesInput sizes={form.Size} setSizes={(Size) => setForm({ ...form, Size })} />
        </div>

        {isDuplicateId && (
          <p className="text-red-600 col-span-2">A product with this ID already exists.</p>
        )}

        <button
          type="submit"
          className={`py-2 rounded font-semibold text-white ${
            isDuplicateId ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
          disabled={isDuplicateId}
        >
          {editingId ? "Update Product" : "Add Product"}
        </button>

        <button
          type="button"
          onClick={() => {
            setForm(initialForm);
            setEditingId(null);
          }}
          className="py-2 rounded font-semibold bg-yellow-500 text-white hover:bg-yellow-600"
        >
          Clear
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Price</th>
             
              <th className="border p-2">Category</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Description1</th>
              <th className="border p-2">Sizes</th>
              <th className="border p-2">Images</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p) => (
              <tr key={p._id} className="hover:bg-gray-50">
                <td className="border p-2">{p.id}</td>
                <td className="border p-2">{Number(p.price)?.toLocaleString() || "-"}</td>
               
                <td className="border p-2">{p.category}</td>
                <td className="border p-2 max-w-xs break-words">{p.description}</td>
                <td className="border p-2 max-w-xs break-words">{p.description1}</td>
                <td className="border p-2">{p.Size?.join(", ") || "-"}</td>
                <td className="border p-2">
                  <div className="flex flex-wrap gap-1">
                    {p.images?.map(
                      (img, i) =>
                        img && (
                          <img
                            key={i}
                            src={img}
                            alt={`img${i}`}
                            className="w-10 h-10 object-cover rounded border"
                          />
                        )
                    )}
                  </div>
                </td>
                <td className="border p-2 space-y-1">
                  <button
                    onClick={() => handleEdit(p)}
                    className="w-full px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="w-full px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardProducts;

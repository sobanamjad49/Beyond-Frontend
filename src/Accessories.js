import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const initialForm = {
  id: "",
  name: "",
  price: "",
  oldPrice: "",
  discount: "",
  description: "",
  images: [], // 👈 allow dynamic images
  sizes: [],
  category: "",
  stock: "",
};

const SizesInput = ({ sizes, setSizes }) => {
  const [input, setInput] = useState("");
  const handleKeyDown = (e) => {
    if (["Enter", ",", " "].includes(e.key)) {
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
  const formRef = useRef(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/products/getproducts`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const isDuplicateId = products.some(
    (p) => String(p.id) === String(form.id) && p.id !== editingId
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isDuplicateId) {
      alert("Error: A product with this ID already exists!");
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
      console.error(err);
    }
  };

  const handleEdit = (product) => {
    setForm({
      id: product.id,
      name: product.name,
      price: product.price,
      oldPrice: product.oldPrice,
      discount: product.discount,
      description: product.description,
      images: product.images || [],
      sizes: product.sizes || [],
      category: product.category,
      stock: product.stock || "",
    });
    setEditingId(product.id);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/products/deleteproduct/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageChange = (index, value) => {
    const newImages = [...form.images];
    newImages[index] = value;
    setForm({ ...form, images: newImages });
  };

  const filteredProducts = products.filter((p) => {
    const term = searchTerm.toLowerCase();
    return (
      String(p.id).toLowerCase().includes(term) ||
      (p.name || "").toLowerCase().includes(term) ||
      (p.category || "").toLowerCase().includes(term)
    );
  });

  const categoryOptions = [...new Set(products.map((p) => p.category).filter(Boolean))];

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-2">Products Management</h2>
      <p className="mb-4 text-gray-600">Total Products: {products.length}</p>

      <input
        type="text"
        placeholder="Search by ID, Name or Category"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border rounded w-full mb-4"
      />

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
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
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
        <input
          type="number"
          placeholder="Old Price"
          value={form.oldPrice}
          onChange={(e) => setForm({ ...form, oldPrice: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Discount %"
          value={form.discount}
          onChange={(e) => setForm({ ...form, discount: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Stock Quantity"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          className="p-2 border rounded"
        />

        <div className="col-span-1">
          <label className="block mb-1 font-semibold">Category:</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="">-- Select Category --</option>
            {categoryOptions.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="p-2 border rounded col-span-1 md:col-span-2"
        />

        {/* ✅ Dynamic image fields */}
        <div className="col-span-1 md:col-span-2 space-y-2">
          <label className="block font-semibold">Product Images:</label>
          {form.images.map((img, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                placeholder={`Image URL ${i + 1}`}
                value={img}
                onChange={(e) => handleImageChange(i, e.target.value)}
                className="p-2 border rounded flex-grow"
              />
              <button
                type="button"
                onClick={() => {
                  const newImages = [...form.images];
                  newImages.splice(i, 1);
                  setForm({ ...form, images: newImages });
                }}
                className="px-2 text-red-600 font-bold"
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setForm({ ...form, images: [...form.images, ""] })}
            className="text-blue-600 hover:underline text-sm"
          >
            + Add another image
          </button>
        </div>

        <div className="col-span-1 md:col-span-2">
          <SizesInput
            sizes={form.sizes}
            setSizes={(sizes) => setForm({ ...form, sizes })}
          />
        </div>

        {isDuplicateId && (
          <p className="text-red-600 col-span-2 text-sm font-semibold">
            A product with this ID already exists.
          </p>
        )}

        <button
          type="submit"
          className={`py-2 rounded font-semibold text-white ${
            isDuplicateId
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
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
        <table className="w-full border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Old Price</th>
              <th className="border p-2">Discount</th>
              <th className="border p-2">Stock</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Sizes</th>
              <th className="border p-2">Images</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-center p-4 text-gray-500">
                  No products found.
                </td>
              </tr>
            ) : (
              filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="border p-2">{p.id}</td>
                  <td className="border p-2">{p.name}</td>
                  <td className="border p-2">{p.price}</td>
                  <td className="border p-2">{p.oldPrice}</td>
                  <td className="border p-2">{p.discount}%</td>
                  <td className="border p-2">{p.stock || 0}</td>
                  <td className="border p-2">{p.category}</td>
                  <td className="border p-2">{p.sizes?.join(", ") || "-"}</td>
                  <td className="border p-2">
                    <div className="flex flex-wrap gap-1">
                      {p.images?.map((img, i) =>
                        img ? (
                          <img
                            key={i}
                            src={img}
                            alt={`img${i + 1}`}
                            className="w-12 h-12 object-cover rounded border"
                          />
                        ) : null
                      )}
                    </div>
                  </td>
                  <td className="border p-2 max-w-xs break-words">{p.description}</td>
                  <td className="border p-2 space-y-1">
                    <button
                      onClick={() => handleEdit(p)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 block w-full"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to delete product ${p.id}?`)) {
                          handleDelete(p.id);
                        }
                      }}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 block w-full"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardProducts;

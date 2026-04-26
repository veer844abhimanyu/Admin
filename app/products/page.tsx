"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Eye, Pencil, Search, Trash2, X } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";

type Product = {
  id: number;
  image: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "Active" | "Out of Stock";
  updatedOn: string;
};

type ModalType =
  | null
  | "addProduct"
  | "viewProduct"
  | "editProduct"
  | "deleteProduct";

const initialProducts: Product[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1543362906-acfc16c67564?q=80&w=300&auto=format&fit=crop",
    name: "Ayurvedic Agni Care Powder",
    category: "Powder",
    price: 499,
    stock: 24,
    status: "Active",
    updatedOn: "27 Mar, 2026",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=300&auto=format&fit=crop",
    name: "Herbal Immunity Syrup",
    category: "Syrup",
    price: 349,
    stock: 16,
    status: "Active",
    updatedOn: "25 Mar, 2026",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=300&auto=format&fit=crop",
    name: "Nadi Wellness Detox Kit",
    category: "Kit",
    price: 899,
    stock: 0,
    status: "Out of Stock",
    updatedOn: "20 Mar, 2026",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=300&auto=format&fit=crop",
    name: "Pitta Balance Herbal Tea",
    category: "Tea",
    price: 299,
    stock: 41,
    status: "Active",
    updatedOn: "18 Mar, 2026",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=300&auto=format&fit=crop",
    name: "AyushYogi Stress Relief Oil",
    category: "Oil",
    price: 599,
    stock: 8,
    status: "Active",
    updatedOn: "15 Mar, 2026",
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<ModalType>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [productForm, setProductForm] = useState({
    name: "",
    image: "",
    category: "",
    price: "",
    stock: "",
    status: "Active" as "Active" | "Out of Stock",
  });

  const filteredProducts = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return products;

    return products.filter((product) =>
      [
        product.name,
        product.category,
        product.status,
        product.updatedOn,
        product.price.toString(),
        product.stock.toString(),
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [products, search]);

  const resetForm = () => {
    setProductForm({
      name: "",
      image: "",
      category: "",
      price: "",
      stock: "",
      status: "Active",
    });
  };

  const openViewModal = (product: Product) => {
    setSelectedProduct(product);
    setModal("viewProduct");
  };

  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setProductForm({
      name: product.name,
      image: product.image,
      category: product.category,
      price: String(product.price),
      stock: String(product.stock),
      status: product.status,
    });
    setModal("editProduct");
  };

  const openDeleteModal = (product: Product) => {
    setSelectedProduct(product);
    setModal("deleteProduct");
  };

  const handleAddProduct = () => {
    if (
      !productForm.name.trim() ||
      !productForm.category.trim() ||
      !productForm.price.trim() ||
      !productForm.stock.trim()
    ) {
      return;
    }

    const price = Number(productForm.price);
    const stock = Number(productForm.stock);

    if (Number.isNaN(price) || Number.isNaN(stock)) return;

    const today = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const newProduct: Product = {
      id: Date.now(),
      name: productForm.name,
      image:
        productForm.image.trim() ||
        "https://images.unsplash.com/photo-1543362906-acfc16c67564?q=80&w=300&auto=format&fit=crop",
      category: productForm.category,
      price,
      stock,
      status: stock === 0 ? "Out of Stock" : productForm.status,
      updatedOn: today,
    };

    console.log("Product Added:", newProduct);
    setProducts((prev) => [newProduct, ...prev]);
    resetForm();
    setModal(null);
  };

  const handleUpdateProduct = () => {
    if (!selectedProduct) return;
    if (
      !productForm.name.trim() ||
      !productForm.category.trim() ||
      !productForm.price.trim() ||
      !productForm.stock.trim()
    ) {
      return;
    }

    const price = Number(productForm.price);
    const stock = Number(productForm.stock);

    if (Number.isNaN(price) || Number.isNaN(stock)) return;

    const today = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const updatedProduct: Product = {
      ...selectedProduct,
      name: productForm.name,
      image: productForm.image.trim() || selectedProduct.image,
      category: productForm.category,
      price,
      stock,
      status: stock === 0 ? "Out of Stock" : productForm.status,
      updatedOn: today,
    };

    console.log("Product Updated:", updatedProduct);
    setProducts((prev) =>
      prev.map((product) =>
        product.id === selectedProduct.id ? updatedProduct : product
      )
    );

    resetForm();
    setSelectedProduct(null);
    setModal(null);
  };

  const handleDeleteProduct = () => {
    if (!selectedProduct) return;

    setProducts((prev) =>
      prev.filter((product) => product.id !== selectedProduct.id)
    );
    setSelectedProduct(null);
    setModal(null);
  };

  return (
    <AdminLayout>
      <div className="rounded-2xl bg-white p-4 shadow-sm md:p-6">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">List of Products</h1>
            <p className="mt-1 text-sm text-gray-500">Home / Products</p>
          </div>

          <button
            onClick={() => {
              resetForm();
              setModal("addProduct");
            }}
            className="rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
            type="button"
          >
            Add Product
          </button>
        </div>

        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-4 pr-10 text-sm outline-none transition focus:border-blue-500"
            />
            <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>

          <div className="text-sm text-gray-500">
            Total:
            <span className="ml-1 font-semibold text-gray-700">
              {filteredProducts.length}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-[1100px] w-full">
            <thead className="bg-gray-50 text-left text-sm text-gray-700">
              <tr>
                <th className="px-4 py-3 font-semibold">Img</th>
                <th className="px-4 py-3 font-semibold">Product Name</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Price</th>
                <th className="px-4 py-3 font-semibold">Stock</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Updated on</th>
                <th className="px-4 py-3 font-semibold">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-gray-200">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                  </td>

                  <td className="px-4 py-3 text-gray-800">
                    <p className="max-w-[300px]">{product.name}</p>
                  </td>

                  <td className="px-4 py-3 text-gray-700">{product.category}</td>
                  <td className="px-4 py-3 text-gray-700">₹ {product.price}</td>
                  <td className="px-4 py-3 text-gray-700">{product.stock}</td>

                  <td className="px-4 py-3">
                    <span
                      className={`rounded-md px-2 py-1 text-xs font-medium ${
                        product.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-gray-700">{product.updatedOn}</td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => openViewModal(product)}
                        className="text-slate-500 hover:text-blue-600"
                        type="button"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => openEditModal(product)}
                        className="text-slate-500 hover:text-green-600"
                        type="button"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => openDeleteModal(product)}
                        className="text-slate-500 hover:text-red-600"
                        type="button"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-sm text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Modal
          open={modal === "addProduct"}
          title="Add Product"
          onClose={() => {
            setModal(null);
            resetForm();
          }}
        >
          <div className="grid gap-3">
            <input
              type="text"
              placeholder="Product name"
              value={productForm.name}
              onChange={(e) =>
                setProductForm((prev) => ({ ...prev, name: e.target.value }))
              }
              className="rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            />

            <input
              type="text"
              placeholder="Image URL"
              value={productForm.image}
              onChange={(e) =>
                setProductForm((prev) => ({ ...prev, image: e.target.value }))
              }
              className="rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            />

            <input
              type="text"
              placeholder="Category"
              value={productForm.category}
              onChange={(e) =>
                setProductForm((prev) => ({ ...prev, category: e.target.value }))
              }
              className="rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            />

            <input
              type="number"
              placeholder="Price"
              value={productForm.price}
              onChange={(e) =>
                setProductForm((prev) => ({ ...prev, price: e.target.value }))
              }
              className="rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            />

            <input
              type="number"
              placeholder="Stock"
              value={productForm.stock}
              onChange={(e) =>
                setProductForm((prev) => ({ ...prev, stock: e.target.value }))
              }
              className="rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            />

            <select
              value={productForm.status}
              onChange={(e) =>
                setProductForm((prev) => ({
                  ...prev,
                  status: e.target.value as "Active" | "Out of Stock",
                }))
              }
              className="rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            >
              <option value="Active">Active</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>

            <button
              onClick={handleAddProduct}
              className="mt-2 rounded-lg bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
              type="button"
            >
              Add Product
            </button>
          </div>
        </Modal>

        <Modal
          open={modal === "viewProduct"}
          title="View Product"
          onClose={() => {
            setModal(null);
            setSelectedProduct(null);
          }}
        >
          {selectedProduct && (
            <div className="space-y-4">
              <div className="relative h-56 w-full overflow-hidden rounded-xl border border-gray-200">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              </div>

              <div className="grid gap-2 text-sm text-gray-700">
                <p>
                  <span className="font-semibold text-gray-800">Name:</span>{" "}
                  {selectedProduct.name}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Category:</span>{" "}
                  {selectedProduct.category}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Price:</span> ₹{" "}
                  {selectedProduct.price}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Stock:</span>{" "}
                  {selectedProduct.stock}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Status:</span>{" "}
                  {selectedProduct.status}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Updated on:</span>{" "}
                  {selectedProduct.updatedOn}
                </p>
              </div>
            </div>
          )}
        </Modal>

        <Modal
          open={modal === "editProduct"}
          title="Edit Product"
          onClose={() => {
            setModal(null);
            setSelectedProduct(null);
            resetForm();
          }}
        >
          <div className="grid gap-3">
            <input
              type="text"
              placeholder="Product name"
              value={productForm.name}
              onChange={(e) =>
                setProductForm((prev) => ({ ...prev, name: e.target.value }))
              }
              className="rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            />

            <input
              type="text"
              placeholder="Image URL"
              value={productForm.image}
              onChange={(e) =>
                setProductForm((prev) => ({ ...prev, image: e.target.value }))
              }
              className="rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            />

            <input
              type="text"
              placeholder="Category"
              value={productForm.category}
              onChange={(e) =>
                setProductForm((prev) => ({ ...prev, category: e.target.value }))
              }
              className="rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            />

            <input
              type="number"
              placeholder="Price"
              value={productForm.price}
              onChange={(e) =>
                setProductForm((prev) => ({ ...prev, price: e.target.value }))
              }
              className="rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            />

            <input
              type="number"
              placeholder="Stock"
              value={productForm.stock}
              onChange={(e) =>
                setProductForm((prev) => ({ ...prev, stock: e.target.value }))
              }
              className="rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            />

            <select
              value={productForm.status}
              onChange={(e) =>
                setProductForm((prev) => ({
                  ...prev,
                  status: e.target.value as "Active" | "Out of Stock",
                }))
              }
              className="rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500"
            >
              <option value="Active">Active</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>

            <button
              onClick={handleUpdateProduct}
              className="mt-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              type="button"
            >
              Update Product
            </button>
          </div>
        </Modal>

        <Modal
          open={modal === "deleteProduct"}
          title="Delete Product"
          onClose={() => {
            setModal(null);
            setSelectedProduct(null);
          }}
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Are you sure you want to delete this product?
            </p>

            {selectedProduct && (
              <div className="rounded-lg border border-gray-200 p-3 text-sm text-gray-700">
                {selectedProduct.name}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleDeleteProduct}
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                type="button"
              >
                Delete
              </button>

              <button
                onClick={() => {
                  setModal(null);
                  setSelectedProduct(null);
                }}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                type="button"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </AdminLayout>
  );
}

function Modal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-md px-2 py-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[75vh] overflow-y-auto p-5">{children}</div>
      </div>
    </div>
  );
}

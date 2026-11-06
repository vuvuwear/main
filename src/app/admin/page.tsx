"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  UploadCloud,
  PackagePlus,
  Layers,
  ShoppingBag,
  Trash2,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Database,
  RefreshCw,
  Clock,
  CheckCheck,
} from "lucide-react";
import VuvuLogo from "@/components/ui/VuvuLogo";
import { Product, ProductSize } from "@/types/product";

interface DbOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: any;
  items: any[];
  subtotal: number;
  shippingCost: number;
  discountAmount: number;
  total: number;
  paymentMethod: string;
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  createdAt: string;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<DbOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"catalog" | "add" | "orders">("catalog");

  // New product form
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [category, setCategory] = useState<Product["category"]>("tees");
  const [fabric, setFabric] = useState("100% Egyptian Combed Cotton (300 GSM)");
  const [fit, setFit] = useState("Oversized Boxy Contemporary Fit");
  const [badge, setBadge] = useState<Product["badge"]>("NEW DROP");
  const [selectedSizes, setSelectedSizes] = useState<ProductSize[]>(["S", "M", "L", "XL"]);

  // Upload states
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [uploadError, setUploadError] = useState("");
  const [submittingProduct, setSubmittingProduct] = useState(false);
  const [createdSuccess, setCreatedSuccess] = useState(false);

  // Fetch products and orders
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [prodRes, orderRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/orders"),
      ]);
      const prodJson = await prodRes.json();
      const orderJson = await orderRes.json();

      if (prodJson.success && prodJson.products) {
        setProducts(prodJson.products);
      }
      if (orderJson.success && orderJson.orders) {
        setOrders(orderJson.orders);
      }
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle image upload to Cloudinary via /api/upload
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setUploadError("");

    try {
      const data = new FormData();
      data.append("file", file);
      data.append("folder", "vuvuwear/products");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to upload to Cloudinary");
      }

      setUploadedImageUrl(json.url);
    } catch (err: any) {
      setUploadError(err.message || "Upload failed. Verify Cloudinary credentials.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    setSubmittingProduct(true);

    const payload = {
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      tagline: tagline || "Engineered contemporary apparel.",
      description: `${name}. Crafted for elevated street drape and everyday permanence.`,
      details: [
        fabric,
        "Double-reinforced collar ribbing",
        "Pre-shrunk to retain structure through 100+ washes",
      ],
      fabric,
      fit,
      price: parseFloat(price),
      originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
      category,
      badge,
      tags: [category, "Streetwear", "Essentials"],
      colors: [
        { name: "Steel Blue", hex: "#285477" },
        { name: "Obsidian Black", hex: "#000000" },
        { name: "Ice White", hex: "#F3F0E9" },
      ],
      sizes: [
        { size: "S", inStock: selectedSizes.includes("S") },
        { size: "M", inStock: selectedSizes.includes("M") },
        { size: "L", inStock: selectedSizes.includes("L") },
        { size: "XL", inStock: selectedSizes.includes("XL") },
        { size: "XXL", inStock: selectedSizes.includes("XXL") },
      ],
      images: [
        uploadedImageUrl ||
          "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85",
      ],
      rating: 5.0,
      reviewCount: 1,
      isFeatured: true,
    };

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to persist product to database");
      }

      setProducts([json.product, ...products]);
      setCreatedSuccess(true);

      setTimeout(() => {
        setName("");
        setTagline("");
        setPrice("");
        setOriginalPrice("");
        setUploadedImageUrl("");
        setCreatedSuccess(false);
        setActiveTab("catalog");
      }, 1500);
    } catch (err: any) {
      alert("Error saving product: " + err.message);
    } finally {
      setSubmittingProduct(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this garment from the database?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
      } else {
        alert("Failed to delete product from database");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleUpdateOrderStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setOrders(
          orders.map((o) => (o.id === id ? { ...o, status: newStatus as any } : o))
        );
      }
    } catch (err) {
      console.error("Order status update error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F0E9]">
      {/* Top Admin Header */}
      <header className="bg-white border-b border-gray-100 py-4 px-4 sm:px-8 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <VuvuLogo size="sm" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] bg-[#285477] text-white px-2 py-0.5 rounded font-bold">
              ATELIER ADMIN
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <button
              onClick={fetchData}
              className="inline-flex items-center gap-1.5 text-gray-500 hover:text-black transition-colors"
              title="Refresh data"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh</span>
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-gray-500 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>View Storefront</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs flex items-center gap-4">
            <div className="w-11 h-11 rounded-lg bg-[#F3F0E9] text-[#285477] flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">
                Garments in DB
              </div>
              <div className="text-xl font-black font-mono text-black">
                {isLoading ? "..." : `${products.length} Pieces`}
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs flex items-center gap-4">
            <div className="w-11 h-11 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">
                Customer Orders
              </div>
              <div className="text-xl font-black font-mono text-black">
                {isLoading ? "..." : `${orders.length} Orders`}
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs flex items-center gap-4">
            <div className="w-11 h-11 rounded-lg bg-sky-50 text-[#285477] flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">
                PostgreSQL DB
              </div>
              <div className="text-xs font-bold font-mono text-emerald-600 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Neon Connected
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs flex items-center gap-4">
            <div className="w-11 h-11 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">
                Cloudinary CDN
              </div>
              <div className="text-xs font-bold font-mono text-indigo-600">
                Active & Live
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-8 gap-2">
          <button
            onClick={() => setActiveTab("catalog")}
            className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors relative ${
              activeTab === "catalog"
                ? "text-[#285477] border-b-2 border-[#285477]"
                : "text-gray-400 hover:text-black"
            }`}
          >
            Catalog ({products.length})
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors relative flex items-center gap-1.5 ${
              activeTab === "orders"
                ? "text-[#285477] border-b-2 border-[#285477]"
                : "text-gray-400 hover:text-black"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("add")}
            className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors relative flex items-center gap-1.5 ${
              activeTab === "add"
                ? "text-[#285477] border-b-2 border-[#285477]"
                : "text-gray-400 hover:text-black"
            }`}
          >
            <PackagePlus className="w-4 h-4" />
            <span>Add Garment</span>
          </button>
        </div>

        {/* Tab 1: Catalog List */}
        {activeTab === "catalog" && (
          <div className="bg-white rounded-xl shadow-xs border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#F3F0E9] text-[#285477] uppercase font-mono font-bold">
                  <tr>
                    <th className="py-3 px-4">Garment</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Weight / Fabric</th>
                    <th className="py-3 px-4">Badge</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50/50">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <div className="relative w-12 h-14 bg-[#F3F0E9] rounded overflow-hidden flex-shrink-0 border border-gray-200">
                          <Image
                            src={p.images[0] || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518"}
                            alt={p.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-black text-xs">
                            {p.name}
                          </div>
                          <div className="text-[11px] text-gray-400 truncate max-w-xs">
                            {p.tagline}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 uppercase font-semibold text-gray-600">
                        {p.category}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-black">
                        ${p.price}.00
                      </td>
                      <td className="py-3 px-4 text-gray-500 font-mono text-[11px]">
                        {p.fabric}
                      </td>
                      <td className="py-3 px-4">
                        {p.badge && (
                          <span className="bg-[#285477] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                            {p.badge}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                          title="Delete garment"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-gray-400 text-xs">
                        No garments in database. Click &ldquo;Add Garment&rdquo; to create one.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Orders List */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-xl shadow-xs border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#F3F0E9] text-[#285477] uppercase font-mono font-bold">
                  <tr>
                    <th className="py-3 px-4">Order #</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Items</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Payment</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-gray-50/50">
                      <td className="py-3 px-4 font-mono font-bold text-black">
                        {o.orderNumber}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-black">{o.customerName}</div>
                        <div className="text-[11px] text-gray-400">{o.customerEmail}</div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {Array.isArray(o.items) ? `${o.items.length} item(s)` : "1 item"}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-[#285477]">
                        ${o.total}.00
                      </td>
                      <td className="py-3 px-4 text-gray-500 text-[11px]">
                        {o.paymentMethod}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            o.status === "DELIVERED"
                              ? "bg-emerald-100 text-emerald-800"
                              : o.status === "SHIPPED"
                              ? "bg-sky-100 text-sky-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {o.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <select
                          value={o.status}
                          onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                          className="bg-[#F3F0E9] border border-gray-200 rounded px-2 py-1 text-[11px] font-semibold text-black focus:outline-none"
                        >
                          <option value="PENDING">Pending</option>
                          <option value="PROCESSING">Processing</option>
                          <option value="SHIPPED">Shipped</option>
                          <option value="DELIVERED">Delivered</option>
                          <option value="CANCELLED">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-gray-400 text-xs">
                        No orders recorded in database yet. Place a test order through the storefront checkout!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Add New Garment */}
        {activeTab === "add" && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-xs p-6 sm:p-8">
            <h2 className="text-base font-bold text-black uppercase tracking-wider mb-6 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#285477]" />
              <span>Create Garment Specification</span>
            </h2>

            <form onSubmit={handleCreateProduct} className="space-y-6">
              {/* Cloudinary Image Upload Box */}
              <div>
                <label className="block text-xs uppercase font-semibold text-gray-600 mb-2">
                  Garment Photography (Direct Cloudinary Upload)
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-6 p-6 border-2 border-dashed border-gray-200 rounded-xl bg-[#F3F0E9]">
                  {uploadedImageUrl ? (
                    <div className="relative w-28 h-36 rounded-lg overflow-hidden border border-gray-200 shadow-sm flex-shrink-0">
                      <Image
                        src={uploadedImageUrl}
                        alt="Uploaded preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-28 h-36 rounded-lg bg-gray-100 flex flex-col items-center justify-center text-gray-400 flex-shrink-0 border border-gray-200">
                      <UploadCloud className="w-8 h-8 mb-1" />
                      <span className="text-[10px] uppercase font-mono">No Asset</span>
                    </div>
                  )}

                  <div className="flex-1 space-y-2 text-center sm:text-left">
                    <div className="text-xs font-semibold text-black">
                      Upload high-resolution editorial garment asset
                    </div>
                    <p className="text-[11px] text-gray-500">
                      Image will be uploaded directly to Cloudinary and stored securely in Neon PostgreSQL.
                    </p>

                    <label className="inline-flex items-center gap-2 cursor-pointer bg-[#285477] hover:bg-black text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors">
                      <UploadCloud className="w-4 h-4" />
                      <span>{uploadingImage ? "Uploading..." : "Select File"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageFileChange}
                        disabled={uploadingImage}
                      />
                    </label>

                    {uploadError && (
                      <p className="text-xs text-rose-500 font-semibold">{uploadError}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Garment Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-gray-600 mb-1">
                    Garment Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Architectural Heavyweight Boxy Tee"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#F3F0E9] border border-gray-200 rounded px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-[#285477] focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-gray-600 mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 300 GSM combed cotton with drop-shoulder silhouette."
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full bg-[#F3F0E9] border border-gray-200 rounded px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-[#285477] focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-gray-600 mb-1">
                    Price (USD $) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="48"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-[#F3F0E9] border border-gray-200 rounded px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-[#285477] focus:bg-white transition-colors font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-gray-600 mb-1">
                    Original Price (Optional Strike-through)
                  </label>
                  <input
                    type="number"
                    placeholder="65"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    className="w-full bg-[#F3F0E9] border border-gray-200 rounded px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-[#285477] focus:bg-white transition-colors font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-gray-600 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-[#F3F0E9] border border-gray-200 rounded px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-[#285477] focus:bg-white transition-colors"
                  >
                    <option value="tees">Tees & Tops</option>
                    <option value="hoodies">French Terry Hoodies</option>
                    <option value="pants">Pants & Utility</option>
                    <option value="jackets">Outerwear</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-gray-600 mb-1">
                    Badge
                  </label>
                  <select
                    value={badge}
                    onChange={(e) => setBadge(e.target.value as any)}
                    className="w-full bg-[#F3F0E9] border border-gray-200 rounded px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-[#285477] focus:bg-white transition-colors"
                  >
                    <option value="NEW DROP">NEW DROP</option>
                    <option value="BESTSELLER">BESTSELLER</option>
                    <option value="LIMITED">LIMITED</option>
                    <option value="SALE">SALE</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase font-semibold text-gray-600 mb-1">
                    Fabric & GSM Weight
                  </label>
                  <input
                    type="text"
                    value={fabric}
                    onChange={(e) => setFabric(e.target.value)}
                    className="w-full bg-[#F3F0E9] border border-gray-200 rounded px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-[#285477] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {createdSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-700 rounded text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Garment successfully created in Neon PostgreSQL!</span>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={submittingProduct}
                  className="bg-[#000000] hover:bg-[#285477] disabled:bg-gray-400 text-white px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-bold rounded transition-colors shadow-md"
                >
                  {submittingProduct ? "Saving to Database..." : "Publish To Storefront"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

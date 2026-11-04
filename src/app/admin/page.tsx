"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  UploadCloud,
  PackagePlus,
  Layers,
  ShoppingBag,
  TrendingUp,
  Trash2,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import VuvuLogo from "@/components/ui/VuvuLogo";
import { MOCK_PRODUCTS } from "@/data/mockProducts";
import { Product, ProductSize } from "@/types/product";

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
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
  const [createdSuccess, setCreatedSuccess] = useState(false);

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
      setUploadError(err.message || "Upload failed. Verify CLOUDINARY_API_SECRET in .env.local");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    const newProd: Product = {
      id: `vuvu-${Date.now()}`,
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
        { name: "Steel Blue", hex: "#315074" },
        { name: "Obsidian Black", hex: "#000000" },
        { name: "Ice White", hex: "#F1F9FE" },
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

    setProducts([newProd, ...products]);
    setCreatedSuccess(true);

    // Reset form
    setTimeout(() => {
      setName("");
      setTagline("");
      setPrice("");
      setOriginalPrice("");
      setUploadedImageUrl("");
      setCreatedSuccess(false);
      setActiveTab("catalog");
    }, 1500);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F1F9FE]">
      {/* Top Admin Header */}
      <header className="bg-white border-b border-gray-100 py-4 px-4 sm:px-8 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <VuvuLogo size="sm" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] bg-[#315074] text-white px-2 py-0.5 rounded font-bold">
              ATELIER ADMIN
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-gray-500 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>View Live Storefront</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* At a glance KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#F1F9FE] text-[#315074] flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                Active Garments
              </div>
              <div className="text-2xl font-black font-mono text-black">
                {products.length} Pieces
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                Fulfillment Queue
              </div>
              <div className="text-2xl font-black font-mono text-black">
                4 Orders
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-sky-50 text-[#315074] flex items-center justify-center">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                Cloudinary Connected
              </div>
              <div className="text-sm font-bold font-mono text-[#315074] truncate max-w-[160px]">
                ultyv3bs
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab("catalog")}
            className={`pb-4 px-4 text-xs font-bold uppercase tracking-wider transition-colors relative ${
              activeTab === "catalog"
                ? "text-[#315074] border-b-2 border-[#315074]"
                : "text-gray-400 hover:text-black"
            }`}
          >
            Garment Catalog ({products.length})
          </button>

          <button
            onClick={() => setActiveTab("add")}
            className={`pb-4 px-4 text-xs font-bold uppercase tracking-wider transition-colors relative flex items-center gap-1.5 ${
              activeTab === "add"
                ? "text-[#315074] border-b-2 border-[#315074]"
                : "text-gray-400 hover:text-black"
            }`}
          >
            <PackagePlus className="w-4 h-4" />
            <span>Add New Garment</span>
          </button>
        </div>

        {/* Tab 1: Catalog List */}
        {activeTab === "catalog" && (
          <div className="bg-white rounded-xl shadow-xs border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#F1F9FE] text-[#315074] uppercase font-mono font-bold">
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
                        <div className="relative w-12 h-14 bg-[#F1F9FE] rounded overflow-hidden flex-shrink-0 border border-gray-200">
                          <Image
                            src={p.images[0]}
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
                          <span className="bg-[#315074] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                            {p.badge}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                          title="Delete piece"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Add New Garment */}
        {activeTab === "add" && (
          <div className="max-w-3xl bg-white p-6 sm:p-8 rounded-xl shadow-xs border border-gray-100">
            <h2 className="text-lg font-bold uppercase tracking-wider text-black mb-6">
              Publish New Garment To Drop 01
            </h2>

            <form onSubmit={handleCreateProduct} className="space-y-6">
              {/* Cloudinary Image Upload Section */}
              <div className="p-5 border-2 border-dashed border-gray-200 rounded-xl bg-[#F1F9FE]/50 text-center">
                {uploadedImageUrl ? (
                  <div className="space-y-3">
                    <div className="relative w-32 h-40 mx-auto rounded-lg overflow-hidden border border-[#315074] shadow-md">
                      <Image
                        src={uploadedImageUrl}
                        alt="Uploaded garment preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-xs font-semibold text-emerald-700 flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Uploaded to Cloudinary (ultyv3bs)!</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <UploadCloud className="w-10 h-10 text-[#315074] mx-auto mb-2" />
                    <div className="text-xs font-bold uppercase tracking-wider text-black">
                      Upload Model / Garment Photo
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1">
                      Uploads directly to your Cloudinary cloud <strong>ultyv3bs</strong>
                    </p>

                    <label className="mt-4 inline-flex items-center gap-2 bg-[#315074] text-white px-5 py-2.5 rounded text-xs font-bold uppercase tracking-widest cursor-pointer hover:bg-[#223750] transition-colors">
                      <span>{uploadingImage ? "Uploading..." : "Select Image File"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={uploadingImage}
                        onChange={handleImageFileChange}
                      />
                    </label>

                    {uploadError && (
                      <div className="mt-3 text-xs text-rose-600 bg-rose-50 p-2 rounded">
                        {uploadError}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Title & Tagline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase font-semibold text-gray-600 mb-1">
                    Garment Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Heavyweight Boxy Washed Tee"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#F1F9FE] border border-gray-200 rounded px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-[#315074] focus:bg-white transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase font-semibold text-gray-600 mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 300 GSM combed cotton with drop-shoulder silhouette."
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full bg-[#F1F9FE] border border-gray-200 rounded px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-[#315074] focus:bg-white transition-colors"
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
                    className="w-full bg-[#F1F9FE] border border-gray-200 rounded px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-[#315074] focus:bg-white transition-colors font-mono"
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
                    className="w-full bg-[#F1F9FE] border border-gray-200 rounded px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-[#315074] focus:bg-white transition-colors font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-gray-600 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-[#F1F9FE] border border-gray-200 rounded px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-[#315074] focus:bg-white transition-colors"
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
                    className="w-full bg-[#F1F9FE] border border-gray-200 rounded px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-[#315074] focus:bg-white transition-colors"
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
                    className="w-full bg-[#F1F9FE] border border-gray-200 rounded px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-[#315074] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {createdSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-700 rounded text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Garment successfully created and added to the catalog!</span>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  className="bg-[#000000] hover:bg-[#315074] text-white px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-bold rounded transition-colors shadow-md"
                >
                  Publish To Storefront
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}


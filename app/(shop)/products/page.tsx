"use client";

import Link from "next/link";
import { useState } from "react";

import AddToCartButton from "@/components/AddToCartButton";
import { useFetch } from "@/hooks/useFetch";
import type { Product } from "@/lib/types";

const API = "https://fakestoreapi.com/products";

export default function ProductsPage() {
  const [category, setCategory] = useState("all");

  const url =
    category === "all" ? API : `${API}/category/${encodeURIComponent(category)}`;
  const { data: categories } = useFetch<string[]>(`${API}/categories`);
  const { data: products, loading, error } = useFetch<Product[]>(url);

  if (error) throw new Error(error);

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="flex items-end justify-between gap-4">
        <h1 className="text-2xl font-semibold">Productos</h1>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded border border-[#3B1F2B]/20 bg-[#f3eae7] px-3 py-2 text-sm text-[#3B1F2B]"
        >
          <option value="all">Todas</option>
          {categories?.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {loading && <p className="mt-8 text-[#3B1F2B]/70">Cargando...</p>}

      {!loading && products && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {products.map((p) => (
            <div key={p.id} className="flex gap-4 rounded-lg border border-[#3B1F2B]/10 bg-[#f3eae7] p-4 shadow-sm">
              <img src={p.image} alt="" className="h-20 w-20 rounded bg-white object-contain p-1" />
              <div className="min-w-0 flex-1">
                <Link href={`/products/${p.id}`} className="text-sm font-medium text-[#3B1F2B] hover:text-[#70A0AF] line-clamp-2">
                  {p.title}
                </Link>
                <p className="mt-1 text-sm text-[#3B1F2B]/70">${p.price}</p>
                <div className="mt-2">
                  <AddToCartButton product={p} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

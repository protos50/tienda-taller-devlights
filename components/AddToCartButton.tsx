"use client";

import type { Product } from "@/lib/types";

import { useCart } from "@/hooks/useCart";

export default function AddToCartButton({
  product,
}: {
  product: Product;
}) {
  const { addToCart } = useCart();

  return (
    <button
      type="button"
      onClick={() => addToCart(product)}
      className="rounded-md bg-[#e3e4df] px-4 py-2 text-sm font-medium text-[#3B1F2B] hover:bg-[#90A959]/80"
    >
      Agregar al carrito
    </button>
  );
}

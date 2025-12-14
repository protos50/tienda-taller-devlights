"use client";

import Link from "next/link";
import { useCart } from "@/hooks/useCart";

export default function CartPage() {
  const { cart, addToCart, removeFromCart, clearCart, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-2xl font-semibold text-[#3B1F2B]">Carrito vacío</h1>
        <Link href="/products" className="mt-4 inline-block text-sm text-[#70A0AF] hover:underline">
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#3B1F2B]">Carrito</h1>
        <button onClick={clearCart} className="text-sm text-[#3B1F2B]/70 hover:text-[#3B1F2B] hover:underline">
          Vaciar
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {cart.map(({ product, quantity }) => (
          <div key={product.id} className="flex items-center justify-between rounded-lg border border-[#3B1F2B]/10 bg-[#FFE2D6] p-4 shadow-sm">
            <div>
              <p className="text-sm font-medium text-[#3B1F2B]">{product.title}</p>
              <p className="text-sm text-[#3B1F2B]/70">${product.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => removeFromCart(product.id)} className="h-8 w-8 rounded border border-[#3B1F2B]/20 bg-[#B09896] text-[#3B1F2B] hover:bg-[#B09896]/80">-</button>
              <span className="w-6 text-center text-sm text-[#3B1F2B]">{quantity}</span>
              <button onClick={() => addToCart(product)} className="h-8 w-8 rounded border border-[#3B1F2B]/20 bg-[#B09896] text-[#3B1F2B] hover:bg-[#B09896]/80">+</button>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-right font-semibold text-[#3B1F2B]">Total: ${cartTotal.toFixed(2)}</p>
    </div>
  );
}

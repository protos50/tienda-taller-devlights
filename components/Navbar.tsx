"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { useCart } from "@/hooks/useCart";

export default function Navbar() {
  const { cart, cartCount, cartTotal, clearCart } = useCart();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const onMouseDown = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) setOpen(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className="border-b border-[#FFE2D6]/30 bg-[#3B1F2B]">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link href="/" onClick={() => setOpen(false)} className="font-bold text-[#FFE2D6]">
          Tienda
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/products"
            onClick={() => setOpen(false)}
            className="text-[#B09896] transition hover:text-[#FFE2D6]"
          >
            Productos
          </Link>

          <div ref={ref} className="relative">
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="text-[#B09896] transition hover:text-[#FFE2D6]"
            >
              <span className="inline-flex items-center gap-2">
                Carrito
                {cartCount > 0 && (
                  <span className="inline-flex min-w-5 justify-center rounded-full bg-[#90A959] px-1.5 text-xs font-semibold text-[#3B1F2B]">
                    {cartCount}
                  </span>
                )}
              </span>
            </button>

            {open && (
              <div className="absolute right-0 z-20 mt-2 w-80 rounded-lg border border-[#3B1F2B]/20 bg-[#f3eae7] p-3 text-sm shadow-lg">
                {cart.length === 0 ? (
                  <p className="text-[#3B1F2B]">Carrito vacío</p>
                ) : (
                  <div className="space-y-3">
                    <div className="space-y-2">
                      {cart.slice(0, 3).map(({ product, quantity }) => (
                        <div key={product.id} className="flex items-center gap-3">
                          <img src={product.image} alt="" className="h-10 w-10 shrink-0 rounded bg-white object-contain p-0.5" />
                          <Link
                            href={`/products/${product.id}`}
                            onClick={() => setOpen(false)}
                            className="min-w-0 flex-1 text-[#3B1F2B] hover:text-[#70A0AF]"
                          >
                            <span className="block truncate text-xs font-medium">{product.title}</span>
                          </Link>
                          <span className="shrink-0 text-[#3B1F2B]/70 text-xs">x{quantity}</span>
                        </div>
                      ))}

                      {cart.length > 3 && (
                        <p className="text-[#3B1F2B]/70 text-xs">+ {cart.length - 3} más...</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between border-t border-[#3B1F2B]/20 pt-3">
                      <span className="text-[#3B1F2B]/80">Total</span>
                      <span className="font-semibold text-[#3B1F2B]">${cartTotal.toFixed(2)}</span>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href="/cart"
                        onClick={() => setOpen(false)}
                        className="flex-1 rounded-md bg-[#3B1F2B] px-3 py-2 text-center font-medium text-[#FFE2D6] hover:bg-[#3B1F2B]/90"
                      >
                        Ver carrito
                      </Link>
                      <button
                        type="button"
                        onClick={() => { clearCart(); setOpen(false); }}
                        className="rounded-md border border-[#3B1F2B]/30 px-3 py-2 text-xs font-medium text-[#3B1F2B]/80 hover:bg-[#3B1F2B]/10"
                      >
                        Vaciar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

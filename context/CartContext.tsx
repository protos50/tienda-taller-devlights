"use client";

import { createContext, useEffect, useState, ReactNode } from "react";
import type { Product } from "@/lib/types";

export type CartItem = { product: Product; quantity: number };

type CartContextValue = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
};

export const CartContext = createContext<CartContextValue | null>(null);

//programacion funcional para los items del carrito asi evito mutabilidad.
export function CartProvider({ children }: { children: ReactNode }) {
  // carrito en memoria
  const [cart, setCart] = useState<CartItem[]>([]);
  // flag para saber cuando ya leimos localStorage y evitar romper hidratacion
  const [ready, setReady] = useState(false);

  // al montar, intento levantar carrito guardado solo en cliente
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem("cart");
      // si hay carrito guardado, lo parseo y lo cargo en memoria
      if (stored) setCart(JSON.parse(stored) as CartItem[]);
    } catch {
      // si algo raro pasa con parse simplemente ignoro y sigo con carrito vacio
    } finally {
      // indico que ya corrio el sincronizado inicial asi no rompo la hidratacion
      setReady(true);
    }
  }, []);

  // cuando ya leimos y estamos en cliente, guardamos cada cambio
  useEffect(() => {
    if (!ready || typeof window === "undefined") return;
    // guardo el snapshot actual para que siga igual al volver
    window.localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, ready]);

  // agrega o suma cantidad si ya existe
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.product.id === product.id);
      if (idx === -1) return [...prev, { product, quantity: 1 }]; //no se toca el array original. creo una copia con el producto nuevbo y cantidad inicial 1
      return prev.map((item, i) =>
        i === idx ? { ...item, quantity: item.quantity + 1 } : item //caso ya tenga un item simplemente una nueva copia con la cantidad++
      );
    });
  };

  // resta uno y limpia si llega a cero
  const removeFromCart = (productId: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.product.id === productId ? { ...i, quantity: i.quantity - 1 } : i)) //no se muta al objeto original, se crea una nueva copia pero con una cantidad menos
        .filter((i) => i.quantity > 0)
    );
  };

  // limpia todo
  const clearCart = () => setCart([]);
  // total de unidades
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  // total de plata
  const cartTotal = cart.reduce((sum, i) => sum + i.quantity * i.product.price, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

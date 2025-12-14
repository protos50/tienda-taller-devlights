import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import type { Product } from "@/lib/types";

async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data?.id ? data : null;
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="flex flex-col gap-6 sm:flex-row">
        <img src={product.image} alt="" className="h-48 w-48 rounded bg-white object-contain p-2" />
        <div>
          <p className="text-sm text-[#70A0AF]">{product.category}</p>
          <h1 className="text-2xl font-semibold text-[#3B1F2B]">{product.title}</h1>
          <p className="mt-2 text-xl text-[#3B1F2B]">${product.price}</p>
          <p className="mt-4 text-sm text-[#3B1F2B]/70">{product.description}</p>
          <div className="mt-4">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}

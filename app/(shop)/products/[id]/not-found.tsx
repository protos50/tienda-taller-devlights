import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight text-[#3B1F2B]">
        Producto no encontrado
      </h1>
      <p className="mt-2 text-sm text-[#3B1F2B]/70">
        El producto que buscas no existe o fue eliminado.
      </p>
      <Link
        href="/products"
        className="mt-6 inline-block rounded-md bg-[#3B1F2B] px-4 py-2 text-sm font-medium text-[#FFE2D6] hover:bg-[#3B1F2B]/90"
      >
        Ver productos
      </Link>
    </div>
  );
}

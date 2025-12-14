import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-6 py-16 text-center">
      <div>
        <h1 className="text-3xl font-semibold text-[#3B1F2B]">Tienda Taller 70s</h1>
        <p className="mt-4 text-[#3B1F2B]/70">
          Tienda vintage con productos únicos.
        </p>
      </div>

      <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border border-[#3B1F2B]/20 bg-[#f3eae7] shadow-lg">
        <Image
          src="/cpp,x_large,lustre,product,750x1000.u1.jpg"
          alt="Escaparate vintage con prendas 70s"
          fill
          priority
          sizes="(max-width: 768px) 90vw, 400px"
          className="object-cover"
        />
      </div>

      <Link
        href="/products"
        className="rounded bg-[#3B1F2B] px-6 py-3 text-sm font-medium text-[#FFE2D6] hover:bg-[#3B1F2B]/90"
      >
        Ver productos
      </Link>
    </div>
  );
}

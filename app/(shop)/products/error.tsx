"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h2 className="text-xl font-semibold tracking-tight text-[#3B1F2B]">Algo salió mal</h2>
      <p className="mt-2 text-sm text-[#3B1F2B]/70">{error.message}</p>

      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 rounded-md bg-[#3B1F2B] px-4 py-2 text-sm font-medium text-[#FFE2D6] hover:bg-[#3B1F2B]/90"
      >
        Reintentar
      </button>
    </div>
  );
}

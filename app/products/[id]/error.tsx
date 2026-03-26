"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col items-center justify-center gap-6 px-4 py-12">
      <div className="flex flex-col items-center gap-4 rounded-[32px] bg-white p-10 shadow-[0_4px_4px_-1px_rgba(12,12,13,0.1),0_4px_4px_-1px_rgba(12,12,13,0.05)]">
        <span className="text-6xl">&#x1F33A;</span>
        <h2 className="font-heading text-[28px] font-bold leading-[42px] text-[#111]">
          Producto no encontrado
        </h2>
        <p className="font-body text-base leading-6 text-[#606060]">
          No pudimos cargar el detalle del producto. Por favor, inténtalo de
          nuevo.
        </p>
        <button
          onClick={reset}
          className="mt-2 rounded-full bg-[#111] px-6 py-3 font-heading text-base font-medium text-white transition-opacity hover:opacity-80"
        >
          Reintentar
        </button>
      </div>
    </main>
  );
}

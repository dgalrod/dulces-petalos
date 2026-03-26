import { ProductCardSkeleton } from "@/components/products/ProductCardSkeleton";

export default function Loading() {
  return (
    <main className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-12 px-4 py-12">
      <div className="h-10 w-[600px] max-w-full rounded-lg bg-gray-200 animate-pulse" />
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </main>
  );
}

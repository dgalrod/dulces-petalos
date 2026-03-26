import { getProducts } from "@/lib/api/products";
import { ProductGrid } from "@/components/products/ProductGrid";

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-12 px-4 py-12">
      <div className="flex w-full max-w-[600px] items-center gap-2.5 rounded-lg border border-[#bbb] bg-white px-4 py-2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <span className="font-body text-base text-[#777]">
          Busca en nuestra tienda
        </span>
      </div>

      <ProductGrid products={products} />
    </main>
  );
}

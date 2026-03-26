import { getProducts } from "@/lib/api/products";
import { ProductCatalog } from "@/components/products/ProductCatalog";

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-12 px-4 py-12">
      <ProductCatalog products={products} />
    </main>
  );
}

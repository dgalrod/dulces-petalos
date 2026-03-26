import { getProductById } from "@/lib/api/products";
import { ProductDetail } from "@/components/products/ProductDetail";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  return (
    <main className="mx-auto flex w-full max-w-[1200px] flex-col px-4 py-12">
      <ProductDetail product={product} />
    </main>
  );
}

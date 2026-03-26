import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types/product";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="block">
    <article className="relative flex flex-col gap-4 rounded-[32px] bg-white p-4 shadow-[0_4px_4px_-1px_rgba(12,12,13,0.1),0_4px_4px_-1px_rgba(12,12,13,0.05)] overflow-clip transition-shadow hover:shadow-[0_8px_16px_-2px_rgba(12,12,13,0.15)]">
      <div className="flex flex-col gap-2">
        <h2 className="font-heading text-[28px] font-bold leading-[42px] text-[#111]">
          {product.name}
        </h2>
        <p className="font-body text-base leading-6 text-[#606060]">
          {product.binomialName}
        </p>
      </div>

      <div className="relative h-[300px] w-full rounded-3xl">
        <Image
          src={product.imgUrl}
          alt={product.name}
          fill
          className="rounded-3xl object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
        />
      </div>

      <div className="absolute left-6 top-[358px] flex h-10 items-center justify-center rounded-full bg-white px-4">
        <span className="font-heading text-xl font-medium text-black">
          &euro;{product.price.toFixed(2)}
        </span>
      </div>

      <div className="absolute bottom-6 right-6 flex items-center rounded-full bg-white p-2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </div>
    </article>
    </Link>
  );
}

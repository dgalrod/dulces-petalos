import Image from "next/image";
import Link from "next/link";
import type { FertilizerType, Product } from "@/lib/types/product";

const FERTILIZER_LABEL: Record<FertilizerType, string> = {
  phosphorus: "fósforo",
  nitrogen: "nitrógeno",
};

export function ProductDetail({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-12">
      <nav className="flex items-center gap-1 font-body text-base text-[#606060]">
        <Link href="/" className="hover:underline">
          Inicio
        </Link>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
        <span>{product.name}</span>
      </nav>

      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="relative h-[250px] w-full shrink-0 rounded-[32px] lg:h-[600px] lg:w-[600px]">
          <Image
            src={product.imgUrl}
            alt={product.name}
            fill
            className="rounded-[32px] object-cover"
            sizes="(max-width: 1024px) 100vw, 600px"
            priority
          />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h1 className="font-heading text-5xl font-bold leading-[72px] text-[#111]">
              {product.name}
            </h1>
            <p className="font-body text-base text-[#606060]">
              {product.binomialName}
            </p>
          </div>

          <p className="font-heading text-[28px] font-bold leading-[42px] text-[#111]">
            &euro;{product.price.toFixed(2)}
          </p>

          <ul className="flex flex-col gap-2 pl-4 font-body text-sm text-[#111]">
            <li>
              · Regar {product.wateringsPerWeek}{" "}
              {product.wateringsPerWeek === 1 ? "vez" : "veces"} por semana
            </li>
            <li>
              · Fertilizar con{" "}
              {FERTILIZER_LABEL[product.fertilizerType] ??
                product.fertilizerType}
            </li>
          </ul>

          <button className="h-11 w-full rounded-full bg-[#771e42] font-body text-sm text-white transition-opacity hover:opacity-90 lg:w-fit lg:px-4">
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

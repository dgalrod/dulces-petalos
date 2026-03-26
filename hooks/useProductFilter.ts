import { useMemo } from "react";
import type { Product } from "@/lib/types/product";

export function filterProducts(products: Product[], query: string): Product[] {
  const normalised = query.trim().toLowerCase();
  if (!normalised) return products;

  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(normalised) ||
      p.binomialName.toLowerCase().includes(normalised),
  );
}

export function useProductFilter(products: Product[], query: string): Product[] {
  return useMemo(() => filterProducts(products, query), [products, query]);
}

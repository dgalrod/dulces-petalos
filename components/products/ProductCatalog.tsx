"use client";

import { useState } from "react";
import type { Product } from "@/lib/types/product";
import { useProductFilter } from "@/hooks/useProductFilter";
import { SearchInput } from "@/components/ui/SearchInput";
import { ProductGrid } from "./ProductGrid";

export function ProductCatalog({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const filtered = useProductFilter(products, query);

  return (
    <>
      <SearchInput value={query} onChange={setQuery} />
      <ProductGrid products={filtered} />
    </>
  );
}

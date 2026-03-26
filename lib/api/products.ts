import type { Product } from "@/lib/types/product";
import { fetchApi } from "./client";

export function getProducts(): Promise<Product[]> {
  return fetchApi<Product[]>("/product");
}

export function getProductById(id: string): Promise<Product> {
  return fetchApi<Product>(`/product/${id}`);
}

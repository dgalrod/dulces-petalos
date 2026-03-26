import { describe, expect, it } from "vitest";
import { filterProducts } from "@/hooks/useProductFilter";
import type { Product } from "@/lib/types/product";

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Orquídea",
    binomialName: "Ophrys tenthredinifera",
    price: 4.95,
    imgUrl: "https://example.com/orquidea.jpg",
    wateringsPerWeek: 1,
    fertilizerType: "phosphorus",
    heightInCm: 30,
  },
  {
    id: "2",
    name: "Rosa de damasco",
    binomialName: "Rosa damascena",
    price: 10.5,
    imgUrl: "https://example.com/rosa.jpg",
    wateringsPerWeek: 3,
    fertilizerType: "nitrogen",
    heightInCm: 180,
  },
  {
    id: "3",
    name: "Aloe",
    binomialName: "Aloe vera",
    price: 3.25,
    imgUrl: "https://example.com/aloe.jpg",
    wateringsPerWeek: 1,
    fertilizerType: "phosphorus",
    heightInCm: 15,
  },
];

describe("filterProducts", () => {
  it("returns all products when query is empty", () => {
    expect(filterProducts(PRODUCTS, "")).toEqual(PRODUCTS);
  });

  it("returns all products when query is only whitespace", () => {
    expect(filterProducts(PRODUCTS, "   ")).toEqual(PRODUCTS);
  });

  it("filters by product name (case-insensitive)", () => {
    const result = filterProducts(PRODUCTS, "rosa");
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Rosa de damasco");
  });

  it("filters by binomial name", () => {
    const result = filterProducts(PRODUCTS, "aloe vera");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("3");
  });

  it("handles accented characters", () => {
    const result = filterProducts(PRODUCTS, "orquídea");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  it("returns empty array when nothing matches", () => {
    expect(filterProducts(PRODUCTS, "girasol")).toEqual([]);
  });

  it("trims leading and trailing whitespace", () => {
    const result = filterProducts(PRODUCTS, "  aloe  ");
    expect(result).toHaveLength(1);
  });

  it("matches partial strings", () => {
    const result = filterProducts(PRODUCTS, "dam");
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Rosa de damasco");
  });
});

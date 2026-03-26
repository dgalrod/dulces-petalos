import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductCard } from "@/components/products/ProductCard";
import type { Product } from "@/lib/types/product";

const PRODUCT: Product = {
  id: "abc-123",
  name: "Orquídea",
  binomialName: "Ophrys tenthredinifera",
  price: 4.95,
  imgUrl: "https://dulces-petalos.jakala.es/images/ophrysTenthredinifera.jpeg",
  wateringsPerWeek: 1,
  fertilizerType: "phosphorus",
  heightInCm: 30,
};

describe("ProductCard", () => {
  it("renders the product name as heading", () => {
    render(<ProductCard product={PRODUCT} />);
    expect(
      screen.getByRole("heading", { name: "Orquídea" }),
    ).toBeInTheDocument();
  });

  it("renders the binomial name", () => {
    render(<ProductCard product={PRODUCT} />);
    expect(screen.getByText("Ophrys tenthredinifera")).toBeInTheDocument();
  });

  it("renders the formatted price", () => {
    render(<ProductCard product={PRODUCT} />);
    expect(screen.getByText("€4.95")).toBeInTheDocument();
  });

  it("renders the product image with alt text", () => {
    render(<ProductCard product={PRODUCT} />);
    expect(screen.getByAltText("Orquídea")).toBeInTheDocument();
  });

  it("links to the product detail page", () => {
    render(<ProductCard product={PRODUCT} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/products/abc-123");
  });
});

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ApiError, fetchApi } from "@/lib/api/client";

const mockFetch = vi.fn();

beforeEach(() => {
  process.env.API_URL = "https://api.test";
  vi.stubGlobal("fetch", mockFetch);
});

afterEach(() => {
  vi.restoreAllMocks();
  delete process.env.API_URL;
});

describe("fetchApi", () => {
  it("returns parsed JSON on success", async () => {
    mockFetch.mockResolvedValueOnce(
      new Response(JSON.stringify({ id: "1" }), { status: 200 }),
    );

    const data = await fetchApi("/product");
    expect(data).toEqual({ id: "1" });
  });

  it("calls fetch with the full URL", async () => {
    mockFetch.mockResolvedValueOnce(
      new Response(JSON.stringify([]), { status: 200 }),
    );

    await fetchApi("/product");
    expect(mockFetch).toHaveBeenCalledWith("https://api.test/product", undefined);
  });

  it("forwards RequestInit options", async () => {
    mockFetch.mockResolvedValueOnce(
      new Response(JSON.stringify({}), { status: 200 }),
    );

    const init = { headers: { Authorization: "Bearer token" } };
    await fetchApi("/product", init);
    expect(mockFetch).toHaveBeenCalledWith("https://api.test/product", init);
  });

  it("throws ApiError with status on non-ok response", async () => {
    mockFetch.mockResolvedValueOnce(
      new Response(null, { status: 404, statusText: "Not Found" }),
    );

    await expect(fetchApi("/product/xxx")).rejects.toThrow(ApiError);
    await expect(
      mockFetch.mockResolvedValueOnce(
        new Response(null, { status: 404, statusText: "Not Found" }),
      ) && fetchApi("/product/xxx"),
    ).rejects.toMatchObject({ status: 404 });
  });

  it("throws a plain Error when API_URL is missing", async () => {
    delete process.env.API_URL;

    await expect(fetchApi("/product")).rejects.toThrow(
      "API_URL environment variable is not defined",
    );
  });
});

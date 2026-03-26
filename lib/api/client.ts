function getBaseUrl(): string {
  const url = process.env.API_URL;
  if (!url) {
    throw new Error("API_URL environment variable is not defined");
  }
  return url;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function fetchApi<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${getBaseUrl()}${path}`;
  const res = await fetch(url, init);

  if (!res.ok) {
    throw new ApiError(res.status, `${res.status} ${res.statusText} — ${url}`);
  }

  return res.json() as Promise<T>;
}

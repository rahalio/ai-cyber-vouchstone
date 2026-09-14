async function request<T>(method: string, path: string, body?: unknown, signal?: AbortSignal): Promise<{ data: T }> {
  const headers: Record<string, string> = { Accept: "application/json" };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  const res = await fetch(path, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
    signal,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${method} ${path} failed: ${res.status} ${text}`);
  }
  if (res.status === 204) return { data: undefined as T };
  return (await res.json()) as { data: T };
}

export const apiClient = {
  get: <T>(path: string, params?: Record<string, unknown>, signal?: AbortSignal) => {
    const qs = params
      ? "?" + new URLSearchParams(Object.entries(params).filter(([, v]) => v != null).map(([k, v]) => [k, String(v)])).toString()
      : "";
    return request<T>("GET", path + qs, undefined, signal);
  },
  post: <T>(path: string, data?: unknown, signal?: AbortSignal) => request<T>("POST", path, data, signal),
  put: <T>(path: string, data?: unknown, signal?: AbortSignal) => request<T>("PUT", path, data, signal),
  patch: <T>(path: string, data?: unknown, signal?: AbortSignal) => request<T>("PATCH", path, data, signal),
  delete: <T>(path: string, params?: Record<string, unknown>, signal?: AbortSignal) => {
    const qs = params
      ? "?" + new URLSearchParams(Object.entries(params).filter(([, v]) => v != null).map(([k, v]) => [k, String(v)])).toString()
      : "";
    return request<T>("DELETE", path + qs, undefined, signal);
  },
};

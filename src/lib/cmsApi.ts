const API_URL = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");
const TOKEN_KEY = "cdgd.cms-token";

export type CmsUser = { id?: string; sub?: string; username: string; displayName?: string; role: string };
export type CmsListResponse = { items: Array<Record<string, unknown>>; total: number };

async function cmsRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const token = sessionStorage.getItem(TOKEN_KEY);
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      ...(init?.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  });
  if (response.status === 204) return undefined as T;
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (response.status === 401) sessionStorage.removeItem(TOKEN_KEY);
    throw new Error(payload.error || "Không thể xử lý yêu cầu");
  }
  return payload as T;
}

export async function cmsLogin(username: string, password: string) {
  const result = await cmsRequest<{ token: string; user: CmsUser }>("/admin/login", { method: "POST", body: JSON.stringify({ username, password }) });
  sessionStorage.setItem(TOKEN_KEY, result.token);
  return result.user;
}

export function cmsLogout() { sessionStorage.removeItem(TOKEN_KEY); }
export function hasCmsToken() { return Boolean(sessionStorage.getItem(TOKEN_KEY)); }
export const getCmsUser = () => cmsRequest<{ user: CmsUser }>("/admin/me");
export const getDashboard = () => cmsRequest<Record<string, unknown>>("/admin/dashboard");
export const getResource = (resource: string) => cmsRequest<CmsListResponse>(`/admin/${resource}`);
export const getResourceItem = (resource: string, id: string) => cmsRequest<Record<string, unknown>>(`/admin/${resource}/${id}`);
export const createResource = (resource: string, data: unknown) => cmsRequest<Record<string, unknown>>(`/admin/${resource}`, { method: "POST", body: JSON.stringify(data) });
export const updateResource = (resource: string, id: string, data: unknown) => cmsRequest<Record<string, unknown>>(`/admin/${resource}/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteResource = (resource: string, id: string) => cmsRequest<void>(`/admin/${resource}/${id}`, { method: "DELETE" });
export const updateStatus = (resource: string, id: string, status: string, note: string) => cmsRequest<Record<string, unknown>>(`/admin/${resource}/${id}/status`, { method: "PATCH", body: JSON.stringify({ status, note }) });
export const updateOrganization = (data: unknown) => cmsRequest<Record<string, unknown>>("/admin/settings/organization", { method: "PUT", body: JSON.stringify(data) });
export const uploadMedia = (file: File) => { const body = new FormData(); body.append("file", file); return cmsRequest<Record<string, unknown>>("/admin/media/upload", { method: "POST", body }); };
export const mediaUrl = (id: string) => `${API_URL}/media/${id}`;

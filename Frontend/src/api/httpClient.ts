import { API_BASE_URL } from './apiConfig';

export class HttpError extends Error {
  status: number;
  body: unknown;

  constructor(status: number, message: string, body: unknown) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

type RequestBody = object | unknown[] | string | FormData | null | undefined;

function isFormData(value: unknown): value is FormData {
  return typeof FormData !== 'undefined' && value instanceof FormData;
}

function isJsonSerializableObject(value: unknown): value is object | unknown[] {
  return (
    value !== null &&
    value !== undefined &&
    !isFormData(value) &&
    typeof value === 'object'
  );
}

export async function http<T>(
  path: string,
  init: Omit<RequestInit, 'body'> & { body?: RequestBody } = {}
): Promise<T> {
  const url = `${API_BASE_URL}${path}`;

  const headers = new Headers(init.headers);

  const body = init.body;
  const hasJsonBody = isJsonSerializableObject(body);

  if (hasJsonBody && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(url, {
    ...init,
    credentials: 'include',
    headers,
    body:
      body === undefined || body === null
        ? undefined
        : isFormData(body)
          ? body
          : typeof body === 'string'
            ? body
            : JSON.stringify(body),
  });

  const contentType = response.headers.get('content-type') ?? '';
  const isJson = contentType.includes('application/json');

  const payload = isJson ? await response.json().catch(() => null) : await response.text();

  if (!response.ok) {
    const message =
      (isJson && (payload as any)?.message) || response.statusText || 'HTTP Error';
    throw new HttpError(response.status, message, payload);
  }

  return payload as T;
}

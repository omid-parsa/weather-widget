import querystring, { ParsedUrlQueryInput } from 'querystring';

// creates basic headers
function createHeaders(accessToken?: string): Record<string, string> {
  const result: Record<string, string> = {
    Accept: 'application/json',
  };
  if (accessToken) {
    result.Authorization = `Bearer ${accessToken}`;
  }

  return result;
}

// creates headers for requests with payload
function createPayloadHeaders(accessToken?: string): Record<string, string> {
  let result = createHeaders(accessToken);
  result = {
    ...result,
    'Content-Type': 'application/json',
  };

  return result;
}

// appends query string to url
function createUrlWithQuery(url: string, query?: ParsedUrlQueryInput) {
  if (!query) {
    return url;
  }

  return `${url}?${querystring.stringify(query)}`;
}

// ensure response is success
// if not: tries to parse error and throws exception
type ProblemDetails = {
  type: string,
  title: string,
  status: number,
  detail: string,
  instance: string,
};

async function ensureResponseIsSuccess(response: Response) {
  if (response.ok) {
    return;
  }

  let exceptionMessage = `[${response.status}] ${response.statusText}`;
  // try to parse problem details
  try {
    const problemDetails = await response.json() as ProblemDetails;
    const { status, title, detail } = problemDetails;
    if (status && title && detail) {
      exceptionMessage = `[${status}] ${title}\n${detail}`;
    }
  } catch {
    // that's fine
  }

  throw new Error(exceptionMessage);
}

export async function get<ResponseT>(url: string, accessToken?: string, query?: ParsedUrlQueryInput): Promise<ResponseT> {
  const options: RequestInit = {
    method: 'GET',
    headers: createHeaders(accessToken),
  };

  const response = await fetch(createUrlWithQuery(url, query), options);
  await ensureResponseIsSuccess(response);

  const result = await response.json() as ResponseT;
  return result;
}

export async function post<PayloadT, ResponseT>(
  url: string, payload: PayloadT, accessToken?: string, query?: ParsedUrlQueryInput,
): Promise<ResponseT> {
  const options: RequestInit = {
    method: 'POST',
    headers: createPayloadHeaders(accessToken),
    body: JSON.stringify(payload),
  };

  const response = await fetch(createUrlWithQuery(url, query), options);
  await ensureResponseIsSuccess(response);

  const result = await response.json() as ResponseT;
  return result;
}

export async function put<PayloadT, ResponseT>(
  url: string, payload: PayloadT, accessToken?: string, query?: ParsedUrlQueryInput,
): Promise<ResponseT> {
  const options: RequestInit = {
    method: 'PUT',
    headers: createPayloadHeaders(accessToken),
    body: JSON.stringify(payload),
  };

  const response = await fetch(createUrlWithQuery(url, query), options);
  await ensureResponseIsSuccess(response);

  const result = await response.json() as ResponseT;
  return result;
}

export async function del(url: string, accessToken?: string, query?: ParsedUrlQueryInput) {
  const options: RequestInit = {
    method: 'DELETE',
    headers: createHeaders(accessToken),
  };

  const response = await fetch(createUrlWithQuery(url, query), options);
  await ensureResponseIsSuccess(response);
}

export async function delWithResponse<ResponseT>(
  url: string, accessToken?: string, query?: ParsedUrlQueryInput,
): Promise<ResponseT> {
  const options: RequestInit = {
    method: 'DELETE',
    headers: createHeaders(accessToken),
  };

  const response = await fetch(createUrlWithQuery(url, query), options);
  await ensureResponseIsSuccess(response);

  const result = await response.json() as ResponseT;
  return result;
}

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


import axios, { Method } from 'axios'
import { print } from 'graphql'

interface HttpResponse<T> {
  body: {
    data: T
    errors?: any
  }
}

interface RequestFields {
  body?: Record<string, unknown>
  headers?: Record<string, string>
}

export class MakeRequest {
  private readonly commonHeaders: Record<string, string> = { 'Content-Type': 'application/json' }

  async post<T>(
    query: any,
    variables?: any,
    expectedStatus?: 200,
    headers?: Record<string, string>,
  ): Promise<HttpResponse<T>> {
    headers = headers ? { ...this.commonHeaders, ...headers } : { ...this.commonHeaders }

    if (query.kind === 'Document') {
      query = print(query)
    }
    return this.request({ body: { query, variables }, headers })
  }

  private async request<T>({ body, headers }: RequestFields, expectedStatus = 200) {
    const response = await axios.request<T>({
      method: 'POST',
      url: 'http://localhost:4000',
      data: body,
      headers,
      validateStatus: () => true,
    })

    return { body: response.data }
  }
}

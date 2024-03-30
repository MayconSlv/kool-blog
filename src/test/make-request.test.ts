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
}

export class MakeRequest {
  async post<T>(query: any, variables?: any, expectedStatus?: 200): Promise<HttpResponse<T>> {
    if (query.kind === 'Document') {
      query = print(query)
    }

    return this.request({ body: { query, variables } })
  }

  private async request<T>({ body }: RequestFields, expectedStatus = 200) {
    const response = await axios.request<T>({
      method: 'POST',
      url: 'http://localhost:4000',
      data: body,
      validateStatus: () => true,
    })

    return { body: response.data }
  }
}

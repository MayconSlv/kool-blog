import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export interface ContextInterface {
  token?: string
  userId?: string
}

export interface ContextParameters {
  req: Request
  res: Response
}

export const context = async ({ req, res }: ContextParameters): Promise<ContextInterface> => {
  const authorizationHeader = req.headers.authorization || ''
  const [, token] = authorizationHeader.split(' ')

  const userId = getUserByToken(token)

  return {
    token,
    userId,
  }
}

function getUserByToken(token: string): string | undefined {
  const decodedToken = jwt.decode(token, { complete: true })
  const userId = decodedToken?.payload.sub

  return userId?.toString()
}

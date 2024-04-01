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
  let token: string | undefined
  if (req.headers.authorization) {
    token = req.headers.authorization.replace('Bearer ', '')
  }

  let userId: string | undefined
  if (token) {
    try {
      const decodedToken = jwt.decode(token) as { sub?: string }
      userId = decodedToken?.sub
    } catch (error) {
      throw new Error('error')
    }
  }

  return {
    token,
    userId,
  }
}

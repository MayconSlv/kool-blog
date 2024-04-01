import { Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { authenticatedUser } from './middleware/authenticated-user.middleware'

export interface ContextInterface {
  token?: string
  userId: string
}

interface ContextParameters {
  req: Request
  res: Response
}

interface DecodedToken extends JwtPayload {
  sub?: string
}

export const context = ({ req, res }: ContextParameters): ContextInterface => {
  const token = req.headers?.authorization?.replace('Bearer ', '')
  const userId = authenticatedUser(token)

  return {
    token,
    userId,
  }
}

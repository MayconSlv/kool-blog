import { Request, Response } from 'express'

export interface ContextInterface {
  token?: string
}

interface ContextParameters {
  req: Request
  res: Response
}

export const context = ({ req, res }: ContextParameters): ContextInterface => {
  const token = req.headers.authorization

  return {
    token,
  }
}

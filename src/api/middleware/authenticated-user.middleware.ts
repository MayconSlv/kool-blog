import jwt, { JwtPayload } from 'jsonwebtoken'

interface DecodedToken extends JwtPayload {
  sub?: string
}

export function authenticatedUser(token?: string): string {
  if (!token) {
    throw new Error('token not provied')
  }

  const decodedToken = jwt.decode(token) as DecodedToken
  if (!decodedToken || !decodedToken.sub) {
    throw new Error('Invalid token')
  }

  return decodedToken.sub
}

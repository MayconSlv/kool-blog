export interface CreateUserInputModel {
  name: string
  username: string
  email: string
  password: string
  birthDate: Date
}

export interface AuthenticateUserModel {
  password: string
  usernameOrEmail: string
}

export interface UserModel {
  id: string
  name: string
  username: string
  email: string
  birthDate: Date
}

export interface AuthenticatedUserModel {
  user: UserModel
  token: string
}

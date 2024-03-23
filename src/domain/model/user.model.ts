export interface UserModel {
  name: string
  username: string
  email: string
  birthDate: Date
}

export interface CreateUserInputModel {
  name: string
  username: string
  email: string
  password: string
  birthDate: Date
}

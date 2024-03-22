export interface UserModel {
  id: string
  name: string
  username: string
  email: string
}

export interface CreateUserInputModel {
  name: string
  username: string
  email: string
  password: string
  birthDate: Date
}

import { UserModel } from './user.model'

export interface PostModel {
  content: string
  user: UserModel
}

export interface CreatePostInputModel {
  content: string
  username: string
}

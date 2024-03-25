import { UserModel } from './user.model'

export interface PostModel {
  id: string
  content: string
  user: UserModel
}

export interface CreatePostInputModel {
  content: string
  username: string
}

export interface UpdatePostContentInputModel {
  id: string
  content: string
}

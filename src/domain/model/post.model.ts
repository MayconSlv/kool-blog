import { UserModel } from './user.model'

export interface CreatePostInputModel {
  content: string
}

export interface UpdatePostContentInputModel {
  id: string
  content: string
}

export interface PostModel {
  id: string
  content: string
  user: UserModel
}

import { CommentModel } from './comment.model'
import { UserModel } from './user.model'

export interface CreatePostInputModel {
  content: string
  userId: string
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

export interface DetailedPostModel extends PostModel {
  comments: CommentModel[]
}

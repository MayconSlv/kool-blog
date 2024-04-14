import { UserModel } from './user.model'

export interface CreateCommentInputModel {
  content: string
  postId: string
  userId: string
}

export interface CommentModel {
  id: string
  content: string
  user: UserModel
}

export interface DeleteCommentModel {
  commentId: string
  userId: string
}

export interface UpdateCommentModel {
  id: string
  content: string
}

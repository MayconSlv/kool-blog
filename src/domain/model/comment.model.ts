export interface CreateCommentInputModel {
  content: string
  postId: string
  userId: string
}

export interface CommentModel {
  id: string
  content: string
}

export interface DeleteCommentModel {
  commentId: string
  userId: string
}

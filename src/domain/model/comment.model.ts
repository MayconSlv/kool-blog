export interface CreateCommentInputModel {
  content: string
  postId: string
  username: string
}

export interface CommentModel {
  id: string
  content: string
}

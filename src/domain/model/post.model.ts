export interface PostModel {
  content: string
}

export interface CreatePostInputModel extends PostModel {
  username: string
}

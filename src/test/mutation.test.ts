import { processImport } from '@graphql-tools/import'

export const Mutation = {
  createUser: processImport('src/test/mutation/create-user.mutation.graphql'),
  createPost: processImport('src/test/mutation/create-post.mutation.graphql'),
  deletePost: processImport('src/test/mutation/delete-post.mutation.graphql'),
  updatePost: processImport('src/test/mutation/update-post.mutation.graphql'),
  createComment: processImport('src/test/mutation/create-comment.mutation.graphql'),
  deleteComment: processImport('src/test/mutation/delete-comment.mutation.graphql'),
  updateComment: processImport('src/test/mutation/update-comment.mutation.graphql'),
}

import { processImport } from '@graphql-tools/import'

export const Mutation = {
  createUser: processImport('src/test/mutation/create-user.mutation.graphql'),
  createPost: processImport('src/test/mutation/create-post.mutation.graphql'),
}

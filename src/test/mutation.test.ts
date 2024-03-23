import { processImport } from '@graphql-tools/import'

export const Mutation = {
  createUser: processImport('src/test/mutation/create-user.mutation.graphql'),
}

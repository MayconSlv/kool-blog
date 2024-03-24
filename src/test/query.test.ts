import { processImport } from '@graphql-tools/import'

export const Query = {
  getPosts: processImport('src/test/query/get-posts.query.graphql'),
}

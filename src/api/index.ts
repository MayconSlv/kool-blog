import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { DBConnection } from '../data/db/config'
import { join } from 'path'
import Container from 'typedi'
import { ValidateAuthorizationToken } from './middleware'
import { context } from './graphql.context'

async function server() {
  const schema = await buildSchema({
    resolvers: [join(__dirname, 'module', '**', '*.resolver.{ts,js}')],
    container: Container,
    authChecker: ValidateAuthorizationToken,
  })

  const server = new ApolloServer({ schema, context })
  DBConnection.initialize().then(() => console.log('[Database] Initialized.'))
  await server.listen().then(({ url }) => console.log(`[Server] Running on ${url}`))
}
server()

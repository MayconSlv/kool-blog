import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { DBConnection } from '../data/db/config'
import { HelloWorldResolver } from './module/hello-world.resolver'

async function server() {
  const schema = await buildSchema({
    resolvers: [HelloWorldResolver],
  })

  const server = new ApolloServer({ schema })
  DBConnection.initialize().then(() => console.log('[Database] Initialized.'))
  await server
    .listen()
    .then(({ url }) => console.log(`[Server] Running on ${url}`))
}
server()

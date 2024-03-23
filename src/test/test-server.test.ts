import { DBConnection } from '@data/db/config'
import { ApolloServer } from 'apollo-server'
import { join } from 'path'
import { buildSchema } from 'type-graphql'
import Container from 'typedi'

export class TestServer {
  private server: ApolloServer

  async start() {
    this.server = await this.createApolloServer()

    await this.server.listen()
    await DBConnection.initialize()
  }

  async stop() {
    await this.server.stop()
    await DBConnection.destroy()
  }

  private async createApolloServer() {
    const schema = await buildSchema({
      resolvers: [
        join(__dirname, '..', 'api', 'module', '**', '*.resolver.ts'),
      ],
      container: Container,
    })

    return new ApolloServer({ schema })
  }
}

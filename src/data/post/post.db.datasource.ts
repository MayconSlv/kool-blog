import { DBConnection } from '@data/db/config'
import { PostEntity } from '@data/db/entity'
import { Service } from 'typedi'
import { Repository } from 'typeorm'

interface CreatePostDataInput {
  content: string
  userId: string
}

@Service()
export class PostDbDataSource {
  private readonly repository: Repository<PostEntity> =
    DBConnection.getRepository(PostEntity)

  create(input: CreatePostDataInput): Promise<PostEntity> {
    return this.repository.save({ user: { id: input.userId }, ...input })
  }

  find(): Promise<PostEntity[]> {
    return this.repository
      .createQueryBuilder('post')
      .innerJoinAndSelect('post.user', 'user')
      .getMany()
  }
}

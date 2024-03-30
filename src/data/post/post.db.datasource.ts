import { DBConnection } from '@data/db/config'
import { PostEntity } from '@data/db/entity'
import { Service } from 'typedi'
import { Repository } from 'typeorm'

interface CreatePostDataInput {
  content: string
  userId: string
}

interface UpdatePostDataInput {
  content: string
  id: string
}

@Service()
export class PostDbDataSource {
  private readonly repository: Repository<PostEntity> = DBConnection.getRepository(PostEntity)

  create(input: CreatePostDataInput): Promise<PostEntity> {
    return this.repository.save({ user: { id: input.userId }, ...input })
  }

  find(): Promise<PostEntity[]> {
    return this.repository.createQueryBuilder('post').innerJoinAndSelect('post.user', 'user').getMany()
  }

  findOne(id: string): Promise<PostEntity | null> {
    return this.repository.findOne({ where: { id } })
  }

  async delete(postId: string): Promise<void> {
    this.repository.delete({ id: postId })
  }

  async update(input: UpdatePostDataInput): Promise<PostEntity> {
    await this.repository
      .createQueryBuilder('post')
      .update(PostEntity)
      .set({ content: input.content })
      .where('post.id = :id', { id: input.id })
      .execute()

    return this.repository
      .createQueryBuilder('post')
      .innerJoinAndSelect('post.user', 'user')
      .where('post.id = :id', { id: input.id })
      .getOneOrFail()
  }
}

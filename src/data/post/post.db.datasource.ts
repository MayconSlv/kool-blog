import { DBConnection } from '@data/db/config'
import { PostEntity } from '@data/db/entity'
import { PostModel } from '@domain/model'
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

  create(input: CreatePostDataInput): Promise<PostModel> {
    return this.repository.save({ user: { id: input.userId }, ...input })
  }

  find(): Promise<PostModel[]> {
    return this.repository.createQueryBuilder('post').innerJoinAndSelect('post.user', 'user').getMany()
  }

  findOne(id: string): Promise<PostModel | null> {
    return this.repository
      .createQueryBuilder('post')
      .innerJoinAndSelect('post.user', 'user')
      .where('post.id = :id', { id })
      .getOne()
  }

  async delete(postId: string): Promise<void> {
    this.repository.delete({ id: postId })
  }

  async update(input: UpdatePostDataInput): Promise<PostModel> {
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
